import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

import brickWall from "../additionalFile/background.png";
import Carousel from "../components/common/Carousel";


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
    <div className="relative overflow-hidden h-screen">
      {/* Background Image */}
      <img src={brickWall} alt="" className="absolute top-0 left-0 w-full object-contain -z-10" />

      {/* Main Content */}
      <div className="h-full flex justify-center items-center">
        <div className="pt-16 z-10 relative  w-full h-full"> {/* Add padding to offset the Navbar */}
          {loading ? (
            <div className="flex justify-center items-center min-h-screen"> {/* Center Spinner */}
              <Spinner />
            </div>
          ) : posts.length > 0 ? (
            <div className="flex p-2 w-full h-full ">
              <Carousel images={posts.map((post) => post.image)} />
              {/* // {posts.map((post) => (
              //   <Product key={post.id} post={post} />
              // ))} */}
              
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
