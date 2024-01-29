import { useQuery } from "@tanstack/react-query";
import useAxiosClient from "./useAxiosClient";



const useAllCollaborators = (collaboratorId) => {
    const axiosUser = useAxiosClient();
    const {refetch: reload, isPending:isLoading, data: allCollaborators = []} = useQuery({
        queryKey: ['collaborators', collaboratorId],
        queryFn: async () => {
            const res = await axiosUser.get(`/collaborators/${collaboratorId}`);
            return res.data;
        }
    })
    return [allCollaborators, isLoading, reload];
};

export default useAllCollaborators;