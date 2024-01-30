import Header from "../../Header";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import finding from "../../../../../../public/finding.json";
import empty from "../../../../../../public/empty.json";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import useAllTasks from "../../../../../hooks/useAllTasks";
import TodoTasks from "./TodoTasks";

const Todo = () => {
  const [allTasks, isLoading] = useAllTasks();

  const todoLists = allTasks.filter((list) => list.status === "to-do");

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Header></Header>

      <h1 className="text-3xl font-bold mb-7 pb-3 border-b text-gray-500 flex items-center gap-2">
        <FaArrowsTurnToDots className="text-blue-400"></FaArrowsTurnToDots>{" "}
        To-Do Task List
      </h1>
      {isLoading ? (
        <div className="flex justify-center">
          <div className="w-48">
            <Lottie animationData={finding}></Lottie>
          </div>{" "}
        </div>
      ) : (
        <div>
          {isLoading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : todoLists.length == 0 ? (
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <div className="w-48">
                  <Lottie animationData={empty}></Lottie>
                </div>
                <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-4xl font-semibold text-center mb-5">
                  No task available
                </h1>
                <Link to={"/dashboard/addTask"}>
                  <button className="text-white font-semibold px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 transition duration-300 rounded-md text-center">
                    Add New Task
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {todoLists.map((list) => (
                <TodoTasks key={list._id} list={list}></TodoTasks>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Todo;
