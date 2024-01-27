import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import useAxiosClient from "../../hooks/useAxiosClient";

const Signup = () => {
  const axiosUser = useAxiosClient();
  const {updateProfileInfo, signUp, googleSignUp} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignUp = e => {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      console.log( email, name, password);

      const toastId = toast.loading("Signing up...")

      signUp(email, password)
    .then((result) => {
      console.log(result.user);
      updateProfileInfo(name)
      .then(() => {
        const userInfo = { name, email };
        axiosUser.post("/users", userInfo)
        .then((res) => {
          console.log(res.data);

          if (res.data.insertedId) {
            toast.success("Signed up successfully.", { id: toastId });
            navigate(location?.state ? location.state : "/");
          }
        });
      });
    })
    .catch((error) => console.log(error))

    .catch((error) => {
      console.log(error);
    });
  }


  // google signup
  const googleSignIn = () => {
      googleSignUp()
      .then(result => {
          console.log(result.user);
          navigate(location ?.state ? location.state : '/');
      })
      .catch(error => {
          console.error(error);
      })
  }

    return (
      <div>
      <Helmet>
             <title>Rent Nest | Sign Up</title>
         </Helmet>
         <Navbar></Navbar>
       <div className="max-w-6xl mx-auto py-10">
     <div className="grid grid-cols-2 gap-10 items-center bg-white rounded-md shadow-md border border-gray-300">

       {/* Left side form */}
       <form className="p-14" onSubmit={handleSignUp}>
       <div>
       <div className="flex items-center mb-2">
        <img
          className="w-10"
          src="https://i.ibb.co/FBLHBHw/logo.png"
          alt=""
        />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
          TaskWave
        </h1>
      </div>
         <h1 className="text-xl font-bold text-gray-600 mb-2">
           Welcome to <span className="text-teal-500">Task Wave.</span> Manage your task to be successfull!
         </h1>
         

         <div>
           
           

           <div className="mb-2">
             <p className="mb-1 font-semibold text-gray-600">Your Name</p>
             <input
             name="name"
               className="bg-white border border-gray-400 outline-none px-2 py-1 rounded w-full"
               type="text"
               placeholder="Rahul Sutradhar"
             />
           </div>

           <div className="mb-2">
             <p className="mb-1 font-semibold text-gray-600">Your Email</p>
             <input
             name="email"
               className="bg-white border border-gray-400 outline-none px-2 py-1 rounded w-full"
               type="email"
               placeholder="rahul@gmail.com"
             />
           </div>

           <div className="mb-3">
             <p className="mb-1 font-semibold text-gray-600">Password</p>
             <input
             name="password"
               className="bg-white border border-gray-400 outline-none px-2 py-1 rounded w-full"
               type="password"
               placeholder="*********"
             />
           </div>


           <div className="mb-3 flex justify-between items-center">
              <p className="textgray-600 font-semibold flex items-center gap-2"><input type="checkbox"  className="checkbox text-blue-600" /> Remember me</p>


              <p className="textgray-600 font-semibold text-teal-500">Forgot Password?</p>
           </div>

           <button className="w-full font-semibold transition duration-300 bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded text-white mb-3">
             Sign Up
           </button>

           <p className="mb-3 text-center text-gray-600 font-semibold">Or,</p>


           <button onClick={googleSignIn} className="w-full font-semibold transition duration-300 border border-gray-300 hover:shadow-md px-4 py-2 rounded text-gray-600 mb-3 flex items-center gap-2 justify-center">
           <FcGoogle></FcGoogle> Coninue with Google
           </button>

           <p className="mb-4 text-center">
           Already Have An Account?{" "}
           <Link to={"/login"} className="text-blue-500 font-semibold underline">Sign in</Link>
         </p>
         </div>
       </div>
       
       </form>

      {/* Right side banner */}
       <div className="h-full">
         <div
           className="hero h-full"
           style={{
             backgroundImage:
               "url(https://i.ibb.co/wB56L75/eden-constantino-i-Jg1-Yzs-Efqo-unsplash.jpg)",
           }}
         >
           <div className="hero-overlay bg-opacity-60"></div>
           <div className="hero-content text-center text-neutral-content">
             <div className="max-w-md">
               <h1 className="mb-5 text-4xl font-bold">
               Manage your task to be successfull! Join Us Today!
               </h1>
               <p className="mb-5">
               Empower your journey to success by efficiently managing your tasks! Join us today to streamline your workflow, stay organized, and achieve your goals with ease.
               </p>
               <button className="p-2 bg-teal-600 rounded-md">Get Started</button>
             </div>
           </div>
         </div>
       </div>



     </div>
   </div>
   <Toaster
 position="bottom-center"
 reverseOrder={false}
/>
   </div>
    );
};

export default Signup;