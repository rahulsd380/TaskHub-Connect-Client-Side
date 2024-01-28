import { useContext, useEffect, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { FaAnglesRight, FaArrowsTurnToDots } from "react-icons/fa6";
import { MdCallMissedOutgoing } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdAddCard } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { AiOutlineFundView } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { IoMdNotificationsOutline } from "react-icons/io";

const SideBarDrawer2 = () => {
  const {logout, user} = useContext(AuthContext);
  const handleLogout = () => {
    logout()
    .then(result => {
      console.log(result.user);
    })
    .then(error => {
      console.log(error);
    })
  }


  const [todoList, setTodoList] = useState([]);

  const  url = `https://task-management-server-delta-three.vercel.app/tasks?email=${user?.email}`
  console.log(todoList);

  useEffect( () => {
      setTimeout(() => {
          fetch(url)
          .then(res => res.json())
          .then(data => {
              setTodoList(data)
          })
      }, 2000)
  }, [url, setTodoList])

  const todoLists = todoList.filter(list => list.status === 'to-do');
  const ongoingLists = todoList.filter(list => list.status === 'On-going');
  const completedLists = todoList.filter(list => list.status === 'Completed');



  return (
    <div className="">
      <div className="drawer">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button"
          >
                        <RiMenu3Fill className="text-teal-500 text-3xl cursor-pointer"></RiMenu3Fill>
                    
          </label>
        </div>
        <div className="drawer-side z-40">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          
          <ul className="menu p-4 w-80 min-h-full bg-gray-800 text-gray-100">
            {/* Sidebar content here */}
            <div className="flex items-center mb-10">
            <img
              className="w-10"
              src="https://i.ibb.co/FBLHBHw/logo.png"
              alt=""
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">TaskWave</h1>
          </div>

                <div className="flex items-center mb-6">
            <input type="text" placeholder="Find Anything..." className="px-2 h-10 rounded-l-md border-y border-l border-gray-400" />
            <div className="border border-gray-400 px-2 h-10 rounded-r-md flex justify-center items-center">
            <FaAnglesRight className="text-teal-600 text-3xl"></FaAnglesRight>
            </div>
            </div>


                <div className="space-y-4">
                <Link to={"/"} className='text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3'><GoHome></GoHome> Home</Link>
                    <NavLink to={"/dashboard/addTask"} className='text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3'><MdAddCard></MdAddCard>Add New Task</NavLink>
                    <NavLink to={"/dashboard/allTasks"} className='text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3'><MdManageHistory></MdManageHistory> Manage All Tasks</NavLink>
                    <div>
                    <NavLink to={"/dashboard/herosection"} className='text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3 mb-3'><AiOutlineFundView></AiOutlineFundView> Task Overview</NavLink>
                        <div className="px-7">
                        <NavLink to={"/dashboard/todo"} className='text-gray-300 text-sm font-semibold hover:text-teal-500 transition duration-300 flex items-center justify-between gap-3 mb-3 border-b border-gray-400 pb-2'><p className="flex items-center gap-3"><FaArrowsTurnToDots className="text-rose-600"></FaArrowsTurnToDots> To-Do</p> <span>({todoLists.length})</span></NavLink>
                        <NavLink to={"/dashboard/ongoing"} className='text-gray-300 text-sm font-semibold hover:text-teal-500 transition duration-300 flex items-center justify-between gap-3 mb-3 border-b border-gray-400 pb-2'><p className="flex items-center gap-3"><MdCallMissedOutgoing className="text-yellow-600"></MdCallMissedOutgoing> Ongoing</p> <span>({ongoingLists.length})</span></NavLink>
                        <NavLink to={"/dashboard/completed"} className='text-gray-300 text-sm font-semibold hover:text-teal-500 transition duration-300 flex items-center justify-between gap-3 mb-3 border-b border-gray-400 pb-2'><p className="flex items-center gap-3"><IoCheckmarkDoneCircleSharp className="text-green-600"></IoCheckmarkDoneCircleSharp> Completed</p> <span>({completedLists.length})</span></NavLink>
                        </div>
                    </div>
                    <NavLink to={"/dashboard/calender"} className='text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3'><SlCalender></SlCalender>Calender</NavLink>
                    <NavLink to={"/dashboard/manageProducts"} className='text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3'><IoMdNotificationsOutline></IoMdNotificationsOutline>Notifications</NavLink>
                </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBarDrawer2;
