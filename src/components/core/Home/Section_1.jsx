import React from 'react';

// npm i swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import image1 from '../../../additionalFile/home-image/homeImage_1.jpg';
import image2 from '../../../additionalFile/home-image/homeImage_2.jpg';
import image3 from '../../../additionalFile/home-image/homeImage_3.jpg';
// import image3 from '../../../additionalFile/home-image/homeImage_3.jpg'; // Add more images as needed

const Section_1 = () => {
  // Array of objects containing images and headings
  const slides = [
    { image: image1, heading: "Posters That Make a Statement." },
    { image: image2, heading: "Transform Your Walls, Transform Your World!" },
    { image: image3, heading: "Mosambi Ka joos pila do" },
    // Add more slides as needed
  ];

  return (
    <div className="w-full h-auto overflow-hidden border-2 border-black">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000, // Time between slides in milliseconds (3 seconds)
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        className=""
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full">
              {/* Heading overlay */}
              <div className="absolute bottom-20 left-10 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                <h2 className="text-3xl font-bold">{`"${slide.heading}"`}</h2>
              </div>
              {/* Image */}
              <img
                src={slide.image}
                alt={`Carousel slide ${index + 1}`}
                className="w-full h-[50rem] object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Section_1;
