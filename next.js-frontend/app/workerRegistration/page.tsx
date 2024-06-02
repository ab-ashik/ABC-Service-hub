'use client'
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function WorkerRegistration(){

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    hourlyRate: "",
    availability: "true",
    profilePicture: null
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    hourlyRate: ""
  });

  const handleInputChange = (e:any) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;
  
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));

    // Clear errors when the user starts typing
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ""
    }));
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const { name, email, password, hourlyRate } = formData;

    // Validate name
    if (!name.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        name: "Please enter your name."
      }));
      return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: "Please enter a valid email address."
      }));
      return;
    }

    // Validate password
    if (!password.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: "Please enter your password."
      }));
      return;
    }

    // Validate hourly rate
    if (!hourlyRate.trim() || parseFloat(hourlyRate) <= 0 || isNaN(parseFloat(hourlyRate))) {
      setErrors(prevErrors => ({
        ...prevErrors,
        hourlyRate: "Please enter a valid hourly rate."
      }));
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        setShowSuccessMessage(true); // Show success message
      } else {
        console.log('SignUp failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOkClick = () => {
    router.push('../workerLogin'); // Redirect after OK is clicked
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out px-4 py-2"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out px-4 py-2"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out px-4 py-2"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Hourly Rate</label>
            <input
              type="number"
              id="hourlyRate"
              name="hourlyRate"
              min="0"
              value={formData.hourlyRate}
              onChange={handleInputChange}
              
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out px-4 py-2"
            />
            {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
          </div>
          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out px-4 py-2"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleInputChange}
              
              className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out px-4 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </form>
        {showSuccessMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> You have successfully signed up.</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setShowSuccessMessage(false)}>
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path fillRule="evenodd" d="M18.293 4.293a1 1 0 0 0-1.414 0L10 10.586 4.707 5.293a1 1 0 1 0-1.414 1.414L8.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L10 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L11.414 12l5.293-5.293a1 1 0 0 0 0-1.414z" clipRule="evenodd" />
              </svg>
            </span>
            <button className="float-right mt-2 bg-indigo-500 text-white py-1 px-3 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-300 ease-in-out" onClick={handleOkClick}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
};


