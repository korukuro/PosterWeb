import { add, remove } from "../slices/cartSlice";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Product = ({ post }) => {
  const navigate = useNavigate();
  console.log("post: ", post);
  const { cart } = useSelector((state) => state)
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart")
  }
  const removeItem = () => {
    dispatch(remove(post._id));
    toast.error("Item removed from Cart");
  }

  const handlePosterDetails = () => {
    navigate(`/poster/${post._id}`);
  }
  return (
    <div className="">
      <CardContainer
        className="w-[20rem] h-96 flex-shrink-0 flex justify-center px-2"
      >
        <CardBody className="relative group/card h-full flex justify-center items-center border-2 border-black bg-[#00000031] rounded-lg">
          <CardItem
            as="p"
            translateZ="100"
            className="absolute text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 break-words"
          >
            {post.posterName}
          </CardItem>
          {/* { */}
            {/* cart.some((p) => p.id === post.id) ? */}

              {/* <CardItem translateZ="100" className="absolute top-[23rem] left-[20rem]">
                <button
                  onClick={removeItem}
                  className="absolute w-28 h-14 bottom-4 right-4 text-black border-2 border-black rounded-full font-semibold text-[12px] p-1 px-3 uppercase 
                          opacity-0 group-hover/card:opacity-100 hover:bg-black hover:text-white transition duration-300 ease-in"
                >
                  Remove from cart
                </button>
              </CardItem> */}
              {/* : */}
              <CardItem translateZ="100" className="absolute top-[23rem] left-[20rem]">
                <button
                  onClick={addToCart}
                  className="absolute w-28 h-14 bottom-4 right-4 text-black border-2 border-black rounded-full font-semibold text-[12px] p-1 px-3 uppercase 
                        opacity-0 group-hover/card:opacity-100 hover:bg-black hover:text-white transition duration-300 ease-in"
                >
                  Add to Cart
                </button>
              </CardItem>
          {/* } */}

          <CardItem
            translateZ="60"
            className="w-full h-full flex justify-center items-center"
          >
            <img
              onClick={handlePosterDetails}
              src={post.image}
              alt="poster-image"
              className="object-contain w-full h-full p-2"
            />
          </CardItem>
        </CardBody>
      </CardContainer>


    </div>
  )
};

export default Product;
