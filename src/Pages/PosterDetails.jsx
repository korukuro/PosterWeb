import React from "react";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";

const PosterDetails = () => {
  return (
    <div className="border-2 border-black h-[42.38rem] flex overflow-hidden">
      <div className="w-[45%] border-blue-800 border-2 flex justify-center items-center">
        <div className="border-2 border-yellow-700 h-[35rem] w-[28rem] text-center">
          hi
        </div>
      </div>
      <div className="flex flex-col w-[55%] gap-5 p-16">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">Name Of The Poster</h1>
          <div className="w-10 text-2xl">*****</div>
        </div>
        <span>Price:</span>
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

          <button className="w-28 h-14 bg-black text-white rounded-full font-semibold text-[12px] p-1 px-3 uppercase">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosterDetails;
