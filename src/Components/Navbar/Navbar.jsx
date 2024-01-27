import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Dropdown from "../Dropdown/Dropdown";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="px-5 shadow-lg border-b md:shadow-none md:border-none top-0 py-3">
      <div className="flex justify-between">
        <Drawer></Drawer>
        <div className="flex items-center">
          <img
            className="w-10"
            src="https://i.ibb.co/FBLHBHw/logo.png"
            alt=""
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
            TaskWave
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
                <button className="text-teal-500 border border-teal-400 font-semibold  rounded-md hover:bg-emerald-400 transition duration-300 hover:text-white px-6 py-2">
                  Login
                </button>
              </Link>

              <Link to={"/signup"}>
                <button className="text-white bg-gradient-to-r from-emerald-300 to-emerald-500 font-semibold border-teal-400 rounded-md py-2 px-6">
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
