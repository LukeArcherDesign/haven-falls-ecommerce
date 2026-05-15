import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ReviewCarousel from "../components/ReviewCarousel";
import { customerReviews } from '../data/reviewsData';

import { FaShippingFast, FaLeaf, FaHeadset } from "react-icons/fa";
import campingImg from "../assets/camping.png";
import apparelImg from "../assets/apparel.png";
import accessoriesImg from "../assets/accessories.png";

import storyImg1 from "../assets/our-story-1.webp";
import storyImg2 from "../assets/our-story-2.webp";
import storyImg3 from "../assets/our-story-3.jpg";

const categorySlides = [
  {
    title: "Camping Gear",
    description:
      "Built for the elements. High-performance tents, sleeping bags, and equipment to keep you secure in the wild.",
    buttonText: "Shop Camping",
    image: campingImg, 
  },
  {
    title: "Apparel",
    description:
      "Engineered for movement. Breathable, weather-resistant clothing for any altitude.",
    buttonText: "Shop Apparel",
    image: apparelImg,
  },
  {
    title: "Accessories",
    description:
      "The essential tools of the trade. Hydration packs, navigation gear, and survival kits.",
    buttonText: "Shop Accessories",
    image: accessoriesImg,
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
      inline: "center" 
    });
  };

  return (
    <div>
      {/* ---------------------------- HERO SECTION ---------------------------- */}
      <Hero />

      {/* ---------------------------- BRAND STORY ---------------------------- */}
      <section className="our-story-background">
        <div className="our-story-blue-box">
          <div className="story-text-columns">
            <div className="story-column">
              <h2>Our Story</h2>
              <p>
                Founded on a passion for the great outdoors, Haven Falls is
                dedicated to equipping your next adventure with sustainable,
                high-quality gear.
              </p>
            </div>

            <div className="story-column">
              <p>
                We believe that nature is for everyone. From the highest peaks
                to the local trails, our mission is to provide gear that you can
                rely on, no matter the conditions.
              </p>
              <Link to="/about" className="secondary-button">
                Read More
              </Link>
            </div>
          </div>

          <div className="story-image-row">
            <img src={storyImg1} alt="Haven Falls Origin" className="story-image" />
            <img src={storyImg2} alt="Haven Falls Gear Quality" className="story-image" />
            <img src={storyImg3} alt="Haven Falls Summit Deployment" className="story-image" />
          </div>
        </div>
      </section>

      {/* ---------------------------- SHOP BY CATEGORY ---------------------------- */}
      <section className="category-slider">
        <div className="category-info-panel">
          <span className="sub-heading">Category Spotlight</span>

          <div key={activeSlide} className="fade-in-text">
            <h2>{categorySlides[activeSlide].title}</h2>
            <p>{categorySlides[activeSlide].description}</p>
          </div>

          <div className="category-icon-grid">
            <div className="icon-wrapper">
              <FaLeaf className="slider-icon" />
              <p>Weatherproof</p>
            </div>

            <div className="icon-wrapper">
              <FaShippingFast className="slider-icon" />
              <p>Ultra-Light</p>
            </div>

            <div className="icon-wrapper">
              <FaHeadset className="slider-icon" />
              <p>Lifetime Warranty</p>
            </div>
          </div>

          <Link to="/shop" className="secondary-button">
            {categorySlides[activeSlide].buttonText}
          </Link>

          {/* NAVIGATION DOTS */}
          <div className="nav-dots-wrapper">
            {categorySlides.map((slide, index) => (
              <div
                key={index}
                className={`nav-dot ${activeSlide === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)} 
              ></div>
            ))}
          </div>
        </div>

        <div className="category-image-panel">
          {categorySlides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={slide.title}
              className="slider-image"
              ref={(el) => (imageRefs.current[index] = el)}
              data-index={index}
            />
          ))}
        </div>
      </section>

      {/* ---------------------------- REVIEW CAROUSEL ---------------------------- */}
      <section className="reviews-section">
        <h2>What Adventurers Say</h2>
        <ReviewCarousel reviews={customerReviews} />
      </section>
    </div>
  );
};

export default Home;