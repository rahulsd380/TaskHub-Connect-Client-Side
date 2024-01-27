import { TbLogout2 } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";


const Dropdown = () => {
    const {logout, user} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user);
    const handleLogout = () => {
      logout()
      .then(result => {
        console.log(result.user);
        navigate('/login')
      })
      .then(error => {
        console.log(error);
      })
    }
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };




  return (
    <div className="relative inline-block text-left z-20">
      <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium "
        onClick={toggleDropdown}
      >

<div className="text-gray-500 flex items-center gap-2 font-semibold hover:text-teal-500 transition duration-300 text-base">
  
                        <FaRegUser></FaRegUser>
                        <p>{user?.displayName}</p>
                        <IoIosArrowDown></IoIosArrowDown>
                    </div>


        
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gradient-to-r from-slate-100 to-emerald-100 ring-1 ring-black ring-opacity-5 transition duration-300 opacity-100 border-2 border-teal-500">
          <div className='flex flex-col px-4'>
            <div className='flex justify-center border-b-2 border-teal-400 pb-2 mt-5'>
              <div>
              <div className='flex justify-center'>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-emerald-300 to-emerald-500 text-gray-200 text-2xl">
                        {
                            user?.photoURL ? <img className="rounded-full" src={user?. photoURL} alt="" /> :  <FaUserCircle className='text-5xl mb-2 text-teal-500'></FaUserCircle>
                        }
                       
                    </div>
              </div>
              <h1 className='text-xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent'>{user?.displayName}</h1>
              </div>
            </div>
                    
                      <Link to={"/dashboard/allTasks"} className="hover:text-teal-500 transition duration-300 text-teal-700 font-semibold mt-7 mb-2 border-b border-blue-900 pb-1">Dashboard</Link> 
                 

                    <Link to={"/userDashboard/teacherDashboard"} className="hover:text-teal-500 transition duration-300 text-teal-700 font-semibold mb-2 border-b border-blue-900 pb-1">View Profile</Link> 

                    <Link to={"/userDashboard/teacherDashboard"} className="hover:text-teal-500 transition duration-300 text-teal-700 font-semibold mb-2 border-b border-blue-900 pb-1">Help Center</Link> 


                    
            {user? <Link onClick={handleLogout} className='text-teal-600 hover:text-teal-500 transition duration-300 mb-4 text-base font-semibold flex items-center gap-3'>Logout <TbLogout2 className="text-xl"></TbLogout2></Link> :
            <Link to={"/login"} className='text-teal-700 hover:text-teal-500 transition duration-300 mb-4 text-base font-semibold flex items-center gap-3'>Login <BiLogIn className="text-xl"></BiLogIn></Link>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
