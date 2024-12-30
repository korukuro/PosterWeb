import React, { useState } from 'react';
import { Button } from './Button'; // Assuming Button is a local component or you can use a library like Material UI, etc.
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesPerSlide = 4;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - imagesPerSlide < 0 ? images.length - imagesPerSlide : prevIndex - imagesPerSlide
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + imagesPerSlide >= images.length ? 0 : prevIndex + imagesPerSlide
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-64 overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex * 100) / imagesPerSlide}%)` }}
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
        variant="outline"
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
        onClick={goToPrevious}
      >
        <FaChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={goToNext}
      >
        <FaChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Carousel;
