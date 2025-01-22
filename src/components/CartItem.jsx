import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { remove } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const removeItem = () => {
    dispatch(remove({ productId: item._id, size: item.size }));
    toast.error("Item removed from Cart");
  };
  const { cart } = useSelector((state) => state);
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/poster/${item._id}`);
  };
  return (
    <div className={`flex cursor-pointer h-[max-content] w-[550px] m-4 p-4 cart-item cart-item ${
        cart.length > 1 ? "border-b-2 border-b-black" : ""}`}>
      <img
        onClick={handleClick}
        src={item.image}
        alt="item img"
        className="w-[40%] mx-1 mr-5 p-2"
      />

      <div className="flex flex-col justify-evenly">
        <h1 className="text-black font-bold text-lg text-left mt-1">
          {item.posterName}
        </h1>
        <p className=" text-black font-semibold text-[16px] text-left">
          {item.size}
        </p>
        <div className="flex justify-between items-center my-2 gap-4">
          <span className="text-black-700 font-semibold">₹{item.price}</span>
          <span className="text-black-700 font-semibold">{`quantity: ${item.quantity}`}</span>
          <div className=" cursor-pointer bg-red-300 p-[0.4rem] rounded-full">
            <RiDeleteBin5Line
              onClick={removeItem}
              className=" text-md text-red-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
