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
    <div className="relative flex justify-center items-baseline w-full h-full mx-auto border-2 border-gray-950">
      <div className="relative h-64 overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / imagesPerSlide}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-1/4 flex-shrink-0 px-1">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      

      
      <Button
        // variant="outline"
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
        onClick={goToPrevious}
      >
        <img src={arrow} alt="right-arrow" className='h-36 rotate-180'/>
      </Button>
      <Button
        // variant="outline"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={goToNext}
      >
        <img src={arrow} alt="right-arrow" className='h-36'/>
      </Button>
      </div>
  );
};

export default Carousel;
