import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-28 pl-10 lg:pl-0  max-w-6xl mx-auto bg-blue-100 dark:bg-gray-600 rounded-tl-xl rounded-br-[200px] rounded-tr-3xl">
        <div
          className="relative"
          data-aos="fade-right"
          data-aos-duration="3000"
        >
          <img
            className="w-full rounded-lg ml-5"
            src="https://i.ibb.co/xMDWR1r/glenn-carstens-peters-RLw-UC03-Gwc-unsplash-1.jpg"
            alt=""
          />
        </div>

        <div className="" data-aos="fade-left" data-aos-duration="3000">
          <h1 className="font-bold text-blue-400 mb-3">About Us</h1>
          <h1 className="font-bold text-gray-500 text-4xl mb-5 max-w-2xl">
          About TaskHub Connect: Your Gateway to Productivity!
          </h1>
          <p className="mb-4 w-3/4">
          Discover TaskHub Connect, where efficiency meets innovation. Empower your productivity journey with our intuitive task management platform, designed to streamline workflows and foster collaboration for ultimate success in every endeavor.
          </p>

          <p className="mb-6 w-3/4">
          Discover TaskHub Connect, where efficiency meets innovation. Empower your productivity journey with our intuitive task management platform.
          </p>
          <Link
            to={""}
            className="w-32 flex items-center justify-center rounded-md focus:outline-none h-12 px-5 text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold  transition duration-300"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
