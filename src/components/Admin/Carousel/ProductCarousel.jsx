'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function ProductCarousel({ productdetails }) {
  return (
    <div className="w-full max-w-md mx-auto overflow-hidden border rounded">
      
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500 }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-64"
      >
        {productdetails?.images?.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-64 flex items-center justify-center bg-gray-100">
              <img
                src={img}
                alt={`product-${index}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}