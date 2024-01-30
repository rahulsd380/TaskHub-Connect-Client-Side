import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaGooglePlusG,
  } from "react-icons/fa";
  import { BiLogoPlayStore } from "react-icons/bi";
  import { AiFillApple } from "react-icons/ai";
  import { Link } from "react-router-dom";
  
  const Footer = () => {
    return (
      <div className="bg-gray-800 border-t-2">
        <div className="relative z-10">
          <footer className="footer p-10 text-base-content">
            <aside>
              <img
                className="w-20"
                src="https://i.ibb.co/SB6vPxw/logo.png"
                alt=""
              />
              <p className=" font-semibold">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold text-4xl">
                  TaskHub Connect
                </span>
                <br />
                Effortless Tasks, Seamless Success.
              </p>
            </aside>
            <nav className="text-gray-100">
              <header className="footer-title text-gray-100">About</header>
              <a className="link link-hover mb-2">Home</a>
              <a className="link link-hover mb-2">About us</a>
              <a className="link link-hover mb-2">Contact</a>
              <a className="link link-hover mb-2">FAQ</a>
            </nav>
            <nav className="text-gray-100">
              <header className="footer-title">Usefull Links</header>
              <a className="link link-hover mb-2">Blog</a>
              <a className="link link-hover mb-2">About us</a>
              <a className="link link-hover mb-2">Refund policy</a>
              <a className="link link-hover mb-2">Terms & conditions</a>
              <a className="link link-hover">Privacy policy</a>
            </nav>
            <nav className="text-gray-100">
              <header className="footer-title">Legal</header>
              <a className="link link-hover mb-2">Terms of use</a>
              <a className="link link-hover mb-2">Privacy policy</a>
              <a className="link link-hover mb-2">Cookie policy</a>
            </nav>
            <nav className="text-gray-100">
              <header className="footer-title">Newsletter</header>
              <a className="link link-hover">Sign up for our newsletter</a>
              <input
                className=" bg-gray-50 p-2 mb-2 rounded-md w-full text-sm focus:outline-none focus:border-blue-400 transition duration-300 ease-in-out hover:border-blue-600"
                type="text"
                name="password"
                placeholder="Enter your email"
              />
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold p-2 rounded-md text-white w-full mb-3">
                SUBSCRIBE
              </button>
            </nav>
          </footer>
  
          <br />
          <div className="grid grid-cols-1 gap-5 md:gap-0 md:grid-cols-2 border-y border-gray-500 py-5">
            <div className="flex gap-6 justify-center mt-4">
              <p className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent  text-xl font-semibold">
                Follow us :
              </p>
              <button className="w-9 h-9 rounded-full bg-blue-700 text-white flex justify-center items-center transform duration-300 hover:bg-blue-500 ">
                <FaFacebookF></FaFacebookF>
              </button>
              <button className="w-9 h-9 rounded-full bg-blue-500 text-white flex justify-center items-center transform duration-300 hover:bg-blue-700 ">
                <FaTwitter></FaTwitter>
              </button>
              <button className="w-9 h-9 rounded-full bg-blue-800 text-white flex justify-center items-center transform duration-300 hover:bg-blue-600 ">
                <FaLinkedinIn></FaLinkedinIn>
              </button>
              <button className="w-9 h-9 rounded-full bg-red-500 text-white flex justify-center items-center transform duration-300 hover:bg-red-700 ">
                <FaGooglePlusG></FaGooglePlusG>
              </button>
            </div>
  
            <div className="flex justify-center gap-5">
              <Link className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-md flex items-center gap-2 text-white">
                <BiLogoPlayStore className="text-4xl"></BiLogoPlayStore>
                <div>
                  <p className="text-xs">Download It From</p>
                  <h1 className="font-bold text-xs">Play Store</h1>
                </div>
              </Link>
              <Link className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-md flex items-center gap-2 text-white">
                <AiFillApple className="text-4xl"></AiFillApple>
                <div>
                  <p className="text-xs">Download It From</p>
                  <h1 className="font-bold text-xs">App Store</h1>
                </div>
              </Link>
            </div>
          </div>
          <br />
          <p className="text-gray-400 text-sm text-center font-semibold">
            Powered By{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Rahul Sutradhar
            </span>{" "}
            TaskHub Connect © 2024
          </p>
          <br />
          {/* <img src="/src/assets/images/1.png" alt="" /> */}
        </div>
      </div>
    );
  };
  
  export default Footer;
  