import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const ReviewCarousel = ({ reviews }) => {
  return (
    <Swiper 
      modules={[Autoplay, Pagination]}
      spaceBetween={30} 
      slidesPerView={1}
      loop={true}
      pagination={{ 
        clickable: true,
        dynamicBullets: true 
      }}
      autoplay={{ 
        delay: 5000, 
        pauseOnMouseEnter: true 
      }}
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
      }}
    >
      {reviews.map((review, index) => (
        <SwiperSlide key={index}>
          <div className="review-wrapper">
            <div className="review-card">
              <span className="quote-mark">“</span>
              <div className="stars">★★★★★</div>
              <p className="review-text">{review.text}</p>
            </div>

            <div className="author-block">
              <div className="profile-placeholder">
                <div className="head"></div>
                <div className="body"></div>
              </div>
              <div className="author-text">
                <h4 className="review-author">{review.author}</h4>
                <span className="review-date">{review.date}</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewCarousel;
