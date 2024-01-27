import axios from "axios";


const axiosUser = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosClient = () => {
    return axiosUser;
};

export default useAxiosClient;