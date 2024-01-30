import { FaPersonRunning } from "react-icons/fa6";
import { IoMdDoneAll } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoPersonRemove } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import useAxiosClient from "../../../../../hooks/useAxiosClient";
import Swal from "sweetalert2";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const AllUserTable = ({ user, index }) => {
  const { _id, name, email, role } = user;
  const axiosUser = useAxiosClient();

  const [allUsers, setAllUsers] = useState([]);
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosUser.get("/users");
      setAllUsers(res.data);
      return res.data;
    },
  });

  const handleDeleteUser = (user) => {
    console.log(user);
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
        axiosUser.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User removed successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    axiosUser.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `${user.name}has been appointed as new admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    axiosUser.patch(`/users/user/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `${user.name}has been removed from admin panel`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <tr className="bg-gradient-to-r from-slate-100 to-emerald-100 border-b-1 pb-2 border-gray-300">
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDeleteUser(user)}
            className="p-2 border rounded-md bg-gray-50 flex justify-center items-center tooltip text-rose-600"
            data-tip="Remove User"
          >
            <MdDelete></MdDelete>
          </button>

          <button
            onClick={() => handleRemoveAdmin(user)}
            className="p-2 border rounded-md bg-gray-50 flex justify-center items-center text-yellow-600 tooltip"
            data-tip="Remove From Admin Panel"
          >
            <IoPersonRemove></IoPersonRemove>
          </button>

          <button
            onClick={() => handleMakeAdmin(user)}
            className="p-2 border rounded-md bg-gray-50 flex justify-center items-center text-blue-500 tooltip"
            data-tip="Make Admin"
          >
            <GrUserAdmin></GrUserAdmin>
          </button>
        </div>
      </td>
      <Toaster position="bottom-center" reverseOrder={false} />
    </tr>
  );
};

export default AllUserTable;
