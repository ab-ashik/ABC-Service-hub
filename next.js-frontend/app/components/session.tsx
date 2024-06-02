'use client'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


interface User {
    name: string;
    profilePicture: string;
    email: string;
    hourlyRate: number;
    availability: boolean;
}

export default function Session() {

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const token = localStorage.getItem("token");
                console.log(token);
                const email = localStorage.getItem("email");
                if(token)
                {
                    const response = await axios.get('http://localhost:3000/workers/get/'+email, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setUser(response.data);
                }
                else
                {
                    router.push('/workerLogin');
                }
            }
            catch(error)
            {
                console.error("An error occurred while fetching user data: ", error);

                router.push('/workerLogin');
            }
        };
        
        fetchUser();
    }, [router]);
    if(!user)
    {
        return <div></div>;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        router.push('/workerLogin');
    };

    return (
    //     <div className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
    //   {/* User name */}
    //   <div className="flex items-center">
    //     <div className="mr-3">
    //       {/* Profile picture */}
    //       <img src={user.profilePicture} alt="Profile" className="w-10 h-10 rounded-full cursor-pointer" onClick={() => setShowDropdown(!showDropdown)} />
    //     </div>
    //     <div>
    //       {/* User name */}
    //       <p className="text-lg font-semibold">{user.name}</p>
    //     </div>
    //   </div>
    //   {/* Dropdown menu */}
    //   {showDropdown && (
    //     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
    //       <button className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full" onClick={handleLogout}>Logout</button>
    //       {/* Add more options here */}
    //     </div>
    //   )}
    // </div>
    <>
    </>
  );
}
