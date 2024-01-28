import { FaAnglesRight } from "react-icons/fa6";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineNotificationsNone } from "react-icons/md";
import SideBarDrawer2 from "../../SideBarDrawer2/SideBarDrawer2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Dropdown from "../../Dropdown/Dropdown";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .then((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="space-y-7 pb-8 pt-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="block md:bolock lg:hidden">
              <SideBarDrawer2></SideBarDrawer2>
            </div>
            <div className="md:hidden flex items-center">
              <img
                className="w-10"
                src="https://i.ibb.co/FBLHBHw/logo.png"
                alt=""
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                TaskWave
              </h1>
            </div>
            <div className="hidden md:flex items-center">
              <input
                type="text"
                placeholder="Find Anything..."
                className="px-2 h-10 rounded-l-md border-y border-l border-gray-400"
              />
              <div className="border border-gray-400 px-2 h-10 rounded-r-md flex justify-center items-center">
                <FaAnglesRight className="text-teal-600 text-3xl"></FaAnglesRight>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdOutlineNotificationsNone className="text-2xl text-gray-500"></MdOutlineNotificationsNone>
            <Dropdown></Dropdown>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-100 to-emerald-100 p-3 rounded-2xl">
          <div className="max-w-2xl">
            <h1 className="text-gray-500 text-2xl font-bold mb-1">
              Welcome Back,{" "}
              <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                {user?.displayName}
              </span>
            </h1>
            <p className="text-gray-400">
              Efficiently manage tasks with personalized features. Elevate
              productivity and stay organized effortlessly. Welcome aboard!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
