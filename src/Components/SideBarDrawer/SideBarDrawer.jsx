import { useContext, useEffect, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineHelpCenter } from "react-icons/md";
import { LuFileQuestion } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const SideBarDrawer = () => {
  const { logout, user } = useContext(AuthContext);
  const handleLogout = () => {
    logout()
      .then((result) => {
        console.log(result.user);
      })
      .then((error) => {
        console.log(error);
      });
  };

  const [users, setUsers] = useState({});
  const url = `http://localhost:5000/users?email=${user?.email}`;
  console.log(users);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) =>  data.map((i) => setUsers(i)));
  }, [url]);

  return (
    <div className="block md:hidden">
      <div className="drawer">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button">
            <RiMenu3Fill className="text-blue-400 text-3xl cursor-pointer"></RiMenu3Fill>
          </label>
        </div>
        <div className="drawer-side z-40">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-80 min-h-full bg-gradient-to-r from-sky-50 to-blue-200 text-gray-100">
            {/* Sidebar content here */}
            <div className="flex items-center gap-3">
          <img
            className="w-10"
            src="https://i.ibb.co/SB6vPxw/logo.png"
            alt=""
          />
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            TaskHub Connect
          </h1>
        </div>

            <li className="space-y-3 mt-8">
              <Link
                to={"/"}
                className="text-gray-500 font-semibold hover:text-blue-400 transition duration-300 flex items-center gap-3 text-base"
              >
                <GoHome></GoHome> Home
              </Link>
              <Link
                to={"/"}
                className="text-gray-500 font-semibold hover:text-blue-400 transition duration-300 flex items-center gap-3 text-base"
              >
                <MdOutlineHelpCenter></MdOutlineHelpCenter> About Us
              </Link>
              <Link
                to={"/"}
                className="text-gray-500 font-semibold hover:text-blue-400 transition duration-300 flex items-center gap-3 text-base"
              >
                <LuFileQuestion></LuFileQuestion> FAQ
              </Link>
              {
                users.role == "user" &&
                <Link
                to={"/dashboard/allTasks"}
                className="text-gray-500 font-semibold hover:text-blue-400 transition duration-300 flex items-center gap-3 text-base"
              >
                <MdOutlineDashboardCustomize></MdOutlineDashboardCustomize>{" "}
                Dashboard
              </Link>
              }
              {
                users.role == "admin" &&
                <Link
                to={"/dashboard/allUser"}
                className="text-gray-500 font-semibold hover:text-blue-400 transition duration-300 flex items-center gap-3 text-base"
              >
                <MdOutlineDashboardCustomize></MdOutlineDashboardCustomize>{" "}
                Dashboard
              </Link>
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBarDrawer;
