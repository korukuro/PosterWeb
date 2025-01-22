"use client";

import React, { useEffect, useState, useRef } from "react";
import sizeImage from "../../additionalFile/sizeImage.png"

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Navigation, Pagination } from "swiper/modules";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/pagination";
export function AdaptiveImageDiv({ images }) {
  const [backgroundColor, setBackgroundColor] = useState("rgb(255, 255, 255)");
  const canvasRef = useRef(null);
  const imageArr = [images, sizeImage];

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = images;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx && canvas) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const dominantColor = getDominantColor(imageData.data);
        setBackgroundColor(`rgb(${dominantColor.join(",")})`);
      }
    };
  }, [images]);

  const getDominantColor = (imageData) => {
    const rgb = [0, 0, 0];
    const count = imageData.length / 4;
    for (let i = 0; i < imageData.length; i += 4) {
      rgb[0] += imageData[i];
      rgb[1] += imageData[i + 1];
      rgb[2] += imageData[i + 2];
    }
    return rgb.map((v) => Math.round(v / count));
  };

  const getContrastYIQ = (color) => {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length !== 3) return "black";
    const yiq =
      (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) /
      1000;
    return yiq >= 128 ? "black" : "white";
  };

  const textColor = getContrastYIQ(backgroundColor);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        className="p-8 rounded-lg shadow-lg transition-colors duration-300"
        style={{ backgroundColor, color: textColor }}
      >
        <div className=" w-[500px] h-[333px]">
        <Swiper
              modules={[EffectFlip, Navigation, Pagination]}
              effect="flip"
              grabCursor={true}
              loop={true}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{ clickable: true }}
              className="w-full h-full"
            >
              {imageArr.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`poster-image-${index}`}
                    className="w-full h-full p-8 object-contain"
                  />
                </SwiperSlide>
              ))}
              <button className="swiper-button-prev absolute -left-3 top-1/2 transform -translate-y-1/2  text-white p-2 rounded-full border-none">
                <SlArrowLeft className="" />
              </button>
              <button className="swiper-button-next absolute -right-3 top-1/2 transform -translate-y-1/2  text-white p-2 rounded-full border-none">
                <SlArrowRight />
              </button>
            </Swiper>
        </div>
          </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
