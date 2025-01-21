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
      <div className="w-full pl-5 flex justify-between pr-5">
        <div>
          <p>{post.posterName} </p>
          <p>{post.description}</p>
          <RatingStars posterId={post._id} Star_Size={15} />
        </div>
        <p>₹{post.price}</p>
      </div>
    </div>
  );
  
};

export default Product;
