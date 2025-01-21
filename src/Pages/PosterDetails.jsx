import React, { useEffect, useState } from "react";
import { TiPlus, TiMinus } from "react-icons/ti";
import { getPosterDetails } from "../services/operations/posterDetailsAPI";
import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { addWithQuantity } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import RatingStars from "../components/common/RatingStars";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";



const PosterDetails = () => {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const posterId = useLocation().pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImage, setCurrentImage] = useState(""); // State for current image

  const dispatch = useDispatch();

  async function fetchProductData(posterId) {
    setLoading(true);
    try {
      const data = await getPosterDetails(posterId);
      setPosts(data.posterDetails || {});
      setCurrentImage(data.posterDetails?.image); // Set the initial image
    } catch (error) {
      console.error("Failed to fetch poster data:", error);
      setPosts({});
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData(posterId);
  }, [posterId]);

  const addToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to the cart.");
      return;
    }
    dispatch(addWithQuantity({ poster: posts, quantity, size: selectedSize }));
    toast.success(`${quantity} item(s) of size ${selectedSize} added to Cart`);
  };

  const sizes = ["A4", "A3", "12x18", "13x19"];

  // Function to change the image (can be expanded to change based on different images)
  const changeImage = (newImage) => {
    setCurrentImage(newImage);
  };
  const prevImage = (prevImage) => {
    setCurrentImage(prevImage);
  };

  return (
    <div className="flex justify-evenly w-full mx-auto overflow-x-hidden mt-16 overflow-y-hidden ">
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <Spinner />
        </div>
      ) : (
        <div className="flex gap-10 w-full pt-6 pb-9">
          <div className="w-[45%] h-full m-7 flex justify-end">
            <div className="w-[24rem] h-[35.1rem] border-2 flex items-center relative">
              <img
                src={currentImage || posts?.image} // Display the current image
                alt="poster-image"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => changeImage("new-image-url.jpg")} // Change the image URL here
                className="mt-4 px-4 py-2 rounded-full h-7 absolute right-0 text-white bg-black"
              >
                <SlArrowRight />

              </button>
              <button
                onClick={() => changeImage(currentImage || posts?.image)} // Change the image URL here
                className=" px-4 py-2 rounded-full h-7 absolute text-white bg-black"
              >
                <SlArrowLeft />

              </button>
            </div>
          </div>

          <div className="flex flex-col w-[55%] gap-5 p-16">
            <div className="flex items-center justify-between w-[40rem]">
              <h1 className="font-bold text-2xl">{posts?.posterName}</h1>
              {console.log("Posts", posts)}
              <RatingStars posterId={posts._id} Star_Size={30} />
            </div>
            <span>{`Price: ₹${posts?.price}`}</span>
            <div className="space-x-4">
              <span>Size:</span>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`w-20 h-12 text-base rounded-full font-semibold text-[12px] p-1 px-3 uppercase ${
                    selectedSize === size
                      ? "bg-blue-500 text-white"
                      : "bg-black text-white"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
                
              ))}

            </div>
            <div className="w-full flex flex-col justify-center space-y-4 ml-20 translate-x-[6rem]">
              <div className="border border-black w-28 h-14 rounded-full flex justify-evenly items-center">
                <TiMinus
                  onClick={() => {
                    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity);
                  }}
                  className="cursor-pointer"
                />
                <div>{quantity}</div>
                <TiPlus onClick={() => setQuantity(quantity + 1)} className="cursor-pointer" />
              </div>

              <button
                onClick={addToCart}
                className="w-28 h-14 bg-black text-white rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PosterDetails;
