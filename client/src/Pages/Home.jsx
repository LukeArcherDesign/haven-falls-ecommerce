import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ReviewCarousel from "../components/ReviewCarousel";
import { customerReviews } from "../data/reviewsData";

import {
  FaShippingFast,
  FaLeaf,
  FaHeadset,
  FaMountain,
  FaWind,
  FaDumbbell,
  FaCompass,
  FaCompressAlt,
  FaTools,
} from "react-icons/fa";
import campingImg from "../assets/camping.png";
import apparelImg from "../assets/apparel.png";
import accessoriesImg from "../assets/accessories.png";

import storyImg1 from "../assets/our-story-1.webp";
import storyImg2 from "../assets/our-story-2.webp";
import storyImg3 from "../assets/our-story-3.jpg";

const categorySlides = [
  {
    title: "Tents",
    description:
      "Built for the elements. High-performance tents designed for both comfort and durability.",
    buttonText: "Shop Tents",
    image: campingImg,
    features: [
      { icon: FaLeaf, text: "Weatherproof" },
      { icon: FaShippingFast, text: "Ultra-Light" },
      { icon: FaHeadset, text: "Lifetime Warranty" },
    ],
  },
  {
    title: "Exercise",
    description:
      "Engineered for extreme terrain. Made from high quality, long lasting materials to help you reach your peak performance.",
    buttonText: "Shop Exercise",
    image: apparelImg,
    features: [
      { icon: FaMountain, text: "All-Terrain" },
      { icon: FaWind, text: "Weather Resistant" },
      { icon: FaDumbbell, text: "Heavy-Duty" },
    ],
  },
  {
    title: "Accessories",
    description:
      "The essential tools of the trade. Hydration packs, navigation gear, and survival kits.",
    buttonText: "Shop Accessories",
    image: accessoriesImg,
    features: [
      { icon: FaCompass, text: "Precision" },
      { icon: FaCompressAlt, text: "Compact" },
      { icon: FaTools, text: "Versatile" },
    ],
  },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const imageRefs = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const observerThreshold = isMobile ? 0.8 : 0.5;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index"));
            setActiveSlide(index);
          }
        });
      },
      { threshold: observerThreshold },
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, []);

  const handleDotClick = (index) => {
    setActiveSlide(index);
    imageRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div>
      {/* ---------------------------- HERO SECTION ---------------------------- */}
      <Hero />

      {/* ---------------------------- BRAND STORY ---------------------------- */}
      <section className="our-story-background py-[60px] px-[20px] flex justify-center">
        <div className="bg-[#0b1120] text-white w-full max-w-[1200px] p-[50px] rounded-[15px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] mb-[50px]">
            <div>
              <h2 className="mt-0 text-[2.5rem] text-white font-bold">
                Our Story
              </h2>
              <p className="leading-[1.6] text-[1.1rem]">
                Founded on a passion for the great outdoors, Haven Falls is
                dedicated to equipping your next adventure with sustainable,
                high-quality gear.
              </p>
            </div>

            <div>
              <p className="leading-[1.6] text-[1.1rem] mb-[20px]">
                We believe that nature is for everyone. From the highest peaks
                to the local trails, our mission is to provide gear that you can
                rely on, no matter the conditions.
              </p>
              <Link
                to="/about"
                className="inline-block px-[20px] py-[10px] bg-brandOrange text-white font-bold rounded-[5px] hover:scale-105 transition-transform duration-200"
              >
                Read More
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-[20px] w-full">
            <img
              src={storyImg1}
              alt="Haven Falls Origin"
              className="flex-1 w-full h-[300px] object-cover rounded-[8px] min-w-0"
            />
            <img
              src={storyImg2}
              alt="Haven Falls Gear Quality"
              className="flex-1 w-full h-[300px] object-cover rounded-[8px] min-w-0"
            />
            <img
              src={storyImg3}
              alt="Haven Falls Summit Deployment"
              className="flex-1 w-full h-[300px] object-cover rounded-[8px] min-w-0"
            />
          </div>
        </div>
      </section>

      {/* ---------------------------- SHOP BY CATEGORY ---------------------------- */}
      <section className="flex flex-col md:flex-row md:h-[300vh] relative bg-white">
        <div className="flex-1 sticky top-0 h-[40vh] md:h-[100vh] w-full flex flex-col justify-start md:justify-center px-[20px] pr-[60px] md:px-[10%] pt-[30px] md:pt-0 bg-white z-10 box-border">
          <span className="text-[0.9rem] uppercase tracking-[2px] text-[#0b1120] mb-[10px]">
            Category Spotlight
          </span>

          <div key={activeSlide} className="fade-in-text">
            <h2 className="text-[1.8rem] md:text-[2.5rem] text-[#0b1120] mt-[10px] md:mt-0 mb-[5px] md:mb-[20px]">
              {categorySlides[activeSlide].title}
            </h2>
            <p className="text-[1.1rem] leading-[1.6] text-[#333333] mb-[15px] md:mb-[30px]">
              {categorySlides[activeSlide].description}
            </p>
          </div>

          <div className="flex gap-[30px] my-[10px] md:my-[30px]">
            {categorySlides[activeSlide].features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <IconComponent className="text-[2rem] text-brandOrange mb-[10px]" />
                  <p className="text-[0.85rem] font-semibold text-[#0b1120] m-0">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>

          <Link
            to="/shop"
            className="inline-block px-[20px] py-[10px] bg-brandOrange text-white font-bold rounded-[5px] hover:scale-105 transition-transform duration-200 w-fit"
          >
            {categorySlides[activeSlide].buttonText}
          </Link>

          {/* NAVIGATION DOTS */}
          <div className="absolute right-[15px] md:right-[30px] top-[50%] -translate-y-1/2 md:transform-none md:scale-100 scale-80 flex flex-col gap-[15px] z-20">
            {categorySlides.map((slide, index) => (
              <div
                key={index}
                className={`w-[12px] h-[12px] rounded-full cursor-pointer transition-colors duration-300 ${activeSlide === index ? "bg-[#0b1120] scale-125" : "bg-[#cbd5e1]"}`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex-1 h-full flex flex-col overflow-y-auto snap-y snap-mandatory no-scrollbar">
          {categorySlides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={slide.title}
              className="w-full h-[65vh] md:h-[100vh] object-contain snap-start shrink-0"
              ref={(el) => (imageRefs.current[index] = el)}
              data-index={index}
            />
          ))}
        </div>
      </section>

      {/* ---------------------------- REVIEW CAROUSEL ---------------------------- */}
      <section className="bg-[#183855] py-[80px] px-[50px]">
        <h2 className="text-white text-center mb-[40px] text-[2rem] font-bold">
          What Adventurers Say
        </h2>
        <ReviewCarousel reviews={customerReviews} />
      </section>
    </div>
  );
};

export default Home;
