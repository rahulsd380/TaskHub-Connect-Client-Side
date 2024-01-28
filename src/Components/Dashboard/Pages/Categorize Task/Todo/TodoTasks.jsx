import { FaUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { FaRegCaretSquareRight } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import useAxiosClient from "../../../../../hooks/useAxiosClient";
import useAllTasks from "../../../../../hooks/useAllTasks";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import useAllComments from "../../../../../hooks/useAllComments";
import Lottie from "lottie-react";
import empty from "../../../../../../public/empty.json";


const TodoTasks = ({list}) => {
    const {_id, title, userName, deadline, taskDescription} = list;
    const {user} = useContext(AuthContext);
    const axiosUser = useAxiosClient();
    
    const [, , refetch] = useAllTasks();
    
  
    const [allComments, , reload ] = useAllComments(_id);
  
  
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
  
  
    const handleCommentSubmit = (e, taskId) => {
      e.preventDefault();
      const userName = user?.displayName;
      const email = user?.email;
      const postId = taskId
      console.log(postId);
      const comments = e.target.comment.value;
  
      const CommentInfo = {userName, email, postId, comments};
      axiosUser.post('/comments', CommentInfo).then((res) => {
        console.log(res.data);
        reload();
      });
    }
    return (
        <div>
            <div>
                  <div className="bg-[#F1F1F2] p-3 rounded-md">
                    <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                      {title}
                    </h1>

                    <div className="flex justify-between items-center mb-1">
                      <p className="flex items-center gap-2 text-sm text-[#6D6E70]">
                        <FaUser></FaUser> {userName}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-[#6D6E70]">
                        <MdOutlineDateRange></MdOutlineDateRange>{" "}
                        {deadline}
                      </p>
                    </div>

                    <p className="mb-2 text-[#6D6E70]">
                      {taskDescription}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="">
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button
                          className="text-gray-500 font-semibold px-4 py-1 border border-teal-500 rounded-md w-full text-center flex items-center gap-2 text-sm"
                          onClick={() =>
                            document
                              .getElementById(`my_modal_${_id}`)
                              .showModal()
                          }
                        >
                          <BiCommentDetail></BiCommentDetail> Comment
                        </button>
                        <dialog id={`my_modal_${_id}`} className="modal">
                          <div className="modal-box bg-gray-200">
                            <div>
                              <div className="flex items-center gap-3 relative mb-4">
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
                                    {title}
                                  </h1>
                                  <p className="text-gray-500 font-semibold text-xs">
                                    Web Developer
                                  </p>
                                </div>
                              </div>
                            </div>
                            <form onSubmit={(e) => handleCommentSubmit(e, _id)}>
                              <div className="grid grid-cols-1 gap-5 mb-5">
                                <div className="">
                                  <h1 className="text-xl text-red-500 font-bold">
                                    {userName}
                                  </h1>

                                  <p className="text-gray-500 pb-2 border-gray-400 border-b">
                                    {taskDescription}
                                  </p>
                                </div>

                                <div className="bg-white rounded-md p-3">
                                  
                                    

                                    <div className="grid grid-cols-1 gap-3 w-full">
                                    {
                                     allComments.length < 1 ? <div className="flex items-center gap-3">
                                        <div className="w-10"><Lottie animationData={empty}></Lottie></div>
                                        <p>No comment available</p>
                                     </div>
                                     :
                                     allComments.map(comment => <div key={comment._id} className="bg-gray-100 rounded-md w-full p-2">
                                     <div className="flex gap-3">
                                     <img
                                   className="w-7 h-7 rounded-full bg-teal-100"
                                   src="/public/vite.svg"
                                   alt=""
                                 />
                                   <div>
                                   <h1 className="text-xl text-red-500 font-bold">
                                     {comment.userName}
                                   </h1>
                                   <p>
                                     {comment.comments}
                                   </p>
                                   </div>
                                   </div>
                                 </div>)
                                    }
                                    </div>
                                  
                                </div>
                              </div>

                              <div className="flex items-center">
                                <input
                                  name="comment"
                                  className="bg-white border border-gray-400 outline-none px-2 py-1 rounded-l-md w-full"
                                  type="text"
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
                <Toaster position="bottom-center" reverseOrder={false} />
        </div>
    );
};

export default TodoTasks;