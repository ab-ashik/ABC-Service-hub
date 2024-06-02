'use client'
import axios from "axios";
import { Toaster } from "react-hot-toast";
import WorkerNavbar from "../components/workernavbar";
import { useEffect, useState } from "react";

export default function WorkerDashboard(props: any) {
  const [users, setUsers] = useState([]);
  const [workerImage, setWorkerImage] = useState('');
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [totalCompletedWorks, setTotalCompletedWorks] = useState(0);
  const [totalIncomingWorks, setTotalIncomingWorks] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token) {
          const response = await axios.get(`http://localhost:3000/workers`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });

          setUsers(response.data);
          setTotalWorkers(response.data.length);

          const response2 = await axios.get(`http://localhost:3000/workers/get/${email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          console.log(response2.data);
          const id = response2.data.id;

          const servicesResponse = await axios.get(`http://localhost:3000/workers/${id}/allServices`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(servicesResponse.data);

  
            setTotalServices(servicesResponse.data.length);
            //setTotalCompletedWorks(completedWorksResponse.data.length);
            // setTotalIncomingWorks(incomingWorksResponse.data.length);

            const totalCompletedWorksResponse = await axios.get(`http://localhost:3000/workers/${id}/orders/completed`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setTotalCompletedWorks(totalCompletedWorksResponse.data.length);

            const totalIncomingWorksResponse = await axios.get(`http://localhost:3000/workers/${id}/orders/pending`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setTotalIncomingWorks(totalIncomingWorksResponse.data.length);
          }
        }
      catch (error) {
        console.error('An error occurred while fetching user data: ', error);
      }
    };


    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCustomerImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        if (token) {

          const response2 = await axios.get(`http://localhost:3000/workers/get/${email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          const image = response2.data.profilePicture;
          const response = await axios.get(
            `http://localhost:3000/workers/images/${image}`,
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
  }, [users]);

  const handleDelete = async (id: any) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.delete(`http://localhost:3000/workers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        const newUsers = users.filter((user: any) => user.id !== id);
        setUsers(newUsers);
      } else {
        console.log('Token not found');
      }
    } catch (error) {
      console.error('An error occurred while deleting user data: ', error);
    }
  };

  return (
    <>
      <div className="justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Workers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8"> {/* Added mb-8 for bottom margin */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold">Total Workers</h2>
            <p>{totalWorkers}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold">Total Services</h2>
            <p>{totalServices}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold">Total Completed Works</h2>
            <p>{totalCompletedWorks}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold">Total Incoming Works</h2>
            <p>{totalIncomingWorks}</p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {users.map((user: any, index: number) => (
            <div key={index}>
              <div className="bg-white shadow-lg rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                      <div className="avatar">
                      <div className="w-24 mask mask-squircle">
                          {workerImage ? (
                            <img className='' src={user && workerImage} alt={user.profilePicture} />
                          ) : (
                            <span className="text-gray-500">No Image</span>
                          )}
                      </div>
                      </div>
                    <div>
                      <h2 className="text-lg font-semibold">Name: {user.name}</h2>
                      <p className="text-sm text-gray-500">Email: {user.email}</p>
                      <p className="text-sm text-gray-500">Hourly Rate: {user.hourlyRate}</p>
                      <p className="text-sm text-gray-500">Availability: {user.availability.toString()}</p>
                    </div>
                  </div>
                  <div className="mt-10">
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}