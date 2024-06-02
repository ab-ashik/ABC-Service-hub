"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientCard from "./ClientCard/page";

const Dashboard = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clients");
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the first render

  console.log(clients);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5 max-w-6xl mx-auto my-12 px-4 md:px-2 lg:px-2">
      {
        clients.map(client => <ClientCard key={client.id} client={client}></ClientCard>)
      }
    </div>
  );
};

export default Dashboard;
