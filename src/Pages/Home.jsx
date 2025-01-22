import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { getAllPoster } from "../services/operations/posterDetailsAPI";

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData() {
    setLoading(true);
    try {
      const data = await getAllPoster();
      const shuffledData = data.sort(() => Math.random() - 0.5);
      setPosts(shuffledData);
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
      <div className="relative overflow-hidden pt-28 pb-40">

        <div className="z-10 relative w-full h-full flex justify-center items-center">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <Spinner />
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-3 auto-rows-custom w-11/12 pt-10 pb-24 gap-y-40 gap-x-14 h-auto ">
              {posts.map((post) => (
                <div key={post.id} className=" flex justify-center items-center">
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
