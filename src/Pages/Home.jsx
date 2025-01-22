import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { getAllPoster } from "../services/operations/posterDetailsAPI";
import { IoIosArrowDropdown } from "react-icons/io";
import Section_1 from "../components/core/Home/Section_1";
import InfiniteLoop from "../components/core/Home/InfiniteLoop";
import HomePoster from "../components/common/skeleton/HomePoster";

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const texts = ["Hello", "World", "How", "Are", "You", "Doing", "Today", "?", "money", "money", "$", "Hello", "World", "How", "Are", "You", "Doing", "Today", "?", "money", "money", "$"];

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
  //  console.log("posts", posts);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Show 6 more posts
  };
  return (
    <>
      <div className="relative overflow-hidden">

        <div className="mt-20"><Section_1 /></div>
        <div className="z-10 relative w-full h-full flex justify-center items-center">
          {loading ? (
            // <div className="flex justify-center items-center min-h-screen">
            //   <Spinner />
            // </div>

            <HomePoster />

          ) : posts.length > 0 ? (
            <div className="flex flex-col justify-center items-center mt-12">
              <div className="grid grid-cols-3 auto-rows-custom w-11/12 pt-10 pb-24 gap-y-28 gap-x-14 h-auto">
                {posts.slice(0, visibleCount).map((post) => (
                  <div key={post.id} className=" flex justify-center items-center hover:scale-110 transition-all duration-300">
                    <Product post={post} />
                  </div>
                ))}
              </div>
              {visibleCount < posts.length && ( // Show "View More" button only if there are more posts to show
                <div className="flex justify-center">
                  <button
                    onClick={handleViewMore}
                    className="relative px-6 py-3 rounded-lg group overflow-hidden m-2"
                  >

                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>

                    <span className="z-10 flex justify-center items-center gap-2">View More <span className=" opacity-0 group-hover:opacity-100 transition-all duration-300 "><IoIosArrowDropdown /></span> </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-screen">
              <p>No data found</p>
            </div>
          )}
        </div>
        <div className="mt-2"><InfiniteLoop /></div>
      </div>
    </>
  );
};

export default Home;
