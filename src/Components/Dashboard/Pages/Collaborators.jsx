import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosClient from "../../../hooks/useAxiosClient";
import Header from "./Header";
import { BsBuildingAdd } from "react-icons/bs";
import { FaBuildingUser } from "react-icons/fa6";

const Collaborators = () => {
  //Fetching users data from api
  const [allUsers, setAllUsers] = useState([]);
  const axiosUser = useAxiosClient();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosUser.get("/users");
      setAllUsers(res.data);
      return res.data;
    },
  });

  return (
    <div>
        <Header></Header>
        <h1 className="text-2xl text-gray-500 font-bold mb-7 flex items-center gap-2">
          <FaBuildingUser className="text-teal-500"></FaBuildingUser> Collaborate with your team members
          </h1>
        <div className="grid grid-cols-5 gap-8">
      {allUsers.map((user) => (
        <div
          key={user._id}
          className="bg-white p-3 rounded-md flex justify-center items-center"
        >
          <div>
            <div className="flex justify-center">
              <img
                className="w-16 h-16 rounded-full bg-teal-100 mb-2"
                src="/public/vite.svg"
                alt=""
              />
            </div>
            <h1 className="text-xl text-gray-500 font-bold text-center">
              {user.name}
            </h1>
            <p className="font-semibold text-gray-500 text-sm text-center">
              Web Developer
            </p>
            <p className="text-gray-500 mb-2 text-sm text-center flex items-center gap-1">
              <MdOutlineEmail></MdOutlineEmail> {user.email}
            </p>

            <div className="">
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="text-gray-200 font-semibold px-4 py-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded w-full text-center"
                onClick={() =>
                  document.getElementById(`my_modal_${user._id}`).showModal()
                }
              >
                Assign Task
              </button>
              <dialog id={`my_modal_${user._id}`} className="modal">
                <div className="modal-box bg-gray-200">
                  <h3 className="font-bold text-lg text-gray-600 mb-6">
                    {`Assign Your Task to ${user.name}`}
                  </h3>
                  <form>
                    <div className="grid grid-cols-1 gap-5">
                      <div className="mb-2">
                        <p className="mb-1 font-semibold text-gray-600">
                          Title
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
                        Assign Now
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
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Collaborators;
