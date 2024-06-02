'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';




    // try{
    // const token = localStorage.getItem('token');
    // const email = localStorage.getItem('email');
    // if (token) {
    //     const response = await axios.get(`http://localhost:3000/workers/get/${email}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     setUser(response.data);

    

    // // Fetch all services
    // axios.get(`http://localhost:3000/workers/${users.id}`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    //   }
    // )
    //   .then(response => {
    //     setServices(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching services:', error);
    //   });

    // // Fetch worker's added services
    // axios.get('http://localhost:3000/worker/services')
    //   .then(response => {
    //     setWorkerServices(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching worker services:', error);
    //   });
    // }
    // }
    // catch (error) {
    //   console.error('An error occurred while fetching user data: ', error);
    // }
    // });
    const WorkerServicesPage = () => {
        const [services, setServices] = useState([]);
        const [workerServices, setWorkerServices] = useState([]);
        const [totalServices, setTotalServices] = useState(0);
        const [totalAddedServices, setTotalAddedServices] = useState(0);
      
        useEffect(() => {
          const fetchUserData = async () => {
            try {
              const token = localStorage.getItem('token');
              const email = localStorage.getItem('email');
              if (token) {
                const response2 = await axios.get(`http://localhost:3000/workers/get/${email}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                const id = response2.data.id;
      
                const servicesResponse = await axios.get(`http://localhost:3000/workers/${id}/allServices`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                setServices(servicesResponse.data);
                setTotalServices(servicesResponse.data.length);
      
                const workerServicesResponse = await axios.get(`http://localhost:3000/workers/${id}/services`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                setWorkerServices(workerServicesResponse.data);
                setTotalAddedServices(workerServicesResponse.data.length);
              }
            } catch (error) {
              console.error('An error occurred while fetching user data: ', error);
            }
          };
      
          fetchUserData();
        }, []);

      
        const handleAddService = async (serviceId:React.ChangeEvent<HTMLInputElement>) => {
          try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            if (token) {
              const response2 = await axios.get(`http://localhost:3000/workers/get/${email}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const id = response2.data.id;

              const response3 = await axios.get(`http://localhost:3000/workers/${id}/allServices/${serviceId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              const data = response3.data;
              
      
              const response = await axios.post(`http://localhost:3000/workers/${id}/allServices/${serviceId}`, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setWorkerServices([...workerServices, response.data]); // Add the new service to the list
              setTotalAddedServices(totalAddedServices + 1); // Increment total added services count
            } else {
              console.log('Token not found');
            }
          } catch (error) {
            console.error('An error occurred while adding service: ', error);
          }
        };
    
      
        const handleDeleteService = async (serviceId:React.ChangeEvent<HTMLInputElement>) => {
          try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            if (token) {
              const response2 = await axios.get(`http://localhost:3000/workers/get/${email}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const id = response2.data.id;
      
              await axios.delete(`http://localhost:3000/workers/${id}/services/${serviceId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              // Update the state to remove the deleted service
              setWorkerServices(workerServices.filter((service) => service.serviceId !== serviceId));
              setTotalAddedServices(totalAddedServices - 1); // Decrement total added services count
            } else {
              console.log('Token not found');
            }
          } catch (error) {
            console.error('An error occurred while deleting service: ', error);
          }
        };

    return (
    <>
      <div className="justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8"> {/* Added mb-8 for bottom margin */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold">Total Available Services</h2>
            <p>{totalServices}</p>

          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold">Total Added Services to profile</h2>
            <p>{totalAddedServices}</p>
          </div>
        </div>
        <h1>All Services</h1>
        <div className="grid grid-cols-3 gap-4">
          {services.map((service: any, index: number) => (
            <div key={index}>
              <div className="bg-white shadow-lg rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div>
                      <h2 className="text-lg font-semibold">Name: {service.service_name}</h2>
                    </div>
                  </div>
                </div>
                <div>
                    <a href={`../workerServices/${service.serviceId}`}><button  className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2 mb-2">View Details</button><br></br></a>
                    <button onClick={() => handleAddService(service.serviceId)} className="bg-green-500 text-white py-1 px-2 rounded-md">Add to profile</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h1 className='mt-5'>Added Services</h1>
        <div className="grid grid-cols-3 gap-4">
          {workerServices.map((workerService: any, index: number) => (
            <div key={index}>
              <div className="bg-white shadow-lg rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div>
                      <h2 className="text-lg font-semibold">Name: {workerService.service_name}</h2>
                    </div>
                  </div>
                </div>
                <div>
                    <button onClick={() => handleDeleteService(workerService.serviceId)} className="bg-red-500 text-white py-1 px-2 rounded-md">Delete</button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default WorkerServicesPage;
