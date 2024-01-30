import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import AboutUs from "../AboutUs/AboutUs";
import AppDownloadBanner from "../../Banner/AppDownloadBanner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TaskHub Connect | Home</title>
      </Helmet>
      <Navbar></Navbar>
      <Hero></Hero>
      <AboutUs></AboutUs>
      <AppDownloadBanner></AppDownloadBanner>
      <Footer></Footer>
    </div>
  );
};

export default Home;
