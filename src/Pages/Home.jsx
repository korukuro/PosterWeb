import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
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
      <div className="relative h-screen">
        {/* Background Image */}
        <img
          src={brickWall}
          alt=""
          className="absolute top-0 left-0 w-full object-contain -z-10"
        />

        {/* Main Content */}
        <div className="h-full flex justify-center items-center mx-3">
          <div className="pt-2 z-10 relative w-full h-full">
            {loading ? (
              <div className="flex justify-center items-center min-h-screen">
                <Spinner />
              </div>
            ) : posts.length > 0 ? (
              <div className="flex p-2 gap-x-20 h-full overflow-x-auto space-x-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex-shrink-0 w-[250px] mx-5"
                  >
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
      </div>
    </>
  );
};

export default Home;
