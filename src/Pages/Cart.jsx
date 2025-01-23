import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";
import emptyBox from "../additionalFile/empty-box.png";
import spider from "../additionalFile/spider.png";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cart]);

  return (
    <div className=" w-10/12 mx-auto">
      {cart.length > 0 ? (
        <div className="grid grid-cols-3 m-3 border-2 border-red-600 mt-24">
          <div className="col-span-2">
            {cart.map((item, index) => {
              return <CartItem key={item.id} item={item} itemIndex={index} />;
            })}
            
          </div>
          <div className="flex flex-col justify-around m-3 my-20 ml-10 p-4 w-[30%] summary-box ">
            <div>
              <div className="text-black-700 mb-2">
                <p className="font-semibold">Your Cart</p>
                <h1 className="text-3xl font-bold">SUMMARY</h1>
              </div>
              <p className="text-gray-700 font-semibold">
                Total items:{" "}
                <span className="font-bold text-black">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </p>
              </div>
                
            <div>
              <p className="text-gray-700 font-semibold mb-3">
                Total Amount:{" "}
                <span className="font-bold text-black">
                ₹{totalAmount.toFixed(2)}
                </span>
              </p>
              <Link to="/checkout">
                <button className="bg-[#000000] text-white px-7 py-2 rounded-lg text-md font-bold w-full hover:scale-110 active:scale-90 transition-transform duration-300 transform">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-[85vh] items-center transition-all duration-300 ">
          <img
            src={emptyBox}
            alt="empty-box"
            className="w-50 mix-blend-darken"
          />
          <img
            src={spider}
            alt="empty-box"
            className="w-[150px] top-12 right-5 absolute opacity-40 "
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
