import { useQuery } from "@tanstack/react-query";
import useAxiosClient from "../useAxiosClient";


const useAllUsers = () => {
    const axiosUser = useAxiosClient();
    const {refetch, isPending:isLoading, data: allUsers = []} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosUser.get('/users');
            return res.data;
        }
    })
    return [allUsers, isLoading, refetch];
};

export default useAllUsers;