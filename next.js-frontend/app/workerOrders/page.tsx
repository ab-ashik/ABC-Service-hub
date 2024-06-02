'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const WorkerOrdersPage = () => {
    const router = useRouter();
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [processingOrders, setProcessingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
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

          const pendingResponse = await axios.get(`http://localhost:3000/workers/${id}/orders/pending`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setIncomingOrders(pendingResponse.data);

          const processingResponse = await axios.get(`http://localhost:3000/workers/${id}/orders/processing`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setProcessingOrders(processingResponse.data);

          const completedResponse = await axios.get(`http://localhost:3000/workers/${id}/orders/completed`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setCompletedOrders(completedResponse.data);

            const cancelledResponse = await axios.get(`http://localhost:3000/workers/${id}/orders/cancelled`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            setCancelledOrders(cancelledResponse.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [router]);

  const handleAcceptOrder = async (orderId:any) => {
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



        const response = await axios.put(`http://localhost:3000/workers/${id}/orders/${orderId}/processing`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });




        //console.log('Order accepted');
        // Refresh incoming orders after accepting
        const response1 = await axios.get(`http://localhost:3000/workers/${id}/orders/pending`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIncomingOrders(response1.data);
      }
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleRejectOrder = async (orderId:any) => {
    try {
      const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        

        const response2 = await axios.get(`http://localhost:3000/workers/get/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            const id = response2.data.id;

      if (token) {
        await axios.put(`http://localhost:3000/workers/${id}/orders/${orderId}/cancelled`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Refresh incoming orders after rejecting
        const response = await axios.get(`http://localhost:3000/workers/${id}/orders/pending`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIncomingOrders(response.data);
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  const handleCompleteOrder = async (orderId:any) => {
    try {
      const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const response2 = await axios.get(`http://localhost:3000/workers/get/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            const id = response2.data.id;

      if (token) {
        await axios.put(`http://localhost:3000/workers/${id}/orders/${orderId}/completed`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Refresh processing orders after completion
        const response = await axios.get(`http://localhost:3000/workers/${id}/orders/processing`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProcessingOrders(response.data);
      }
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  return (
    <div className="justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Incoming Orders</h2>
          <p>{incomingOrders.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Processing Orders</h2>
          <p>{processingOrders.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Completed Orders</h2>
          <p>{completedOrders.length}</p>
        </div>
      </div>

      {/* Orders Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Incoming Orders Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Incoming Orders</h2>
          {incomingOrders && incomingOrders.map((order, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold">Order ID: {order.orderId}</h3>
              <p>Order Date: {order.orderDate}</p>
              <p>Total Price: {order.totalPrice}</p>
              <p>Quantity of Products: {order.quantity}</p>
              <p>Status: {order.status}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <div className="mt-4 flex justify-between">
                <button onClick={() => handleAcceptOrder(order.orderId)} className="bg-green-500 text-white py-1 px-2 rounded-md mr-2">Accept</button>
                <button onClick={() => handleRejectOrder(order.orderId)} className="bg-red-500 text-white py-1 px-2 rounded-md">Reject</button>
              </div>
            </div>
          ))}
        </div>

        {/* Processing Orders Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Processing Orders</h2>
          {processingOrders && processingOrders.map((order, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold">Order ID: {order.orderId}</h3>
              <p>Order Date: {order.orderDate}</p>
              <p>Total Price: {order.totalPrice}</p>
              <p>Quantity of Products: {order.quantity}</p>
              <p>Status: {order.status}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <div className="mt-4">
                <button onClick={() => handleCompleteOrder(order.orderId)} className="bg-blue-500 text-white py-1 px-2 rounded-md">Make Complete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Completed Orders Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Completed Orders</h2>
          {completedOrders.map((order, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold">Order ID: {order.orderId}</h3>
              <p>Order Date: {order.orderDate}</p>
              <p>Total Price: {order.totalPrice}</p>
              <p>Quantity of Products: {order.quantity}</p>
              <p>Status: {order.status}</p>
              <p>Payment Method: {order.paymentMethod}</p>
            </div>
          ))}
        </div>
        {/* Cancelled Orders Section */}
        <div>
                    <h2 className="text-2xl font-semibold mb-4">Cancelled Orders</h2>
                    {cancelledOrders.map((order, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold">Order ID: {order.orderId}</h3>
                            <p>Order Date: {order.orderDate}</p>
                            <p>Total Price: {order.totalPrice}</p>
                            <p>Quantity of Products: {order.quantity}</p>
                            <p>Status: {order.status}</p>
                            <p>Payment Method: {order.paymentMethod}</p>
                        </div>
                    ))}
                </div>
      </div>
    </div>
  );
};

export default WorkerOrdersPage;
