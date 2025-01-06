import React, { useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import { useState } from "react";
import { getPosterDetails } from "../services/operations/posterDetailsAPI";
import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { add } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const PosterDetails = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const posterId = useLocation().pathname.split("/")[2];

  const dispatch = useDispatch();

  async function fetchProductData(posterId) {
    setLoading(true);
    try {
      const data = await getPosterDetails(posterId);
      // console.log("data: ", data.posterDetails);
      setPosts(data.posterDetails || {});
    } catch (error) {
      console.error("Failed to fetch poster data:", error);
      setPosts({});
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchProductData(posterId);
  }, []);

  const addToCart = () => {
    dispatch(add(posts));
    console.log("posts: ", posts);
    toast.success("Item added to Cart")
  }


  return (
    <div className="flex justify-evenly w-[100%] h-[91.2vh] mx-auto overflow-x-hidden">
      {
        loading ? 
        <div className="flex justify-center items-center h-full w-full">
                <Spinner />
         </div>
          :
          <div className="flex gap-10 w-full">
            <div className="w-[45%] h-[100%] flex justify-end">
              <div className="w-[24rem] h-[40.1rem] mt-7">
                <img src={posts?.image} alt="poster-image" />
              </div>
            </div>
            
            <div className="flex flex-col w-[55%] gap-5 p-16">
              <div className="flex items-center justify-between w-[30rem]">
                <h1 className="font-bold text-2xl">{posts?.posterName}</h1>
                <div className="w-10 text-2xl">*****</div>
              </div>
              <span>{`Price: ₹${posts?.price}`}</span>
              <div className="space-x-4">
                <span>Size:</span>
                <button className="w-20 h-12 text-base bg-black text-white rounded-full font-semibold text-[12px] p-1 px-3 uppercase">
                  A4
                </button>
                <button className="w-20 h-12 text-base bg-black text-white rounded-full font-semibold text-[12px] p-1 px-3 uppercase">
                  A3
                </button>
                <button className="w-20 h-12 text-base bg-black text-white rounded-full font-semibold text-[12px] p-1 px-3 uppercase">
                  12x18
                </button>
                <button className="w-20 h-12 text-base bg-black text-white rounded-full font-semibold text-[12px] p-1 px-3 uppercase">
                  13x19
                </button>
              </div>
              <div className="w-[100%] flex flex-col justify-center space-y-4 ml-20 translate-x-[6rem]">
                <div className="border-2 border-black w-28 h-14 rounded-l-full rounded-r-full flex justify-evenly items-center">
                  <TiMinus />
                  <div>1</div>
                  <TiPlus />
                </div>

                <button onClick={addToCart} className="w-28 h-14 bg-black text-white rounded-full font-semibold text-[12px] p-1 px-3 uppercase">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
      }

    </div>
  );
};

export default PosterDetails;
