import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

import brickWall from "../additionalFile/background.png";

import {BackgroundBeams} from "../components/ui/background-beam";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData() {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);

      setPosts(data);
    } catch (error) {
      console.log("Data nhi aaya");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
      <>
        <BackgroundBeams />
    <div className="relative overflow-hidden h-screen">
      {/* Background Image */}
      <img src={brickWall} alt="" className="absolute top-0 left-0 w-full object-contain -z-10" />

      {/* Main Content */}
      <div>
        <div className="pt-16 z-10 relative"> {/* Add padding to offset the Navbar */}
          {loading ? (
            <div className="flex justify-center items-center min-h-screen"> {/* Center Spinner */}
              <Spinner />
            </div>
          ) : posts.length > 0 ? (
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
              {posts.map((post) => (
                <Product key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-screen">
              <p>No data found</p>
            </div>
          )}
        </div>
      </div>
    </div> 
    </>
  );

};

export default Home;
