'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import{ useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const WorkerProfileUpdatePage = () => {
  const router = useRouter();
  const [worker, setWorker] = useState({
    id: 0,
    name: '',
    email: '',
    hourlyRate: 0,
    availability: false,
  });

  const [updatedWorker, setUpdatedWorker] = useState({
    name: '',
    email: '',
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

          setWorker(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching worker profile:', error);
      }
    };

    fetchWorkerProfile();
  }, []);

  const handleChange = (e:any) => {
    const { name, value, checked } = e.target;

    setWorker((prevWorker) => ({
      ...prevWorker,
      [name]: name === 'availability' ? checked : value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:3000/workers/${worker.id}`, worker, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setWorker(response.data);

      console.log(response.data);

      toast.success('Worker Profile updated!', {
        duration: 1500,
        style: { backgroundColor: 'green', color: 'white' },
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });

      console.log('Worker Profile updated:', response.data);
      router.push('/workerProfile');
    } catch (error) {
      console.error('Error updating worker Profile:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Worker Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={worker.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={worker.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label>Hourly Rate:</label>
            <input
              type="number"
              name="hourlyRate"
              value={worker.hourlyRate}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label>Availability:</label>
            <input
              type="checkbox"
              name="availability"
              checked={worker.availability}
              onChange={handleChange}
              className="input-checkbox"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Update</button>
        </form>
      </div>
    </div>
  );
};

export default WorkerProfileUpdatePage;
