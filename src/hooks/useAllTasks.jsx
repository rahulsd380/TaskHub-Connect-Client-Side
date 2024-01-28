import { useQuery } from "@tanstack/react-query";
import useAxiosClient from "./useAxiosClient";
import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";


const useAllTasks = () => {
    const {user} = useContext(AuthContext);
    const axiosUser = useAxiosClient();
    const {refetch, isPending:isLoading, data: allTasks = []} = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosUser.get(`/tasks?email=${user?.email}`);
            return res.data;
        }
    })
    return [allTasks, isLoading, refetch];
};

export default useAllTasks;