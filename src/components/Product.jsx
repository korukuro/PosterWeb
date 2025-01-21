import { add } from "../slices/cartSlice";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RatingStars from "../components/common/RatingStars";

const Product = ({ post }) => {
  const navigate = useNavigate();
  // const { cart } = useSelector((state) => state)
  const dispatch = useDispatch();
  console.log(post);
  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };
  // const removeItem = () => {
  //   dispatch(remove(post._id));
  //   toast.error("Item removed from Cart");
  // }

  const handlePosterDetails = () => {
    navigate(`/poster/${post._id}`);
  };
  console.log("Post Data:", post);
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
      <div className="w-full">
        <div className="pl-2 pr-2">
          <div className="flex justify-between pl-3 pr-2">
            <p>{post.posterName} </p>
            <span>₹{post.price}</span>
          </div>
          <div className="pl-3">
          <p className="text-sm">{post.description}</p>
          <RatingStars Star_Size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
