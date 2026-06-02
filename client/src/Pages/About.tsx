import tentImage from "../assets/Camping-Tent-pov.jpg";
import bannerImage from "../assets/banner-background.jpg";

const About = () => {
  return (
    <div className="overflow-x-hidden bg-[#183855] pb-20">
      {/* --- IMAGE BANNER & TRAPEZE HEADER --- */}
      <div
        className="w-full h-[250px] md:h-[350px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        {/* Tailwind Clip-Path Trapeze - Responsive Geometry & Safe Padding */}
        <div className="mx-5 bg-brandOrange py-5 px-10 md:py-6 md:px-24 shadow-[0_10px_25px_rgba(0,0,0,0.2)] [clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)] md:[clip-path:polygon(15%_0%,85%_0%,100%_100%,0%_100%)]">
          <h1 className="text-[#183855] text-lg md:text-3xl font-bold m-0 text-center uppercase tracking-wider">
            Engineered for the Elements
          </h1>
        </div>
      </div>

      {/* --- CONTENT SPLIT SECTION --- */}
      <div className="max-w-[1200px] mx-auto mt-[60px] px-6 flex flex-col md:flex-row gap-[50px] items-start">
        {/* The White Text Card */}
        <div className="flex-1 bg-white p-8 md:p-12 rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] text-[#183855]">
          <p className="leading-[1.8] text-[1.1rem] mb-[20px]">
            We started with a simple problem: professional outdoor gear was
            either entirely unaffordable, or the budget alternatives were too
            fragile to trust in the wild. Our mission is to bridge that
            gap—building equipment that survives the harshest climates without
            the premium markup.
          </p>
          <p className="leading-[1.8] text-[1.1rem] mb-[20px]">
            Every prototype we design goes through a brutal validation process.
            We test tear strength, thermal retention, and weatherproofing in
            simulated extremes before a single piece of fabric is stitched for
            production. If it fails in the lab, it never sees the trail.
          </p>
          <p className="leading-[1.8] text-[1.1rem] mb-[20px]">
            From the unpredictable winds of the Highlands to the freezing
            elevations of the Alps, every tent, sleeping bag, and multi-tool we
            sell is field-tested by veteran guides, alpine climbers, and
            everyday adventurers. We rely on raw data and real-world abuse to
            perfect our designs.
          </p>
          <p className="leading-[1.8] text-[1.2rem] font-bold text-brandOrange mt-[30px]">
            We don't just sell gear; we engineer survival.
          </p>
        </div>

        {/* The Image Container */}
        <div className="flex-1 w-full">
          <img
            src={tentImage}
            alt="View from inside a tent looking out at a forest sunrise"
            className="w-full rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] block object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
