

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [usersid, setuserId] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');



  const [username, setuserName] = useState('');
  const [useremail, setuseremail] = useState('');

  const [userage, setuserage] = useState('');
  const [address, setaddress] = useState('');
  const [newimage, setImage] = useState();
  const [price, setprice] = useState('');


  const [updateage, setupdateage] = useState('');
  const [uspdateaddress, setuspdateaddress] = useState('');
  const [newupdateimage, setnewupdateimage] = useState([]);
  const [updateprice, setupdateprice] = useState('');




  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [adduserFrom,setadduserFrom] = useState(false);

  const setuserupdatedata = async(id)=>{
    const response = await fetch(`http://localhost:9000/userserch/${id}`);
    const data = await response.json();
   
    setName(data[0].name);
    setEmail(data[0].email);
    setupdateage(data[0].age);
    setuspdateaddress(data[0].address);
    setupdateprice(data[0].price);
    setImage()



 


  }
  
  const toggleUpdateForm = (userId) => {
   
    setuserId(userId)

    setShowUpdateForm(!showUpdateForm);
    setuserupdatedata(userId)

  };
  const adduserformopen = () =>{
    setadduserFrom(!adduserFrom)
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:9000');
      const data = await response.json();
      console.log(data);
      setUsers(data);


    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const deleteuser = async(id) => {
    try {
        console.log(id)
      let ress =   await axios.delete(`http://localhost:9000/delete/${id}`);
       

        fetchUsers();
    } catch (error) {
        console.error("Error deleting user: ", error);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('age', updateage);

      formData.append('address', uspdateaddress);

      formData.append('price', updateprice);
      formData.append('productImage', newupdateimage);
        
   
      const response = await axios.patch(`http://localhost:9000/update/${usersid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setShowUpdateForm(!showUpdateForm);

      console.log('User data updated:', response.data);
      fetchUsers();

      setName("")
      setEmail("")
      setuspdateaddress("")
      setupdateage("")
      setupdateprice("")
      setnewupdateimage("")
    } catch (error) {
      console.error('Error updating user data:', error);
    
    }
  };


  const addUserdata = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('useremail', useremail);
        formData.append('userage', userage);

        formData.append('address', address);

        formData.append('price', price);
        formData.append('productImage', newimage);



        const response = await axios.post('http://localhost:9000/adduser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
          
      console.log('User data created:', response.data);
      fetchUsers();
      setadduserFrom(!adduserFrom)

      setuserName("")
      setuseremail("")
      setuserage("")
      setuserage("")
      setaddress("")
      setprice("")

      setnewupdateimage("")

    
    } catch (error) {
      console.error('Error creating user:', error);
    
    }
  };


  const handleAddImage = (e)=>{
    setImage(e.target.files[0])
   
  }

  const updateImage = (e)=>{

  
   
    setnewupdateimage(e.target.files[0])
  }
 


  return (
    <div className='maindiv relative'>
    
    <button onClick={()=> adduserformopen()} >Add data</button>

  
    <div className='px-[2%]'>
    <Table >
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Tools</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <img width="100px" height="80px" src={`http://localhost:9000/uploads/${user.productImage}`} alt={user.name} />
            </TableCell>
            <TableCell>{user.price}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>
              <IconButton color="primary" onClick={() => toggleUpdateForm(user._id)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => deleteuser(user._id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>

    {showUpdateForm && (
      <form onSubmit={handleSubmit} className="bg-white shadow-md absolute rounded px-8 pt-6 pb-8 mb-4 slide-top">
    <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input 
            type="text" 
            id="name" 
            name="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
        <input 
            type="number" 
            id="age" 
            name="age" 
            value={updateage} 
            onChange={(e) => setupdateage(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
        <input 
            type="text" 
            id="address" 
            name="address" 
            value={uspdateaddress} 
            onChange={(e) => setuspdateaddress(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
        <input 
            type="number" 
            id="price" 
            name="price" 
            value={updateprice} 
            onChange={(e) => setupdateprice(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="img" className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
        <input 
            type="file"
            name="img"
            accept="image/*"
            files={newupdateimage}
            onChange={updateImage}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
        {/* <button type="button" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700" onClick={handleClose}>Close</button> */}
    </div>
</form>

      )}



      {adduserFrom && (
        <form onSubmit={addUserdata} method='post' className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 absolute top-[85%] transition-transform duration-500 ease-in-out transform -translate-y-full">
    <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input 
            type="text" 
            id="name" 
            name="name" 
            value={username} 
            onChange={(e) => setuserName(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input 
            type="email" 
            id="email" 
            name="email" 
            value={useremail} 
            onChange={(e) => setuseremail(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
        <input 
            type="number" 
            id="age" 
            name="age" 
            value={userage} 
            onChange={(e) => setuserage(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
        <input 
            type="text" 
            id="address" 
            name="address" 
            value={address} 
            onChange={(e) => setaddress(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
        <input 
            type="number" 
            id="price" 
            name="price"
            value={price} 
            onChange={(e) => setprice(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="img" className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
        <input 
            type="file"
            name="img"
            accept="image/*"
            
            onChange={handleAddImage}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        <button type="button" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700" onClick={()=>setadduserFrom(!adduserFrom)}>Close</button>
  
    </div>
</form>

      )}
    </div>
  );
};

export default UsersTable;
