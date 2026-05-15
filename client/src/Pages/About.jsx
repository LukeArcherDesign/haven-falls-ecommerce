import tentImage from "../assets/Camping-Tent-pov.jpg";
import bannerImage from '../assets/banner-background.jpg';

const About = () => {
  return (
    <div className="about-wrapper">
    <div 
        className="about-topo-header" 
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <h1>Engineered for the Elements</h1>
      </div>

      <div className="about-content-split">
        <div className="about-text">
          <p>
            We started with a simple problem: professional outdoor gear was
            either too expensive, or affordable gear was too fragile. Our
            mission is to build equipment that survives the harshest climates
            without the premium markup.
          </p>
          <p>
            From the Highlands to the Alps, every tent, sleeping bag, and
            multi-tool we sell is field-tested by guides, climbers, and everyday
            adventurers. We don't just sell gear; we engineer survival.
          </p>
        </div>

        <div className="about-image-container">
          <img
            src={tentImage}
            alt="View from inside a tent looking out at a forest sunrise"
            className="about-image"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
