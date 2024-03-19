const express = require('express')
const mongoose = require('mongoose')    
const cors = require('cors')
const bodyparser = require('body-parser')
const multer = require('multer');
const path = require('path');

require('dotenv').config();


const twilio = require('twilio');

mongoose.connect('mongodb+srv://Manshu:Manshu1234@chatapp.bilw5dp.mongodb.net/?retryWrites=true&w=majority&appName=chatapp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const newuser = require('./schema/clientSchema.js');
const sigupuser = require('./schema/useraddSchema.js');

const deliveryuserdata = require('./schema/deliveryInfo.js');

const app = express() 
const port = 9000




const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  
  app.use('/uploads', express.static("uploads"));
  app.use(cors(corsOptions));
  

  app.use(bodyparser.json());
  app.use(express.json()); 


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });

  const upload = multer({ storage: storage });
  
  
app.use(express.urlencoded({extended:true}))



  app.get('/', async(req,res)=>{
    const users = await newuser.find({});
    res.json(users);
  })


  app.get('/userserch/:id', async(req,res)=>{
    const { id } = req.params;
    const users = await newuser.find({ _id: id });
    res.json(users);
  })



   app.post('/adduser'  ,upload.single('productImage'),async(req,res)=>{ 
    try {
        const { username, useremail,userage, address,price } = req.body;
         console.log(req.body)
         const productImage = req.file ? req.file.filename : null;
        const existingUser = await newuser.findOne({ useremail });
    
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }
  
          
        const newUser = new newuser({ name : username, email : useremail, age : userage, address , price, productImage });
          await newUser.save();
    
       
       return res.status(201).json({ message: 'User created successfully'});
      } catch  (error) {
          console.log(error)
      }

   })

   app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
    
        const deletedUser = await newuser.findOneAndDelete({ _id: id });

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})


app.patch('/update/:id',upload.single('productImage'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email,age,address }  = req.body;
        const productImage = req.file ? req.file.filename : null;
          console.log(req.body)

          
      

        const updatedUser = await newuser.findByIdAndUpdate(id, { name, email,age,productImage,address }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});





app.post('/signup', async (req, res) => {
  const { username, email, phoneNumber,password } = req.body;

  console.log(req.body);
  try {
    const newUser = new sigupuser({ username, email, phoneNumber,password });
    await newUser.save();
    console.log('User saved to database');
  } catch (error) {
    return res.status(500).send('Error saving user to database');
  }

  try {
    await twilioClient.messages.create({
      body: `Hello ${username}, welcome to My Brand Your Password is ${password}`,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:+91${phoneNumber}`,
    });
    console.log('WhatsApp message sent!');
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
  }
  

  res.status(200).send('Signup successful, welcome message sent.');
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const existingUser = await sigupuser.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

  
    if (existingUser.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/userdata', async (req, res) => {
  const { name, email, phoneNumber,schedule,fromCity,toCity,deliveryMethod , message} = req.body;

  console.log(req.body);
  try {
    const newUser = new deliveryuserdata({name, email, phoneNumber,schedule,fromCity,toCity,deliveryMethod , message});
    await newUser.save();
    console.log('User saved to database');
  } catch (error) {
    return res.status(500).send('Error saving user to database');
  }

  try {
    await twilioClient.messages.create({
      body: `Hello ${name},
        Thank you for join us at ${email}, 
      Your schedule is ${schedule},
      ${fromCity} To ${toCity},
      Your Method ${deliveryMethod},
      Your  ${message}`,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:+91${phoneNumber}`,
    });
    console.log('WhatsApp message sent!');
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
  }
  

  res.status(200).send('Signup successful, welcome message sent.');
});


app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})