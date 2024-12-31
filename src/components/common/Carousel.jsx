import React, { useState } from 'react';
import { Button } from './Button'; // Assuming Button is a local component or you can use a library like Material UI, etc.
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import arrow from '../../additionalFile/right-arrow.png'

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
    <div className="relative flex justify-center items-baseline w-full h-full mx-auto ">
      <div className="relative h-64 overflow-hidden w-[100%]">
        <div
          className="flex  gap-4 transition-transform duration-500 ease-in-out "
          style={{
            transform: `translateX(-${(currentIndex * 100) / imagesPerSlide}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-1/4 flex-shrink-0 flex justify-center px-1 ">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="rounded-lg h-64 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      

      
      <Button
        // variant="outline"
        className="absolute left-2 top-2/3 transform -translate-y-1/2"
        onClick={goToPrevious}
      >
        <img src={arrow} alt="right-arrow" className='h-36 rotate-180'/>
      </Button>
      <Button
        // variant="outline"
        className="absolute right-2 top-2/3 transform -translate-y-1/2"
        onClick={goToNext}
      >
        <img src={arrow} alt="right-arrow" className='h-36'/>
      </Button>
      </div>
  );
};

export default Carousel;
