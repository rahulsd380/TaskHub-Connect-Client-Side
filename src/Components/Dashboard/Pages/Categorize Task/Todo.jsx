import { FaUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import Header from "../Header";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import finding from "../../../../../public/finding.json";
import empty from "../../../../../public/empty.json";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { FaRegCaretSquareRight } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import useAxiosClient from "../../../../hooks/useAxiosClient";
import useAllTasks from "../../../../hooks/useAllTasks";

const Todo = () => {
  const axiosUser = useAxiosClient();
  const [allTasks, isLoading, refetch] = useAllTasks();

  const todoLists = allTasks.filter((list) => list.status === "to-do");

  const handleMakeCompleted = (item) => {
    axiosUser.patch(`/tasks/completed/${item._id}`).then((res) => {
      console.log(res.data);
      const toastId = toast.loading("Updating status...");
      if (res.data.modifiedCount > 0) {
        toast.success(`${item.title} status has been updated to On-going`, {
          id: toastId,
        });
        refetch();
      }
    });
  };
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Header></Header>

      <h1 className="text-3xl font-bold mb-7 pb-3 border-b text-gray-500 flex items-center gap-2">
        <FaArrowsTurnToDots className="text-teal-500"></FaArrowsTurnToDots>{" "}
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
                <h1 className="text-teal-500 text-4xl font-semibold text-center mb-5">
                  No task available
                </h1>
                <Link to={"/dashboard/addTask"}>
                  <button className="text-white font-semibold px-4 py-2 bg-gradient-to-r from-emerald-300 to-emerald-500 transition duration-300 rounded-md text-center">
                    Add New Task
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {todoLists.map((list) => (
                <div key={list._id}>
                  <div className="bg-[#F1F1F2] p-3 rounded-md">
                    <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                      {list.title}
                    </h1>

                    <div className="flex justify-between items-center mb-1">
                      <p className="flex items-center gap-2 text-sm text-[#6D6E70]">
                        <FaUser></FaUser> {list.userName}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-[#6D6E70]">
                        <MdOutlineDateRange></MdOutlineDateRange>{" "}
                        {list.deadline}
                      </p>
                    </div>

                    <p className="mb-2 text-[#6D6E70]">
                      {list.taskDescription}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="">
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button
                          className="text-gray-500 font-semibold px-4 py-1 border border-teal-500 rounded-md w-full text-center flex items-center gap-2 text-sm"
                          onClick={() =>
                            document
                              .getElementById(`my_modal_${list._id}`)
                              .showModal()
                          }
                        >
                          <BiCommentDetail></BiCommentDetail> Comment
                        </button>
                        <dialog id={`my_modal_${list._id}`} className="modal">
                          <div className="modal-box bg-gray-200">
                            <div>
                              <div className="flex items-center gap-3 relative">
                                <div className="modal-action absolute top-0 right-0">
                                  <form
                                    method="dialog"
                                    className="flex gap-10 w-full"
                                  >
                                    {/* if there is a button in form, it will close the modal */}
                                    <button data-tip="Close" className="text-gray-500 border font-semibold text-xl text-center tooltip">
                                      <MdOutlineCancelPresentation></MdOutlineCancelPresentation>
                                    </button>
                                  </form>
                                </div>
                                <img
                                  className="w-10 h-10 rounded-full bg-teal-100"
                                  src="/public/vite.svg"
                                  alt=""
                                />
                                <div className="">
                                  <h1 className="text-xl text-red-500 font-bold">
                                    {list.title}
                                  </h1>
                                  <p className="text-gray-500 font-semibold text-xs">
                                    Web Developer
                                  </p>
                                </div>
                              </div>
                            </div>
                            <form>
                              <div className="grid grid-cols-1 gap-5 mb-5">
                                <div className="">
                                  <h1 className="text-xl text-red-500 font-bold">
                                    {list.title}
                                  </h1>

                                  <p className="text-gray-500 pb-2 border-gray-400 border-b">
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Sapiente aut eveniet
                                    dolorem sed doloribus! Dolorem assumenda,
                                    sed veniam qui explicabo, expedita facere,
                                    debitis ipsum laborum vero eius numquam sunt
                                    ut.
                                  </p>
                                </div>

                                <div className="bg-white rounded-md p-3">
                                  <div className="flex gap-3">
                                    <img
                                      className="w-7 h-7 rounded-full bg-teal-100"
                                      src="/public/vite.svg"
                                      alt=""
                                    />

                                    <div className="bg-gray-100 rounded-md w-full">
                                      <h1 className="text-xl text-red-500 font-bold">
                                        {list.title}
                                      </h1>
                                      <p>
                                        Have to finish the task today.Mind it.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <input
                                  name="email"
                                  className="bg-white border border-gray-400 outline-none px-2 py-1 rounded-l-md w-full"
                                  type="email"
                                  placeholder="Comment As Rahul Sutradhar"
                                />
                                <button className="text-gray-200 font-semibold p-1 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-r-md text-center border border-green-600">
                                  <FaRegCaretSquareRight className="text-2xl"></FaRegCaretSquareRight>
                                </button>
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
                        data-tip="Mark As Competed"
                        onClick={() => handleMakeCompleted(list)}
                        className="text-gray-200 font-semibold px-4 py-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-md w-full flex justify-center items-center gap-2 text-sm border border-teal-500 tooltip"
                      >
                        <IoCheckmarkDoneSharp></IoCheckmarkDoneSharp> Completed
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Todo;
