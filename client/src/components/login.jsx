import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [activeTab, setActiveTab] = useState('signup');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [formloginData, setFormloginData] = useState({
    email: '',
    password: '',
  });

  const handleloginChange = (e) => {
    setFormloginData({ ...formloginData, [e.target.name]: e.target.value });
  };

  const handleloginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/login', {
        email: formloginData.email,
        password: formloginData.password,
      });
      
     
     setFormloginData({ email: '', password: '' });

     window.location.href = "/home"
     
    } catch (error) {
      console.error('Login failed:', error.response.data);
      alert(error.response.data.message)
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/signup', {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
       
        password: formData.password,
      });

      console.log(response);
      setFormData({ username: '', email: '', password: '', phoneNumber: '', confirmPassword: ''});
    
    } catch (error) {
      console.error('Signup failed:', error);
     
    }
  };
  return (
    <div className="Login">
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white p-8 border border-gray-300">
            <div className="mb-4">
              <button
                className={`px-4 py-2 ${activeTab === 'signup' ? 'text-blue-500 border-b-2 font-medium border-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('signup')}
              >
                Signup
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'login' ? 'text-blue-500 border-b-2 font-medium border-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
            </div>
            {activeTab === 'signup' ? (
              <form onSubmit={handleSubmit} >
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
                  <input 
                  type="text"
                  name="username"
                   className="form-input mt-1 block w-full border border-gray-300 p-2"
                    value={formData.username}
          onChange={handleChange} />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                  <input 
                  type="email" 
                  name="email"
                  className="form-input mt-1 block w-full border border-gray-300 p-2"
                  value={formData.email}
          onChange={handleChange}  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600">Phone Number</label>
                  <input type="text" 
                  name="phoneNumber"
                  className="form-input mt-1 block w-full border border-gray-300 p-2" 
                    value={formData.phoneNumber}
          onChange={handleChange} 
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                  <input type="password" 
                  name="password"
                  className="form-input mt-1 block w-full border border-gray-300 p-2"
                   value={formData.password}
          onChange={handleChange}  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
                  <input type="password" 
                   name="confirmPassword"
                  className="form-input mt-1 block w-full border border-gray-300 p-2" 
                  value={formData.confirmPassword}
          onChange={handleChange}  />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold hover:bg-blue-700">Sign Up</button>
              </form>
            ) : (
              <form  onSubmit={handleloginSubmit}   >
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                  <input type="email" 
                  name='email'
                  className="form-input mt-1 block w-full border border-gray-300 p-2" 
                    value={formloginData.email}
               onChange={handleloginChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>

                  <input type="password" 
                  name='password'
                  className="form-input mt-1 block w-full border border-gray-300 p-2"
                  value={formloginData.password}
               onChange={handleloginChange}
                   />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold hover:bg-blue-700">Login</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
