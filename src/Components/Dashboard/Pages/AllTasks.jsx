import { useContext, useState } from "react";
import { IoIosArrowDown, IoMdDoneAll } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPersonRunning } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import finding from "../../../../public/finding.json";
import Lottie from "lottie-react";
import { FaTasks } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAllTasks from "../../../hooks/useAllTasks";
import useAxiosClient from "../../../hooks/useAxiosClient";
import Header from "./Header";

const AllTasks = () => {
  const { user } = useContext(AuthContext);
  const [allTasks, isLoading, refetch] = useAllTasks();
  const axiosUser = useAxiosClient();



  const [sortByLow, setSortByLow] = useState(null);
  const [sortByModerate, setSortByModerate] = useState(null);
  const [sortByHigh, setSortByHigh] = useState(null);
  const [sortByMostImportant, setSortByMostImportant] = useState(null);


const handleSortByLow = () => {
  setSortByLow('Low');
};

const handleSortByModerate = () => {
  setSortByModerate('Moderate');
};

const handleSortByHigh = () => {
  setSortByHigh('High');
};

const handleSortByMostImportant = () => {
  setSortByMostImportant('Most Important');
};



  const handleUpdateTask = (e, _id) => {
    e.preventDefault();

    const userName = user.displayName;
    const title = e.target.title.value;
    const deadline = e.target.deadline.value;
    const priority = e.target.priority.value;
    const taskDescription = e.target.taskDescription.value;

    const allData = { userName, title, taskDescription, deadline, priority };
    console.log(allData);

    const toastId = toast.loading("Updating...");
    fetch(`https://task-management-server-delta-three.vercel.app/tasks/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Updated Successfully.", { id: toastId });
          refetch();
        }
      });
  };


  const handleMakeCompleted = (item) => {
    axiosUser.patch(`/tasks/completed/${item._id}`).then((res) => {
      console.log(res.data);
      const toastId = toast.loading("Updating status...");
      refetch();
      if (res.data.modifiedCount > 0) {
        toast.success(`Congratulations!! ${item.title} has been Completed`, {
          id: toastId,
        });
        refetch();
      }
    });
  };

  const handleDeleteTask = (i) => {
    console.log(i);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosUser.delete(`/tasks/${i._id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "User removed successfully.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  const handleMakeOngoing = (item) => {
    axiosUser.patch(`/tasks/ongoing/${item._id}`).then((res) => {
      console.log(res.data);
      const toastId = toast.loading("Updating status...");
      if (res.data.modifiedCount > 0) {
        toast.success(`${item.title} status has been changed to On-going`, {
          id: toastId,
        });
        refetch();
      }
    });
  };

  // Filter task
  const filteredTask = allTasks.filter((task) => {
    const low = sortByLow ? task.priority.toLowerCase() === 'low' : true;
    const moderate = sortByModerate ? task.priority.toLowerCase() === 'moderate' : true;
    const high = sortByHigh ? task.priority.toLowerCase() === 'high' : true;
    const mostImportant = sortByMostImportant ? task.priority.toLowerCase() === 'most important' : true;
  
    return low && moderate && high && mostImportant;
  });
  




  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Header></Header>
      <div className="flex justify-between">
      <h1 className="text-2xl text-gray-500 font-bold mb-7 flex items-center gap-2"><FaTasks className="text-teal-500"></FaTasks> Manage All Tasks</h1>

      <div className="flex items-center gap-3">
      <details className="dropdown">
          <summary className="bg-white border border-gray-300 hover:cursor-pointer hover:bg-teal-500 hover:text-white transition duration-300 p-2 rounded-md flex items-center gap-3">
            Filter <IoIosArrowDown></IoIosArrowDown>
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <a onClick={() => handleSortByLow('Low')}>Low</a>
            </li>
            <li>
              <a onClick={() => handleSortByModerate('Moderate')}>Moderate</a>
            </li>
            <li>
              <a onClick={() => handleSortByHigh('High')}>High</a>
            </li>
            <li>
              <a onClick={() => handleSortByMostImportant('Most Important')}>Most Important</a>
            </li>
          </ul>
        </details>

        
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
              <th>Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-48">
                <Lottie animationData={finding}></Lottie>
              </div>{" "}
            </div>
          ) : (
            <tbody>
              {filteredTask.map((task, index) => (
                <tr
                  key={task._id}
                  className="bg-gradient-to-r from-slate-100 to-emerald-100 border-b-1 pb-2 border-gray-300"
                >
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.userName}</td>
                  <td>{task.deadline}</td>
                  <td>{task.priority}</td>
                  <td>{task.taskDescription}</td>
                  <td>{task.status}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleDeleteTask(task)
                        }}
                        className="p-2 border rounded-md bg-gray-50 flex justify-center items-center tooltip text-rose-600"
                        data-tip="Delete Task"
                      >
                        <MdDelete></MdDelete>
                      </button>

                      <div className="">
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button
                          onClick={() =>
                            document
                              .getElementById(`my_modal_${task._id}`)
                              .showModal()
                          }
                          className="p-2 border rounded-md bg-gray-50 flex justify-center items-center text-sky-600 tooltip"
                          data-tip="Edit Task"
                        >
                          <MdModeEditOutline></MdModeEditOutline>
                        </button>
                        <dialog id={`my_modal_${task._id}`} className="modal">
                          <div className="modal-box bg-gray-200">
                            <h3 className="font-bold text-lg text-gray-600 mb-6">
                              Update Task Details
                            </h3>
                            <form
                              onSubmit={(e) => handleUpdateTask(e, task._id)}
                            >
                              <div className="grid grid-cols-1 gap-5">
                                <div className="mb-2">
                                  <p className="mb-1 font-semibold text-gray-600">
                                    House Title
                                  </p>
                                  <input
                                    required
                                    name="title"
                                    className="bg-white border border-gray-400 outline-none px-2 py-1 rounded w-full"
                                    type="text"
                                    placeholder="Title"
                                  />
                                </div>

                                <div className="mb-2">
                                  <p className="mb-1 font-semibold text-gray-600">
                                    Task Deadline
                                  </p>
                                  <input
                                    required
                                    name="deadline"
                                    className="bg-white border border-gray-400 outline-none px-2 py-1 rounded w-full"
                                    type="date"
                                    placeholder="Enter the deadline"
                                  />
                                </div>

                                <div className="mb-2">
                                  <p className="mb-1 font-semibold text-gray-600">
                                    Priority Level
                                  </p>
                                  <select
                                    name="priority"
                                    className="bg-white border border-gray-400 outline-none px-2 py-1 rounded w-full"
                                  >
                                    <option disabled selected>
                                      Select
                                    </option>
                                    <option value="low">Low</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="high">High</option>
                                    <option value="most important">
                                      Most Important
                                    </option>
                                  </select>
                                </div>

                                <div className="mb-2">
                                  <p className="mb-1 font-semibold text-gray-600">
                                    Task Description
                                  </p>
                                  <textarea
                                    placeholder="Enter the task description"
                                    className="bg-white border border-gray-400 outline-none px-2 py-1 rounded w-full"
                                    name="taskDescription"
                                    id=""
                                    cols="30"
                                    rows="10"
                                  ></textarea>
                                </div>
                              </div>

                              <div className="flex flex-row-reverse items-center gap-9">
                                <button className="text-gray-200 font-semibold px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-md w-full text-center mt-5">
                                  Save Changes
                                </button>

                                <div className="modal-action">
                                  <form
                                    method="dialog"
                                    className="flex gap-10 w-full"
                                  >
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="text-gray-500 border border-gray-600 font-semibold px-4 py-2 rounded-md w-full text-center">
                                      Cancel
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </form>

                            <div className="modal-action hidden">
                              <form
                                method="dialog"
                                className="flex gap-10 w-full"
                              >
                                {/* if there is a button in form, it will close the modal */}
                                <button className="text-gray-500 font-semibold px-4 py-2 rounded-md w-full text-center">
                                  Cancel
                                </button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </div>

                      <button
                        onClick={() => {
                          handleMakeOngoing(task)
                        }}
                        className="p-2 border rounded-md bg-gray-50 flex justify-center items-center text-yellow-600 tooltip"
                        data-tip="Mark as Ongoing"
                      >
                        <FaPersonRunning></FaPersonRunning>
                      </button>
                      <button
                       onClick={() => {
                        handleMakeCompleted(task)
                      }}
                        
                        
                        className="p-2 border rounded-md bg-gray-50 flex justify-center items-center text-green-600 tooltip"
                        data-tip="Mark as Done"
                      >
                        <IoMdDoneAll></IoMdDoneAll>
                      </button>
                    </div>
                  </td>
                </tr>
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
