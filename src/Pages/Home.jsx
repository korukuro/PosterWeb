import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import Footer from "../components/common/Footer";
import brickWall from "../additionalFile/background.png";
import { getAllPoster } from "../services/operations/posterDetailsAPI";

const Home = () => {
  // const API_URL = "https://fakestoreapi.com/products";

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData() {
    setLoading(true);
    try {
      const data = await getAllPoster();

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
   console.log("posts", posts);
  return (
    <>
      <div className="relative overflow-hidden pt-32">  
        {/* Main Content */}

        <div className="z-10 relative w-full h-full flex justify-center items-center">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <Spinner />
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-4 auto-rows-custom w-11/12 place-items-center gap-y-60">
              {posts.map((post) => (
                <div key={post.id} className="w-[250px] m-0">
                  <Product post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-screen">
              <p>No data found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
