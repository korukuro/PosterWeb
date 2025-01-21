import { add } from "../slices/cartSlice";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Product = ({ post }) => {
  const navigate = useNavigate();
  // const { cart } = useSelector((state) => state)
  const dispatch = useDispatch();

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
  return (
    <div>
      <div className="w-[20rem] h-96 flex-shrink-0 flex justify-center px-2">
        <div className="relative group/card h-full flex justify-center items-center rounded-lg">
          <div
            translateZ="60"
            className="relative h-full flex justify-center items-center"
          >
            <img
              onClick={handlePosterDetails}
              src={post.image}
              alt="poster-image"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
