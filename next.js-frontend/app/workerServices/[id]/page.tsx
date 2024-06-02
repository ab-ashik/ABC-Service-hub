'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

const ViewServiceDetails = () => {
   const service_id = useParams();
  const { serviceId } = useParams();
  const [service, setService] = useState({
    serviceId: 0,
    service_name: '',
    service_description: '',
    price: 0
  });

  useEffect(() => {
    const fetchServiceDetails = async () => {
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
          console.log(id);
          const servId = service_id.id;

          const response3 = await axios.get(`http://localhost:3000/workers/${id}/allServices/${servId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response3.data);
        
        setService(response3.data);
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  return (
    <div className="container mx-auto mt-8 flex justify-center items-center p-10">
      {service ? (
        <div className="max-w bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h1 className='text-6xl font-extrabold mb-5 underline'>Service Details</h1>
            <h1 className="text-3xl text-gray-600 font-bold mb-4"><strong>Service Name: </strong>{service.service_name}</h1>
            <p className="text-gray-600 mb-2"><strong>Service Description:</strong> {service.service_description}</p>
            <p className="text-gray-800"><strong>Price:</strong> {service.price} TK per Hour</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewServiceDetails;
