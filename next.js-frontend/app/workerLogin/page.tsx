'use client'
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import {Toaster ,toast} from 'react-hot-toast';
import Image from "next/image";
import signinimage from "../../public/images/login.jpg";

export default function workerLogin(){

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emaill: "",
    pass: "",
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
  
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear errors when the user starts typing
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ""
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    //const { email, password } = formData;

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        emaill: "Please enter a valid email address."
      }));
      return;
    }

    // Validate password
    if (!formData.password.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        pass: "Please enter your password."
      }));
      return;
    }

    try {
      // Send sign-in request to the server
      const response = await axios.post("http://localhost:3000/auth/login", formData);

      const token = response.data;
      console.log(token.access_token);
      localStorage.setItem('token', token.access_token);
      localStorage.setItem('email', formData.email);

      toast.success('Sign-in successful', 
      {
        duration:1500, 
        style:{backgroundColor:'green', color:'white'}, icon:'🚀',
        ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      }, 
    });
      console.log('Sign-in successful');
      //console.log(formData.email)
      // Successful sign-in, navigate to the dashboard or home page
      router.push('/workerDashboard'); // Change this to the appropriate page

      // else {

      //   // Handle unsuccessful sign-in
      //   console.log('Sign-in failed');
      //   toast.error('Sign-in failed. Please check your credentials and try again.');
      // }
    } catch (error) {
      console.error('Sign in failed:', error);
      toast.error('Sign In failed. Please check your credentials and try again.', {duration:1500, style:{backgroundColor:'red', color:'white'}, icon:'❌',
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
    }
  };
  return (
    <div className="min-h-screen items-center flex  bg-gray-100">
      <div className="container ml-60 flex">
        <Toaster />
     {/* Left div with image */}
     <div className="hidden md:block ml-28 md:w-2/3 bg-gray-50 overflow-hidden rounded-lg">
        <Image
          src={signinimage}
          alt="Signin Image"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      {/* Right div with form */}
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-3xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              
              className="mt-1 block w-4/5 sm:w-3/5 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out px-4 py-2 outline-none text-gray-700"
            />
            {errors.emaill && <p className="text-red-500 text-sm mt-1">{errors.emaill}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              
              className="mt-4 block w-4/5 sm:w-3/5 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out px-4 py-2 outline-none text-gray-700"
            />
            {errors.pass && <p className="text-red-500 text-sm mt-1">{errors.pass}</p>}
          </div>
          <button
            type="submit"
            className="w-4/5 sm:w-3/5 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
);
}