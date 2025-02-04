import React from 'react';

// npm i swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SplitText from '../../ui/split-text';

import image1 from '../../../additionalFile/home-image/homeImage_1.jpg';
import image2 from '../../../additionalFile/home-image/homeImage_2.jpg';
import image3 from '../../../additionalFile/home-image/homeImage_3.jpg';
import image4 from '../../../additionalFile/home-image/homeImage_4.jpg';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const Section_1 = () => {
  // Array of objects containing images and headings
  const slides = [
    { image: image1, heading: "Posters That Make a Statement." },
    { image: image2, heading: "HAAG DIYA" },
    { image: image3, heading: "Mosambi Ka juus pila do" },
    { 
      image: image4, 
      heading: (
        <SplitText
          text="Hello, Tailwind!"
          className="text-8xl font-semibold text-center"
          delay={150}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      )
    },
  ];

  return (
    <div className="w-full lg:h-auto overflow-hidden">
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
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full flex justify-center items-center">
              {/* Heading overlay */}
              <div className="absolute lg:top-52 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                <h2 className="lg:text-6xl font-bold">{slide.heading}</h2>
              </div>
              {/* Image */}
              <img
                src={slide.image}
                alt={`Carousel slide ${index + 1}`}
                className="w-full md:h-[30rem] lg:h-[50rem] object-cover md:object-fill"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Section_1;
