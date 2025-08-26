import schola from "../images/Scholarshipbanner.jpeg";
import { Link } from "react-router-dom";
import scholaphone from "../images/Heroscholar.jpg";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Desktop & Tablet Image */}
      <div className="hidden sm:block relative w-full h-[300px] sm:h-[400px] lg:h-[623px]">
        <img
          src={schola}
          alt="Scholarship Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0"></div>

        {/* Overlay Content (desktop only) */}
        <div className="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-[74px]">
          {/* Add your desktop text content here if needed */}
        </div>
      </div>

      {/* Mobile Image */}
    {/* Mobile Image */}
<div className="block sm:hidden relative w-full h-[380px]"> {/* increased height */}
  <img
    src={scholaphone}
    alt="Scholarship Hero Mobile Background"
    className="w-full h-full object-cover"
  />
  {/* Mobile text below image */}
  <div className="px-4 py-6">
    <h1 className="font-bold text-xl leading-snug text-gray-900 mb-3">
      Call For Applications
    </h1>
    <p className="text-sm text-gray-700 leading-relaxed">
      Mediacrest Training College in the spirit of its goal to train over 5 million digitally skilled
      professionals by 2030 is looking to train individuals interested in Digital Marketing to become 
      Digital Marketing Champions. The program emphasizes on practical learning experiences,
      fostering innovation and digital transformation.
    </p>
  </div>
</div>

    </section>
  );
}
