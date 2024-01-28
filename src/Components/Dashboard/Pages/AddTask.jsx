import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import task2 from "../../../../public/task2.json";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { BsBuildingAdd } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAddTask from "../../../hooks/useAddTask";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const axiosAddTask = useAddTask();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [titleError, setTitleError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const onSubmit = async (data) => {
    console.log(data);

    const info = {
      userName: user.displayName,
      email: user.email,
      title: data.title,
      deadline: data.deadline,
      priority: data.priority,
      taskDescription: data.taskDescription,
      status: "to-do",
    };

    if (data.title.length == 0) {
      setTitleError("You have to provide a task title.");
      return;
    } else if (data.deadline == 0) {
      setDeadlineError("Add a task deadline.");
      return;
    } else if (data.taskDescription == 0) {
      setDescriptionError("Write a proper description for your project.");
      return;
    }

    setTitleError("");
    setDeadlineError("");
    setDescriptionError("");

    try {
      const allTasks = await axiosAddTask.post("/tasks", info);
      console.log(allTasks.data);

      if (allTasks.data.insertedId) {
        reset();
        Swal.fire({
          icon: "success",
          title: "Your task has been created",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/allTasks");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>

      <div>
        <h1 className="text-2xl text-gray-500 font-bold mb-7 flex items-center gap-2">
          <BsBuildingAdd className="text-teal-500"></BsBuildingAdd> Add A New
          Task
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center border bg-gray-50 p-3 rounded-lg">
            {/* Text Information Section */}
            <div className="">
              {titleError ? (
                <p className="bg-rose-600 p-2 rounded-lg text-white flex items-center gap-2 mb-2">
                  <MdError></MdError> {titleError}
                </p>
              ) : (
                ""
              )}

              {deadlineError ? (
                <p className="bg-rose-600 p-2 rounded-lg text-white flex items-center gap-2 mb-2">
                  <MdError></MdError> {deadlineError}
                </p>
              ) : (
                ""
              )}

              {descriptionError ? (
                <p className="bg-rose-600 p-2 rounded-lg text-white flex items-center gap-2 mb-2">
                  <MdError></MdError> {descriptionError}
                </p>
              ) : (
                ""
              )}

              <div className="mb-3">
                <p className="mb-1 font-semibold text-gray-600">Task Title</p>
                <input
                  {...register("title")}
                  className="bg-white border border-gray-400 outline-none px-2 py-1 rounded w-full"
                  type="text"
                  placeholder="Title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-3 items-center">
                <div className="">
                  <p className="mb-1 font-semibold text-gray-600">
                    Task Deadline
                  </p>
                  <input
                    {...register("deadline")}
                    className="bg-white border border-gray-400 outline-none px-2 py-1 rounded w-full"
                    type="date"
                    placeholder="Enter the deadline"
                  />
                </div>

                <div className="">
                  <p className="mb-1 font-semibold text-gray-600">
                    Priority Level
                  </p>
                  <select
                    name="priority"
                    {...register("priority")}
                    className="bg-white border border-gray-400 outline-none px-2 py-1 rounded w-full"
                  >
                    <option disabled selected>
                      Select
                    </option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="most important"> Most Important </option>
                  </select>
                </div>
              </div>

              <div className="mb-2">
                <p className="mb-1 font-semibold text-gray-600">
                  Task Description
                </p>
                <textarea
                  {...register("taskDescription")}
                  placeholder="Enter the task description"
                  className="bg-white border border-gray-400 outline-none px-2 py-2 rounded w-full"
                  name="taskDescription"
                  id=""
                  rows="8"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-5 md:gap-10">
                <Link to={"/"}>
                  <button className="text-gray-500 bg-white font-semibold px-4 py-2 border-2 rounded-md w-full text-center">
                    Cancel
                  </button>
                </Link>

                <button className="text-gray-200 font-semibold px-4 py-2 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-md w-full text-center">
                  Add New
                </button>
              </div>
            </div>

            {/* Animation */}
            <div className="w-11/12">
              <Lottie animationData={task2} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
