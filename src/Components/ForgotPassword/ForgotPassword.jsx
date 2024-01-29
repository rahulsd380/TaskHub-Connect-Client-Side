import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import { PiSmileySadLight } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";


const ForgotPassword = () => {
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState("");
  
    const handleResetPassword = (e) => {
        e.preventDefault();
        const toastId = toast.loading("Sending reset link")
        authContext.resetPassword(email)
          .then(() => {
            toast.success("Please check your email and click on the link to rest your password.", { id: toastId, duration: 7000 });
          })
          .catch((error) => {
            console.log(error.message);
          });
      };


    return (
        <div>
        <Helmet>
               <title>TaskHub Connect | Log in</title>
           </Helmet>
           <Navbar></Navbar>
         <div className="max-w-6xl mx-auto py-10 px-44">
       <div className="bg-white rounded-md shadow-md">

         <form className="p-14">
         <div>
        
        {/* Logo */}
       <div className="flex items-center justify-center gap-3 mb-5">
          <img
            className="w-10"
            src="https://i.ibb.co/McS33RY/logo.png"
            alt=""
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            TaskHub Connect
          </h1>
        </div>
           <h1 className="text-xl font-bold text-gray-600 mb-1 flex items-center gap-2">
           <PiSmileySadLight></PiSmileySadLight> Forgot your<span className="text-blue-500"> Password?</span> 
           </h1>
           <p className="text-gray-600 mb-4">Enter your email by which you signed up. Then click on the Reset button and then check your email. Click on the reset link and put your new password.</p>
           
 
           <div>
             
 
             <div className="mb-4">
               <p className="mb-1 font-semibold text-gray-600">Your Email</p>
               <input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               name="email"
                 className="bg-white border border-gray-400 outline-none px-2 py-1 rounded w-full"
                 type="email"
                 placeholder="rahul@gmail.com"
               />
             </div>
 
             <button onClick={handleResetPassword} className="w-full font-semibold transition duration-300 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white mb-3">
               Reset
             </button>

             <div className="flex justify-center">
             <Link to={"/login"} className="text-blue-500 font-semibold underline flex items-center gap-2"><IoReturnUpBackOutline></IoReturnUpBackOutline> Back to login page</Link>
             </div>
           </div>
         </div>
         
         </form>



       </div>
     </div>
     <Toaster
   position="bottom-center"
   reverseOrder={false}
 />

<Toaster
   position="bottom-center"
   reverseOrder={false}
 />
     </div>
    );
};

export default ForgotPassword;
import { IoReturnUpBackOutline } from "react-icons/io5";