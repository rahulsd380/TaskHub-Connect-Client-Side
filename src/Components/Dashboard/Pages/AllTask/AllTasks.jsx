import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import finding from "../../../../../public/finding.json";
import Lottie from "lottie-react";
import { FaTasks } from "react-icons/fa";
import useAxiosClient from "../../../../hooks/useAxiosClient";
import Header from "../Header";
import AllTaskTable from "./AllTaskTable";
import { Toaster } from "react-hot-toast";
import useAllTasks from "../../../../hooks/useAllTasks";

const AllTasks = () => {

  const [allTasks, isLoading, refetch] = useAllTasks();
  const axiosUser = useAxiosClient();

  const [sortByCompleted, setSortByCompleted] = useState(false);
  const [sortByTodo, setSortByTodo] = useState(false);
  const [sortByOnGoing, setSortByOnGoing] = useState(false);

  const handleSortByCompleted = () => {
    setSortByCompleted(true);
    setSortByTodo(false);
    setSortByOnGoing(false);
  };

  const handleSortByTodo = () => {
    setSortByCompleted(false);
    setSortByTodo(true);
    setSortByOnGoing(false);
  };

  const handleSortByOnGoing = () => {
    setSortByCompleted(false);
    setSortByTodo(false);
    setSortByOnGoing(true);
  };

  const [dueDateFilter, setDueDateFilter] = useState(null);

  const handleDueDateFilter = (selectedDate) => {
    setDueDateFilter(selectedDate);
    // Clear other filters when due date filter is applied
    setSortByCompleted(false);
    setSortByTodo(false);
    setSortByOnGoing(false);
  };

  

  

  // Filter task
  const filteredTask = allTasks.filter((task) => {
    const completed = sortByCompleted ? task.status === "Completed" : true;
    const todo = sortByTodo ? task.status.toLowerCase() === "to-do" : true;
    const onGoing = sortByOnGoing ? task.status === "On-going" : true;
    const dueDateCondition = dueDateFilter
      ? new Date(task.deadline) <= new Date(dueDateFilter)
      : true;

    return completed && todo && onGoing && dueDateCondition;
  });



  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Header></Header>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-gray-500 font-bold flex items-center gap-2">
          <FaTasks className="text-teal-500"></FaTasks> Manage All Tasks
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <p className="text-gray-600 font-semibold">Status Filter:</p>
            <details className="dropdown">
              <summary className="bg-white border border-gray-300 hover:cursor-pointer hover:bg-teal-500 hover:text-white transition duration-300 p-2 rounded-md flex items-center gap-3">
                Filter <IoIosArrowDown></IoIosArrowDown>
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li>
                  <a onClick={() => handleSortByCompleted("Completed")}>
                    Completed
                  </a>
                </li>
                <li>
                  <a onClick={() => handleSortByTodo("to-do")}>To-do</a>
                </li>
                <li>
                  <a onClick={() => handleSortByOnGoing("On-going")}>
                    On-going
                  </a>
                </li>
              </ul>
            </details>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-gray-600 font-semibold">Due Date Filter:</p>
            <input
              type="date"
              onChange={(e) => handleDueDateFilter(e.target.value)}
              value={dueDateFilter || ""}
              className="border border-gray-300 px-2 py-1 rounded"
            />
          </div>

          <Link to={"/dashboard/addTask"}>
            <button className="text-white font-semibold px-4 py-2 bg-gradient-to-r from-emerald-300 to-emerald-500 transition duration-300 rounded-md text-center">
              Add New Task
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto pt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white text-sm bg-teal-500">
              <th>SL.</th>
              <th>Title</th>
              <th>Name</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th>Description</th>
              <th>Status</th>
              <th>Collaborators</th>
              <th>Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="w-48">
                <Lottie animationData={finding}></Lottie>
              </div>{" "}
            </div>
          ) : (
            <tbody>
              {filteredTask.map((task, index) => (
                <AllTaskTable key={task._id} task={task} index={index}></AllTaskTable>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AllTasks;
