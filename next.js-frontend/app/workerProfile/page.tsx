'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';



const WorkerProfilePage = () => {
    const router = useRouter();
    const [worker, setWorker] = useState({
        name: '',
        email: '',
        profilePicture: '',
        password: '',
        hourlyRate: 0,
        availability: false,
      });
    
  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token && email) {
          const response = await axios.get(`http://localhost:3000/workers/get/${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const workerResponse = await axios.get(`http://localhost:3000/workers/${response.data.id}/info`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setWorker(workerResponse.data);
          console.log(workerResponse.data);
        }
      } catch (error) {
        console.error('Error fetching worker profile:', error);
      }
    };


    fetchWorkerProfile();
  }, []);

  const handleOkClick = (e:any) => {
    router.push('/workerProfileUpdate'); // Redirect after OK is clicked
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Worker Profile</h1>
        {worker && (
          <div>
            <div className="mb-4">
              <span className="font-semibold">Name:</span> {worker.name}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Email:</span> {worker.email}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Hourly Rate:</span> {worker.hourlyRate}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Availability:</span> {worker.availability ? 'Available' : 'Not available'}
            </div>
            <button
              onClick={handleOkClick}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Update Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerProfilePage;