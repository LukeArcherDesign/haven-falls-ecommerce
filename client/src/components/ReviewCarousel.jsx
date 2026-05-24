import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const ReviewCarousel = ({ reviews }) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 5000,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
      }}
      className="!pb-[60px] !pt-[20px] !px-[20px]" // Swiper padding override
    >
      {reviews.map((review, index) => (
        <SwiperSlide key={index} className="!h-auto">
          <div className="h-full flex flex-col items-center flex-grow px-5">
            {/* The Review Card */}
            <div className="bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.2)] p-[30px] relative text-left w-full mb-5 flex flex-col flex-grow">
              {/* Top Left Quote */}
              <span className="absolute top-[10px] left-[15px] text-[45px] text-[#979899] font-serif leading-none">
                “
              </span>

              {/* Top Right Google Logo */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png"
                alt="Google Review"
                className="absolute top-[15px] right-[15px] w-[24px] h-[24px]"
              />

              <div className="mt-2">
                <div className="text-brandLightOrange text-[20px] mb-[10px] tracking-[2px]">
                  ★★★★★
                </div>
                <p className="text-[#183855] line-clamp-4">{review.text}</p>
              </div>
            </div>

            {/* Author Block */}
            <div className="flex items-center gap-[15px] mt-auto">
              {review.useDynamicAvatar ? (
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.author)}&background=FF9169&color=fff&size=50&rounded=true&bold=true`}
                  alt={`${review.author} profile`}
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
              ) : (
                /* Native CSS Drawing - in CSS stylesheet */
                <div className="profile-placeholder">
                  <div className="head"></div>
                  <div className="body"></div>
                </div>
              )}

              <div className="text-left">
                <h4 className="text-white m-0 text-[16px]">{review.author}</h4>
                <span className="text-[#a0aab2] text-[14px]">
                  {review.date}
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewCarousel;
