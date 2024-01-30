import { FaUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import finding from "../../../../../public/finding.json";
import empty from "../../../../../public/empty.json";
import { IoMdDoneAll } from "react-icons/io";
import useAxiosClient from "../../../../hooks/useAxiosClient";
import useAllTasks from "../../../../hooks/useAllTasks";
import Header from "../Header";

const Completed = () => {
  const axiosUser = useAxiosClient();
  const [allTasks, isLoading, refetch] = useAllTasks();

  const completedLists = allTasks.filter((list) => list.status === "Completed");

  const handleMakeCompleted = (item) => {
    axiosUser.patch(`/tasks/completed/${item._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `${item.title}has been completed`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Header></Header>
      <h1 className="text-3xl font-bold mb-7 pb-3 border-b text-gray-500 flex items-center gap-2">
        <IoMdDoneAll className="text-blue-400"></IoMdDoneAll> Completed Task
        List
      </h1>
      {isLoading ? (
        <div className="flex justify-center">
          {" "}
          <div className="w-48">
            <Lottie animationData={finding}></Lottie>
          </div>{" "}
        </div>
      ) : (
        <div>
          {completedLists.length == 0 ? (
           <div className="flex justify-center items-center">
           <div className="flex flex-col justify-center items-center">
             <div className="w-48">
               <Lottie animationData={empty}></Lottie>
             </div>
             <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-4xl font-semibold text-center mb-5">
               You haven't completed any task
             </h1>
             <Link to={"/dashboard/allTasks"}>
               <button className="text-white font-semibold px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 transition duration-300 rounded-md text-center">
                 Do Now
               </button>
             </Link>
           </div>
         </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {completedLists.map((list) => (
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

                    <button
                      disabled
                      onClick={() => handleMakeCompleted(list)}
                      className="text-gray-400 font-semibold px-4 py-2 bg-gray-300 rounded-md w-full text-center"
                    >
                      Task Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Completed;
