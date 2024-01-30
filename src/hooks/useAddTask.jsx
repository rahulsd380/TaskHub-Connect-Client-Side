import axios from "axios";


const axiosAddTask = axios.create({
    baseURL: 'https://task-hub-connect-server.vercel.app'
})

const useAddTask = () => {
    return axiosAddTask;
};

export default useAddTask;