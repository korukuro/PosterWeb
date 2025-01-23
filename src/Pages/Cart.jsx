import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";
import emptyBox from "../additionalFile/empty-box.png";
import spider from "../additionalFile/spider.png";
import Product from "../components/Product";
import { getAllPoster } from "../services/operations/posterDetailsAPI";
import HomeSkeleton from "../components/common/skeleton/HomeSkeleton";

const Cart = () => {
  const cart = useSelector((state) => state.cart); // Access cart state directly
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData() {
    setLoading(true);
    try {
      const data = await getAllPoster();
      const shuffledData = data.sort(() => Math.random() - 0.5);
      setPosts(shuffledData);
    } catch (error) {
      console.log("Data not found");
      setPosts([]);
    }
    setLoading(false);
  }

  const filteredPosts = posts.filter(
    (post) => !cart.some((item) => item._id === post._id)
  );

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cart]);

  return (
    <div className="w-10/12 mx-auto pt-24">
      {cart.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.map((item, index) => (
              <CartItem key={item._id} item={item} itemIndex={index} />
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white shadow-md p-6 rounded-lg border">
            <h1 className="text-3xl font-bold mb-4">Summary</h1>
            <p className="text-gray-700 font-medium">
              Items:{" "}
              <span className="font-bold text-black">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </p>
            <p className="text-gray-700 font-medium mt-2">
              Total:{" "}
              <span className="font-bold text-black">
                ₹{totalAmount.toFixed(2)}
              </span>
            </p>
            <Link to="/checkout">
              <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold w-full mt-4 hover:scale-105 transition-transform duration-300">
                Check Out
              </button>
            </Link>
          </div>

          {/* Recommendations */}
          <div className="lg:col-span-3 mt-10">
            <h2 className="text-xl font-semibold mb-4">You may also like</h2>

            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="flex gap-6 mb-8">
                {loading ? (
                  <div className="flex">
                    <HomeSkeleton skeletonCount={3} />
                  </div>
                ) : filteredPosts.length > 0 ? (
                  filteredPosts.slice(0, 3).map((post) => (
                    <div className="min-w-[15rem] flex" key={post._id}>
                      <Product post={post} />
                    </div>
                  ))
                ) : (
                  <div>No recommendations found</div>
                )}
              </div>
              <Link to="/categories" className="relative group text-black mb-4">
                View More
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center pb-60 pt-36 items-center transition-all duration-300">
          <img
            src={emptyBox}
            alt="empty-box"
            className="w-50 mix-blend-darken"
          />
          <img
            src={spider}
            alt="empty-box"
            className="w-[150px] right-5 absolute opacity-40 transition-all duration-500 ease-in-out"
            style={{ top: "0" }}
            onLoad={(e) => {
              e.target.style.top = "3.5rem";
            }}
          />

          <h1 className="font-semibold text-gray-700 m-4">
            NO ITEM IN THE BAG
          </h1>
        </div>
      )}
    </div>
  );
};

export default Cart;
