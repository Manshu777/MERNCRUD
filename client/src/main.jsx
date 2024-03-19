import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import Products from './components/products.jsx'

import Login from './components/login.jsx'
import Home from './components/home.jsx'


import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/> ,
  },
  {
    path: "/products",
    element:<Products/> ,
  },
  {
    path: "/signup",
    element:<Login/> ,
  },
  {
    path: "/home",
    element:<Home/> 
  }
  
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
</React.StrictMode>
)
