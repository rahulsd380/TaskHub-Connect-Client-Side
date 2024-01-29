import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import AllUser from "../Dashboard/AdminDashboard/Pages/AllUsers/AllUsers";



const Home = () => {
    return (
        <div>
            <Helmet>
              <title>TaskHub Connect | Home</title>
          </Helmet>
          <Navbar></Navbar>
          <Hero></Hero>
          <AllUser></AllUser>
          <Footer></Footer>


        </div>
    );
};

export default Home;