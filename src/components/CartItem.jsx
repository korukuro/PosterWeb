import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { remove } from "../slices/cartSlice";

const CartItem = ({item}) => {

  const dispatch = useDispatch();
  const removeItem = ()=>{
    dispatch(remove(item.id));
    toast.error("Item removed from Cart");
  }
  return (
    <div className="flex border-b-black h-[max-content] w-[550px] border-b-2 m-4 p-4 cart-item">
      
        <img src={item.image} alt="item img" className="w-[40%] mx-1 mr-5 p-2" />
      

      <div className="flex flex-col justify-evenly">
        <h1 className="text-gray-700 font-semibold text-lg text-left mt-1">{item.title}</h1>
        <p className=" text-gray-400 font-normal text-[14px] text-left">{item.description.split(" ").slice(0,15).join(" ")+"..."} </p>
        <div className="flex justify-between items-center my-2 ">
          <span className="text-black-700 font-semibold">${item.price}</span>
          <div className=" cursor-pointer bg-red-300 p-[0.4rem] rounded-full">
            <RiDeleteBin5Line onClick={removeItem} className=" text-md text-red-800" />
          </div>

        </div>
      </div>

    </div>
  );
};

export default CartItem;
