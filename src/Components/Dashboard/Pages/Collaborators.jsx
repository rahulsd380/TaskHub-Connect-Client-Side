import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosClient from "../../../hooks/useAxiosClient";

const Collaborators = () => {

    //Fetching users data from api
    const [allUsers, setAllUsers] = useState([]);
    const axiosUser = useAxiosClient();
      const {refetch, data: users =[] } = useQuery({
          queryKey: ['user'],
          queryFn: async () => {
           const res = await axiosUser.get('/users');
           setAllUsers(res.data)
          return res.data
       } 
      })


    return (
        <div className="grid grid-cols-5 gap-8">
           {
            allUsers.map(user =>  <div key={user._id} className="bg-white p-3 rounded-md flex justify-center items-center">
            <div>
                
            <div className="flex justify-center">
            <img className="w-16 h-16 rounded-full bg-teal-100 mb-2" src="/public/vite.svg" alt="" />
            </div>
            <h1 className="text-xl text-gray-500 font-bold text-center">{user.name}</h1>
            <p className="font-semibold text-gray-500 text-sm text-center">Web Developer</p>
            <p className="text-gray-500 mb-2 text-sm text-center flex items-center gap-1"><MdOutlineEmail></MdOutlineEmail> {user.email}</p>
            <button className="text-gray-200 font-semibold px-4 py-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded w-full text-center">
              Assign Task
            </button>
            </div>
        </div>)
           }
        </div>
    );
};

export default Collaborators;