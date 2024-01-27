import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";



const Home = () => {
    return (
        <div>
            <Helmet>
              <title>TaskHub Connect | Home</title>
          </Helmet>
          <Navbar></Navbar>


        </div>
    );
};

export default Home;