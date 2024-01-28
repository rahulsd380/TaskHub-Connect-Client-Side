import { GoHome } from "react-icons/go";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { MdCallMissedOutgoing } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdAddCard } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { AiOutlineFundView } from "react-icons/ai";
import { FaHandsHelping } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import useAllTasks from "../../hooks/useAllTasks";
const DashboardLayout = () => {
  const [allTasks, refetch, ] = useAllTasks();


  const todoLists = allTasks.filter((list) => list.status === "to-do");
  const ongoingLists = allTasks.filter((list) => list.status === "On-going");
  const completedLists = allTasks.filter((list) => list.status === "Completed");
  return (
    <div>
      <Helmet>
        <title>Task Wave | Dashboard</title>
      </Helmet>
      <div className="flex">
        <div className="w-72 px-10 py-5 hidden md:hidden lg:flex flex-col gap-7 bg-gray-800 top-0 h-screen text-lg shadow flex-none font-Lato sticky">
        <div className="flex items-center">
          <img
            className="w-10"
            src="https://i.ibb.co/McS33RY/logo.png"
            alt=""
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            TaskHub Connect
          </h1>
        </div>
          <Link
            to={"/"}
            className="text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3"
          >
            <GoHome></GoHome> Home
          </Link>
          <NavLink
            to={"/dashboard/addTask"}
            className="text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3"
          >
            <MdAddCard></MdAddCard>Add New Task
          </NavLink>
          <NavLink
            to={"/dashboard/allTasks"}
            className="text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3"
          >
            <MdManageHistory></MdManageHistory> Manage All Tasks
          </NavLink>
          <div>
            <p className="text-gray-300 font-semibold flex items-center gap-3 mb-3">
              <AiOutlineFundView></AiOutlineFundView> Categorize Task
            </p>
            <div className="px-7">
              <NavLink
                to={"/dashboard/todo"}
                className="text-gray-400 text-sm font-semibold hover:text-teal-500 transition duration-300 flex items-center justify-between gap-3 mb-3 border-b border-gray-400 pb-2"
              >
                <p className="flex items-center gap-3">
                  <FaArrowsTurnToDots className="text-rose-600"></FaArrowsTurnToDots>{" "}
                  To-Do
                </p>{" "}
                <span>({todoLists.length})</span>
              </NavLink>
              <NavLink
                to={"/dashboard/ongoing"}
                className="text-gray-400 text-sm font-semibold hover:text-teal-500 transition duration-300 flex items-center justify-between gap-3 mb-3 border-b border-gray-400 pb-2"
              >
                <p className="flex items-center gap-3">
                  <MdCallMissedOutgoing className="text-yellow-600"></MdCallMissedOutgoing>{" "}
                  Ongoing
                </p>{" "}
                <span>({ongoingLists.length})</span>
              </NavLink>
              <NavLink
                to={"/dashboard/completed"}
                className="text-gray-400 text-sm font-semibold hover:text-teal-500 transition duration-300 flex items-center justify-between gap-3 mb-3 border-b border-gray-400 pb-2"
              >
                <p className="flex items-center gap-3">
                  <IoCheckmarkDoneCircleSharp className="text-green-600"></IoCheckmarkDoneCircleSharp>{" "}
                  Completed
                </p>{" "}
                <span>({completedLists.length})</span>
              </NavLink>
            </div>
          </div>
          <NavLink
            to={"/dashboard/collaborators"}
            className="text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3"
          >
            <FaHandsHelping></FaHandsHelping>Collaborators
          </NavLink>

          <NavLink
            to={"/dashboard/calender"}
            className="text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3"
          >
            <SlCalender></SlCalender>Calender
          </NavLink>
          <NavLink
            to={"/dashboard/manageProducts"}
            className="text-gray-300 font-semibold hover:text-teal-500 transition duration-300 flex items-center gap-3"
          >
            <IoMdNotificationsOutline></IoMdNotificationsOutline>Notifications
          </NavLink>
        </div>

        <div className="px-5 flex-auto overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
