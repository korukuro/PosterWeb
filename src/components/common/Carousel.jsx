import React, { useState } from "react";
import { Button } from "./Button"; // Assuming Button is a local component or you can use a library like Material UI, etc.
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import arrow from "../../additionalFile/right-arrow.png";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { MouseEnterContext } from "../ui/3d-card"; // Ensure this import matches your context export

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesPerSlide = 4;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - imagesPerSlide < 0
        ? images.length - imagesPerSlide
        : prevIndex - imagesPerSlide
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + imagesPerSlide >= images.length
        ? 0
        : prevIndex + imagesPerSlide
    );
  };

  return (
    <MouseEnterContext.Provider value={[false, () => {}]}>
      <div className="relative flex justify-center items-baseline w-full h-full mx-auto">
        <div className="relative h-[30rem] overflow-hidden w-[100%]">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${
                (currentIndex * 100) / imagesPerSlide
              }%)`,
            }}
          >
            {images.map((image, index) => (
              <CardContainer
                key={index}
                className="w-[22rem] h-96 flex-shrink-0 flex justify-center px-2"
              >
                <CardBody className="relative group/card h-full flex justify-center items-center border-2 border-black bg-[#00000031] rounded-lg">
                  <CardItem
                    as="p"
                    translateZ="100"
                    className="absolute text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 break-words"
                  >
                    description
                  </CardItem>

                  <CardItem translateZ="100" className="absolute top-[23rem] left-[20rem]">
                    <button
                      className="absolute w-28 h-14 bottom-4 right-4 text-black border-2 border-black rounded-full font-semibold text-[12px] p-1 px-3 uppercase 
                    opacity-0 group-hover/card:opacity-100 hover:bg-black hover:text-white transition duration-300 ease-in"
                    >
                      Add to Cart
                    </button>
                  </CardItem>

                  <CardItem
                    translateZ="60"
                    className="w-full h-full flex justify-center items-center"
                  >
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="object-contain w-full h-full p-2"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>

        <Button
          className="absolute left-2 top-3/4 transform -translate-y-1/2"
          onClick={goToPrevious}
        >
          <img src={arrow} alt="right-arrow" className="h-36 rotate-180" />
        </Button>
        <Button
          className="absolute right-2 top-3/4 transform -translate-y-1/2"
          onClick={goToNext}
        >
          <img src={arrow} alt="right-arrow" className="h-36" />
        </Button>
      </div>
    </MouseEnterContext.Provider>
  );
};

export default Carousel;
