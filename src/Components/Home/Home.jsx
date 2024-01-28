import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";



const Home = () => {
    return (
        <div>
            <Helmet>
              <title>TaskHub Connect | Home</title>
          </Helmet>
          <Navbar></Navbar>
          <Hero></Hero>


        </div>
    );
};

export default Home;