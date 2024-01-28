import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import finding from "../../../public/finding.json"
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    console.log(location);


    if(loading){
        return <div className="flex justify-center"> <div className="w-48"><Lottie animationData={finding}></Lottie></div> </div>
    }
    if(user?.email){
        return children
    }
    return (
        <Navigate state={location.pathname} to={'/login'}>
            
        </Navigate>
    );
};

export default PrivateRoute;