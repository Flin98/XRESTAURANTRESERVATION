import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const SpecialOffersCarousel = () => {
  const slides = [
    { id: 1, title: 'SUPER DELICIOUS FOOD', discount: '50% OFF', subtitle: 'Special Chef Platters' },
    { id: 2, title: 'WEEKEND SPECIAL FEAST', discount: '40% OFF', subtitle: 'Italian & Mexican' },
    { id: 3, title: 'FRESH SEAFOOD NIGHT', discount: '30% OFF', subtitle: 'Friday & Saturday' },
    { id: 4, title: 'TABLE RESERVATION SPECIAL', discount: '20% OFF', subtitle: 'On Group Dining' }
  ];

  return (
    <div className="carousel-section">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="offer-card">
              <div className="offer-content">
                <span className="badge">Limited Offer</span>
                <h2>{s.title}</h2>
                <h1 className="discount-text">{s.discount}</h1>
                <p>{s.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SpecialOffersCarousel;