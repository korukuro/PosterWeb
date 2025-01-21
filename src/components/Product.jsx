import { add, remove } from "../slices/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RatingStars from "../components/common/RatingStars";

const Product = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };

  const removeItem = () => {
    dispatch(remove(post._id));
    toast.error("Item removed from Cart");
  };

  const handlePosterDetails = () => {
    navigate(`/poster/${post._id}`);
  };

  const isInCart = cart.some((item) => item._id === post._id);

  return (
    <div className="w-[20rem] flex flex-col justify-center px-2">
      <div className="relative h-96 flex justify-center items-center">
        <img
          onClick={handlePosterDetails}
          src={post.image}
          alt="poster-image"
          className="object-contain w-full h-full"
        />
      </div>
      <div className="w-full pl-5 flex justify-between pr-5">
        <div>
          <p>{post.posterName}</p>
          <p>{post.description}</p>
          <RatingStars posterId={post._id} Star_Size={15} />
        </div>
        <div className="w-full">
          <div className="pl-2 pr-2">
            <div className="flex justify-between pl-3 pr-2">
              <p>{post.posterName}</p>
              <span>₹{post.price}</span>
            </div>
            <div className="pl-3">
              <p className="text-sm">{post.description}</p>
              <RatingStars Star_Size={15} />
            </div>
            <div className="flex justify-between mt-4">
              {isInCart ? (
                <button
                  onClick={removeItem}
                  className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                >
                  Remove Item
                </button>
              ) : (
                <button
                  onClick={addToCart}
                  className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;