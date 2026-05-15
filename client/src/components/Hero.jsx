import heroVideo from '../assets/hero-video.mp4';
import { Link } from 'react-router-dom'; // The new import

function Hero() {
  return (
    <section className="hero-container">
  
      {/* VIDEO BACKGROUND */}
      <video autoPlay loop muted playsInline className="hero-video">
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* HERO TEXT */}
      <div className="hero-content">
        <h1>Equipping Your Next Adventure</h1>
        <p>Premium camping gear and outdoor apparel for the modern explorer.</p>
        
        {/* CTA Button */}
        <Link to="/shop" className="cta-button">
          Shop Now
        </Link>
        
      </div>
    </section>
  );
}

export default Hero;