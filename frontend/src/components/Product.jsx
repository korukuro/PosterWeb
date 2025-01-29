import React from "react";
import { useNavigate } from "react-router-dom";
import RatingStars from "../components/common/RatingStars";
import { AdaptiveImageDivForHome } from "./core/Home/AdaptiveImageDivForHome";

const Product = ({ post }) => {
  const navigate = useNavigate();

  const handlePosterDetails = () => {
    navigate(`/poster/${post._id}`);
  };

  return (
    <div className="w-[16rem] sm:w-[16rem] md:w-[18rem] lg:w-[20rem] flex flex-col justify-center px-2 lg:hover:scale-105 transition-all duration-300">
      <div className="flex-col justify-center items-center" onClick={handlePosterDetails}>
        <AdaptiveImageDivForHome images={post?.image}/>
      <div className="w-full flex-col items-center pr-5 pl-6 lg:mt-6">
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
    </div>
  );
};

export default Product;
