import { useContext, useState } from "react";
import { FaPersonRunning } from "react-icons/fa6";
import { IoMdDoneAll } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdDelete, MdModeEditOutline, MdOutlineEmail } from "react-icons/md";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAllTasks from "../../../../hooks/useAllTasks";
import useAxiosClient from "../../../../hooks/useAxiosClient";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const AllTaskTable = ({ task, index }) => {
  const { _id, title, userName, deadline, priority, taskDescription, status } =
    task;
  const { user } = useContext(AuthContext);
  const [allTasks, isLoading, refetch] = useAllTasks();
  const axiosUser = useAxiosClient();

  const handleUpdateTask = (e, _id) => {
    e.preventDefault();
    const userName = user.displayName;
    const title = e.target.title.value;
    const deadline = e.target.deadline.value;
    const priority = e.target.priority.value;
    const taskDescription = e.target.taskDescription.value;

    const allData = { userName, title, taskDescription, deadline, priority };

    const toastId = toast.loading("Updating...");
    fetch(`http://localhost:5000/tasks/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
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

  //Fetching users data from api
  const [allUsers, setAllUsers] = useState([]);
  const { data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosUser.get("/users");
      setAllUsers(res.data);
      return res.data;
    },
  });

  //   Collaborators add function
  const handleCollaboratorsubmit = (e, userId) => {
    e.preventDefault();
    const userName = user?.displayName;
    const email = user?.email;
    const collaboratorId = userId;
    console.log(collaboratorId);

    const collaboratorsInfo = { userName, email, collaboratorId };
    axiosUser.post("/collaborators", collaboratorsInfo).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <tr className="bg-gradient-to-r from-slate-100 to-emerald-100 border-b-1 pb-2 border-gray-300">
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{userName}</td>
      <td>{deadline}</td>
      <td>{priority}</td>
      <td>{taskDescription}</td>
      <td>{status}</td>
      <td>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handleDeleteTask(task);
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
                document.getElementById(`my_modal_${_id}`).showModal()
              }
              className="p-2 border rounded-md bg-gray-50 flex justify-center items-center text-sky-600 tooltip"
              data-tip="Edit Task"
            >
              <MdModeEditOutline></MdModeEditOutline>
            </button>
            <dialog id={`my_modal_${_id}`} className="modal">
              <div className="modal-box bg-gray-200">
                <h3 className="font-bold text-lg text-gray-600 mb-6">
                  Update Task Details
                </h3>
                <form onSubmit={(e) => handleUpdateTask(e, _id)}>
                  <div className="grid grid-cols-1 gap-5">
                    <div className="mb-2">
                      <p className="mb-1 font-semibold text-gray-600">Title</p>
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
                        <option value="most important">Most Important</option>
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
                      <form method="dialog" className="flex gap-10 w-full">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="text-gray-500 border border-gray-600 font-semibold px-4 py-2 rounded-md w-full text-center">
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </form>

                <div className="modal-action hidden">
                  <form method="dialog" className="flex gap-10 w-full">
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
              handleMakeOngoing(task);
            }}
            className="p-2 border rounded-md bg-gray-50 flex justify-center items-center text-yellow-600 tooltip"
            data-tip="Mark as Ongoing"
          >
            <FaPersonRunning></FaPersonRunning>
          </button>
          <button
            onClick={() => {
              handleMakeCompleted(task);
            }}
            className="p-2 border rounded-md bg-gray-50 flex justify-center items-center text-green-600 tooltip"
            data-tip="Mark as Done"
          >
            <IoMdDoneAll></IoMdDoneAll>
          </button>

          <div className="">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              onClick={() =>
                document.getElementById(`my_modal2_${_id}`).showModal()
              }
              className="p-2 border rounded-md bg-gray-50 flex justify-center items-center text-green-600 tooltip"
              data-tip="Add collaborators"
            >
              <IoPersonAddSharp></IoPersonAddSharp>
            </button>
            <dialog id={`my_modal2_${_id}`} className="modal">
              <div className="modal-box bg-gray-200">
                <h3 className="font-bold text-lg text-gray-600 mb-6">
                  Add Collaborators
                </h3>
                <div>
                  <div className="grid grid-cols-1 gap-3">
                    {allUsers.map((user) => (
                      <form onSubmit={(e) => handleCollaboratorsubmit(e, user._id)} className=" flex items-center" key={user._id}>
                        <button
                          data-tip={`Add ${user.name} to your team`}
                          className="bg-gray-50 px-2 rounded-md w-full text-start hover:bg-gray-100 transition duration-300 tooltip"
                        >
                          <h1 className="text-base text-gray-500 font-bold">
                            {user.name}
                          </h1>
                          <p className="text-gray-500 mb-2 text-sm text-center flex items-center gap-1">
                            <MdOutlineEmail /> {user.email}
                          </p>
                        </button>
                      </form>
                    ))}
                  </div>

                  <div className="flex flex-row-reverse items-center gap-9">
                    <button
                      type="submit" // Add this line to submit the form
                      className="text-gray-200 font-semibold px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-md w-full text-center mt-5"
                    >
                      Save Changes
                    </button>

                    <div className="modal-action">
                      <form method="dialog" className="flex gap-10 w-full">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="text-gray-500 border border-gray-600 font-semibold px-4 py-2 rounded-md w-full text-center">
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="modal-action hidden">
                  <form method="dialog" className="flex gap-10 w-full">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="text-gray-500 font-semibold px-4 py-2 rounded-md w-full text-center">
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </td>
      <Toaster position="bottom-center" reverseOrder={false} />
    </tr>
  );
};

export default AllTaskTable;
