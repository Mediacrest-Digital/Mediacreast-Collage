import schola from "../images/AUG_College_Banner.jpg";
import { Link } from "react-router-dom";
import scholaphone from "../images/AUG_College_Banner-mobile2.jpg";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Desktop & Tablet Image (768px and above) */}
      <div className="hidden md:block relative w-full">
        <img
          src={schola}
          alt="Scholarship Hero Background"
          className="w-full h-auto object-contain"
        />
        <div className="absolute inset-0"></div>
        
        {/* Overlay Content (desktop only) */}
        <div className="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-[74px]">
          {/* Add your desktop text content here if needed */}
        </div>
      </div>

      {/* Mobile and Small Tablet Image (below 768px) */}
      <div className="block md:hidden relative w-full">
        <img
          src={scholaphone}
          alt="Scholarship Hero Mobile Background"
          className="w-full h-auto object-cover"
        />
        {/* Mobile text below image */}
        {/* <div className="px-4 py-6">
          <h1 className="font-bold text-xl leading-snug text-gray-900 mb-3">
            Call For Applications
          </h1>
          <p className="text-sm text-gray-700 leading-relaxed">
            Mediacrest Training College in the spirit of its goal to train over 5 million digitally skilled
            professionals in Africa by 2030 is looking to train individuals interested in Digital Marketing to become 
            Digital Marketing Champions. The program emphasizes on practical learning experiences,
            fostering innovation and digital transformation.
          </p>
        </div> */}
      </div>
    </section>
  );
}