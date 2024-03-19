
import React, { useState } from 'react';
import img from '../assets/bgimage.webp';

import axios from 'axios';

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    schedule: '',
    fromCity: '',
    toCity: '',
    deliveryMethod: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:9000/userdata', {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            schedule: formData.schedule,
            fromCity: formData.fromCity,
            toCity: formData.toCity,
            deliveryMethod: formData.deliveryMethod,
            message:  formData.message,

        });
        
       
    setFormData({ name: '', email: '', phoneNumber: '', schedule: '', fromCity: '', toCity: '', deliveryMethod: '', message:'' });
  
      
       
      } catch (error) {
        console.error( error.response.data);
        alert(error.response.data.message)
      }
  
   
  };

  let optionsObj = [
    {
        value : "Today"
    },
    {
        value : "Tommorrow"
    },
    {
        value : "with in Next 2-3 Days"
    },
  ]
  let deliverMethObj = [
    {
        value : "Fastway"
    },
    {
        value : "Roadway"
    }
   
  ]


  return (
    <div className="w-full h-screen flex justify-center items-center">
       
       <div className="w-full lg:w-[80%] md:w-[80%]  flex  max-md:flex-col-reverse sm:flex-col-reverse  lg:flex-row justify-evenly bg-gray-200  items-center p-4" >
      <div className="w-full lg:w-[60%] xl:w-[60%] p-4">
        <h2 className="text-2xl font-bold mb-4">Local & Domestic</h2>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex  max-md:flex-col  '>
                
                    
                    <input 
                        type="text" 
                        name="name"
                        placeholder='Name*'

                        className="form-input mt-1 mx-2 px-2 block w-full border border-gray-300 p-2 max-md:my-1"
                        value={formData.name} 
                        onChange={handleChange}
                        />
                        
                         
                    <input 
                        type="text" 
                        name="email"
                        placeholder='email*'
                        className="form-input mt-1 mx-2 px-2 block w-full border border-gray-300 p-2 max-md:my-1"
                        value={formData.email} 
                        onChange={handleChange}
                        />
                            
                    <input 
                        type="text" 
                        name="phoneNumber"
                        placeholder='your Phone*'
                        className="form-input mt-1 mx-2 px-2 block w-full border border-gray-300 p-2 max-md:my-1"
                        value={formData.phoneNumber} 
                        onChange={handleChange}
                        inputmode="numeric"
                        />
                </div>

                <div className='mt-8'>
                    <h4 className='text-2xl '>Tentative Schedule</h4>
                </div>
                <div className='flex  max-md:flex-col  mt-4 '>
                
                    
                <select
              id="schedule"
              name="schedule"
              className="mt-1 block w-full border border-gray-300 p-2 max-md:my-1"
              value={formData.schedule}
              onChange={handleChange}
            >
            {optionsObj.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
              
            
            </select>
                         
                    <input 
                        type="text" 
                        name="fromCity"
                        placeholder='From City'
                        className="form-input mt-1 ml-0 block w-full border border-gray-300 p-2 max-md:my-1"
                        value={formData.fromCity}
              onChange={handleChange} />
                            
                    <input 
                        type="text" 
                        name="toCity"
                        placeholder='To City*'
                        className="form-input mt-1 ml-0 block w-full border border-gray-300 p-2 max-md:my-1"
                        value={formData.toCity}
              onChange={handleChange} />
                </div>

                <div className='mt-8'>
                    <h4 className='text-2xl '>Delivery Method</h4>
                </div>

                <div className='flex  max-md:flex-col  justify-center  mt-4'>
    
                <select
              id="deliveryMethod"
              name="deliveryMethod"
              className="h-[50px] p-2  mt-1 mx-2 block w-full border border-gray-300 max-md:my-1"
              value={formData.deliveryMethod}
              onChange={handleChange}
            >
            {deliverMethObj.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
              
            
            </select>
            <textarea
              id="message"
              name="message"
              placeholder='You Can Enter Item list Details.'
              className="form-textarea mx-2 mt-1 block w-full border border-gray-300 p-2 resize-none max-md:my-1"
              rows="1"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

           



                </div>
             
             <div className='w-full mt-5'>
                <button type='submit' className='w-full px-[12px] py-[14px]  text-2xl rounded-md bg-red-500 text-white font-semibold'> 
                Request A Quote
                </button>
             </div>




            </form>
        
       
      </div>
      
    
      <div className="w-[20%]">
      <div className=" flex justify-center items-center">
      <img src={img}  alt="Your Image" className="" />
    </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
