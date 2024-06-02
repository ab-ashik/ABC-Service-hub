'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

interface User {
  name: string;
  profilePicture: string;
}

const WorkerNavbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [workerImage, setWorkerImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token && email) {
          const response = await axios.get(`http://localhost:3000/workers/get/${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          console.log(response.data);

          // const imageResponse = await axios.get(`http://localhost:3000/workers/images/${response.data.profilePicture}`, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          //   responseType: "arraybuffer",
          // });
          // const imageData = Buffer.from(response.data, "binary").toString(
          //   "base64"
          // ); // Convert binary data to base64 string
          // setWorkerImage(`data:image/jpeg;base64,${imageData}`);
        } else {
          router.push('/workerLogin');
        }
      } catch (error) {
        console.error('An error occurred while fetching user data: ', error);
        router.push('/workerLogin');
      }
    };
    
    fetchUser();
  }, [router]);

  useEffect(() => {
    const fetchCustomerImage = async () => {
      try {
        const token = localStorage.getItem("token");
        if (user) {
          const response = await axios.get(
            `http://localhost:3000/workers/images/${user.profilePicture}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer", // Ensure response is treated as binary data
            }
          );
          const imageData = Buffer.from(response.data, "binary").toString(
            "base64"
          ); // Convert binary data to base64 string
          setWorkerImage(`data:image/jpeg;base64,${imageData}`); // Set base64 encoded image data
        }
      } catch (error) {
        console.error("Error Fetching Customer Image: ", error);
      }
    };
 
    fetchCustomerImage();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    router.push('/workerLogin');
  };

  return (
    <>
      <Toaster />
      <nav className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                {/* Your logo SVG code goes here */}
              </svg>
              <h1 className="text-lg font-medium">ABC Service Hub</h1>
            </div>

            {/* Nav links */}
            <div className="flex items-center space-x-4">
              {/* Dashboard link */}
              <Link href="/workerDashboard">
                <p className="text-base font-medium hover:bg-gray-200 px-3 py-1 rounded-md cursor-pointer transition duration-300 ease-in-out">Dashboard</p>
              </Link>
              {/* Profile link */}
              <Link href="/workerProfile">
                <p className="text-base font-medium hover:bg-gray-200 px-3 py-1 rounded-md cursor-pointer transition duration-300 ease-in-out">Profile</p>
              </Link>
              <Link href="/workerServices">
                <p className="text-base font-medium hover:bg-gray-200 px-3 py-1 rounded-md cursor-pointer transition duration-300 ease-in-out">Services</p>
              </Link>
              <Link href="/workerOrders">
                <p className="text-base font-medium hover:bg-gray-200 px-3 py-1 rounded-md cursor-pointer transition duration-300 ease-in-out">Orders</p>
              </Link>
            </div>

            {/* User info and profile picture */}
            {user && (
              <div className="relative">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                  <p className="text-base font-medium">{user.name}</p>
                  <div className="avatar">
                    <div className='w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                      {workerImage ? (
                        <img className='' src={user && workerImage} alt={user.profilePicture} />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </div>
                  </div>
                </div>
                {showDropdown && (
                  <ul className="p-2 text-zinc-950 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 absolute top-10 right-0">
                    <li>
                      <button className="text-sm py-1 px-2 hover:bg-gray-200 rounded-md" onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                )}
          </div>
            )}
        </div>
      </nav>
    </>
  );
};

export default WorkerNavbar;