import axios from "axios";


const axiosAddTask = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAddTask = () => {
    return axiosAddTask;
};

export default useAddTask;