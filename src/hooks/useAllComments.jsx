import { useQuery } from "@tanstack/react-query";
import useAxiosClient from "./useAxiosClient";


const useAllComments = (postId) => {
    const axiosUser = useAxiosClient();
    const {refetch: reload, isPending:isLoading, data: allComments = []} = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const res = await axiosUser.get(`/comments/${postId}`);
            return res.data;
        }
    })
    return [allComments, isLoading, reload];
};

export default useAllComments;