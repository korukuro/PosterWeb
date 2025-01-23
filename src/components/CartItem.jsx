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
    <div className="grid grid-cols-3 border-2 border-black h-[13rem] w-full">
      <div className="h-full w-full border-2 border-black relative">
        <img
          onClick={handleClick}
          src={item.image}
          alt="item img"
          className="h-full object-cover"
        />
        <span className="absolute top-0 z-10 bg-black text-white rounded-full w-6 flex justify-center items-center animate-bounce">{`${item.quantity}`}</span>
      </div>

      <div className=" col-span-2 flex justify-between w-full">
        <div>
          <h1 className="font-bold">
            {item.posterName}
          </h1>
          <h3 className="text-sm text-gray-500">{item.description}</h3>
          <p className="text-sm text-gray-500">
          Size : {item.size}
        </p>
        </div>
        
        <div className="">
          <span className="">MRP : ₹ {item.price}</span>

          <div className="">
            <RiDeleteBin5Line
              onClick={removeItem}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
