import heroVideo from "../assets/hero-video.mp4";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[75vh] p-5 flex items-center justify-center overflow-hidden">
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute object-right-bottom top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* HERO TEXT */}
      <div className="text-center text-white max-w-[800px]">
        <h1 className="text-[clamp(1.8rem,5vw,3rem)] mb-4 font-bold">
          Equipping Your Next Adventure
        </h1>
        <p className="text-[clamp(1rem,2vw,1.2rem)] mb-8">
          Premium camping gear and outdoor apparel for the modern explorer.
        </p>

        {/* CTA Button */}
        <Link
          to="/shop"
          className="inline-block py-4 px-8 bg-brandOrange text-[#0b1120] font-bold text-[1.1rem] rounded-lg transition-all duration-200 ease-in-out hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(244,162,97,0.3)]"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}

export default Hero;
