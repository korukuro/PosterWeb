import { add, remove } from "../slices/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RatingStars from "../components/common/RatingStars";
import { AdaptiveImageDivForHome } from "./core/Home/AdaptiveImageDivForHome";

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
    <div className="w-[16rem] sm:w-[16rem] md:w-[18rem] lg:w-[20rem] flex flex-col justify-center px-2 lg:hover:scale-105 transition-all duration-300">
      <div className="flex justify-center items-center" onClick={handlePosterDetails}>
        <AdaptiveImageDivForHome images={post?.image}/>
      </div>
      <div className="w-full flex-col justify-between items-center pr-5 pl-6 mt-6">
        <div className="flex justify-between w-full">
          <p className="text-sm sm:text-base">{post.posterName.slice(0,15)}...</p>
          <span className="text-sm sm:text-base">₹{post.price}</span>
        </div>

          <p className="text-[0.8rem] sm:text-sm text-gray-500 mt-1">{post.description.length > 30
            ? `${post.description.slice(0, 30)}...`
            : post.description}</p>
          <p className="mt-2">
            <RatingStars posterId={post._id} Star_Size={15} />
          </p>
      </div>
    </div>
  );
};

export default Product;
