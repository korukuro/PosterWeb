import React from 'react';

// npm i swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import image1 from '../../../additionalFile/home-image/homeImage_1.jpg';
import image2 from '../../../additionalFile/home-image/homeImage_2.jpg';
// import image3 from '../../../additionalFile/home-image/homeImage_3.jpg'; // Add more images as needed

const Section_1 = () => {
  const images = [image1, image2]; // Array of images

  return (
    <div className="w-full h-auto overflow-hidden">
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
        className="h-[35rem]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Carousel slide ${index + 1}`}
              className="w-full h-[35rem] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Section_1;
