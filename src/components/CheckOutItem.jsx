import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { remove } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";

const CheckOutItem = ({ item }) => {
    console.log("item: ", item);
    const dispatch = useDispatch();
    const removeItem = () => {
        dispatch(remove(item._id));
        // toast.error("Item removed from Cart");
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/poster/${item._id}`);
    }
    return (
        <div className="grid grid-cols-3 cursor-pointer h-[max-content] w-full border-b-2 border-black/10  m-2 p-2 cart-item">

            <img onClick={handleClick} src={item.image} alt="item img" className="w-[40%] mx-1 mr-5 p-2" />


            <div className="flex flex-col col-span-2 gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-gray-700 font-semibold text-lg text-left mt-1">{item.posterName}</h1>
                    <h3 className="text-gray-700 font-semibold text-lg text-left mt-1">{item.size}</h3>

                </div>
                <div className="flex justify-between items-center my-2 gap-4">
                    <span className="text-black-700 font-semibold">${item.price}</span>
                    <span className="text-gray-700 font-semibold">{`quantity: ${item.quantity}`}</span>


                </div>
            </div>

        </div>
    );
};

export default CheckOutItem;
