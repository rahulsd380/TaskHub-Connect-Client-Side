import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import finding from "../../../../../../public/finding.json";
import Lottie from "lottie-react";
import { FaTasks } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import useAllUsers from './../../../../../hooks/admin/useAllUser';
import Header from "../../../Pages/Header";
import AllUserTable from "./AllUserTable";

const AllUser = () => {

  const [allUsers, isLoading, refetch] = useAllUsers();





  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Header></Header>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-gray-500 font-bold flex items-center gap-2">
          <FaTasks className="text-teal-500"></FaTasks> Manage All Users
        </h1>

      </div>

      <div className="overflow-x-auto pt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white text-sm bg-teal-500">
              <th>SL.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
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
              {allUsers.map((user, index) => (
                <AllUserTable key={user._id} user={user} index={index}></AllUserTable>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AllUser;
