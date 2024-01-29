import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";



const Home = () => {
    return (
        <div>
            <Helmet>
              <title>TaskHub Connect | Home</title>
          </Helmet>
          <Navbar></Navbar>
          <Hero></Hero>
          <Footer></Footer>


        </div>
    );
};

export default Home;