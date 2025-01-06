import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { remove } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";


const CartItem = ({ item }) => {
  console.log("item: ", item);
  const dispatch = useDispatch();
  const removeItem = () => {
    dispatch(remove(item._id));
    // toast.error("Item removed from Cart");
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/poster/${item._id}`);
  };
  return (
    <div className="flex cursor-pointer border-b-black h-[max-content] w-[550px] border-b-2 m-4 p-4 cart-item">
      <img
        onClick={handleClick}
        src={item.image}
        alt="item img"
        className="w-[40%] mx-1 mr-5 p-2"
      />

      <div className="flex flex-col justify-evenly">
        <h1 className="text-gray-700 font-semibold text-lg text-left mt-1">
          {item.posterName}
        </h1>
        <p className=" text-gray-400 font-normal text-[14px] text-left">
          {item.description}{" "}
        </p>
        <div className="flex justify-between items-center my-2 gap-4">
          <span className="text-black-700 font-semibold">${item.price}</span>
          <span className="text-black-700 font-semibold"> {<TiPlus />} {`quantity:  ${item.quantity}`} <TiMinus /></span>
            
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
