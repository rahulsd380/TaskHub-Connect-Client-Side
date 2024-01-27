import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Dropdown from "../Dropdown/Dropdown";
import SideBarDrawer from "../SideBarDrawer/SideBarDrawer";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="px-5 shadow-lg border-b md:shadow-none md:border-none top-0 py-3">
      <div className="flex justify-between">
        <SideBarDrawer></SideBarDrawer>
        <div className="flex items-center gap-3">
          <img
            className="w-10"
            src="https://i.ibb.co/McS33RY/logo.png"
            alt=""
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            TaskHub Connect
          </h1>
        </div>

        <div className="hidden md:flex md:items-center md:gap-8">
          <Link
            to={"/"}
            className="hover:text-teal-500 transition duration-300 text-gray-500 font-semibold dark:text-green-400"
          >
            Home
          </Link>
          <Link
            to={"/aboutUs"}
            className="hover:text-teal-500 transition duration-300 text-gray-500 font-semibold dark:text-green-400"
          >
            About Us
          </Link>

          <Link
            to={"/blogs"}
            className="hover:text-teal-500 transition duration-300 text-gray-500 font-semibold dark:text-green-400"
          >
            Blog
          </Link>
          <Link
            to="faq"
            className="hover:text-teal-500 transition duration-300 text-gray-500 font-semibold dark:text-green-400"
          >
            FAQ
          </Link>

          <Link
            to={"/dashboard/allTasks"}
            className="hover:text-teal-500 transition duration-300 text-gray-500 font-semibold dark:text-green-400"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex items-center">
          {!user ? (
            <div className="hidden md:flex gap-5">
              <Link to={"/login"}>
                <button className="text-blue-500 border border-blue-400 font-semibold  rounded-md hover:bg-blue-400 transition duration-300 hover:text-white px-6 py-2">
                  Login
                </button>
              </Link>

              <Link to={"/signup"}>
                <button className="text-white bg-gradient-to-r from-blue-400 to-blue-500 font-semibold border-blue-400 rounded-md py-2 px-6">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            ""
          )}

          {user ? (
            <div>
              <Dropdown></Dropdown>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
