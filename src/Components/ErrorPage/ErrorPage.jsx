import Lottie from "lottie-react";
import error from "../../../public/error.json"
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="pb-5">
            <div className="flex justify-center">
            <div className="w-1/2"><Lottie animationData={error}></Lottie></div>
        </div>
        <Link className="flex justify-center " to={"/"}>
            <button className="text-white font-semibold px-4 py-2 bg-gradient-to-r from-emerald-300 to-emerald-500 transition duration-300 rounded-md text-center">Back To Home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;