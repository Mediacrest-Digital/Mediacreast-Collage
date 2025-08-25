import schola from "../images/Scholarshipbanner.jpeg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[623px]">
        <img
          src={schola}
          alt="Scholarship Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hidden sm:block"></div>
        
    
        <div className="hidden sm:flex absolute inset-0 items-center px-4 sm:px-6 lg:px-[74px]">
          {/* <div className="max-w-[522px] space-y-4 sm:space-y-6 lg:space-y-8 text-white">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight drop-shadow-lg">
              We've got some good news for you!
            </h1>
            <p className="text-base lg:text-lg leading-relaxed text-gray-200">
              That's right—on top of the 30% scholarship, our parent company,{" "}
              <Link
                to="https://www.mediacrest.africa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mediacrest-orange font-bold underline transition-colors"
              >
                Mediacrest Digital
              </Link>
              <span className="text-mediacrest-orange font-bold">, </span>
              has gone the extra mile to secure international exposure
              opportunities with top global brands for students hungry for
              success. With our new high-level collaborations, you won't just be
              working on local projects—you'll be playing on a bigger stage.
            </p>
          </div> */}
        </div>
      </div>

      {/* Mobile text section (below image) */}
      <div className="block sm:hidden px-4 py-6">
        <h1 className="font-bold text-xl leading-snug text-gray-900 mb-3">
          We've got some good news for you!
        </h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          That's right—on top of the 30% scholarship, our parent company,{" "}
          <Link
            to="https://www.mediacrest.africa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mediacrest-orange font-bold underline"
          >
            Mediacrest Digital
          </Link>
          <span className="text-mediacrest-orange font-bold">, </span>
          has gone the extra mile to secure international exposure opportunities
          with top global brands for students hungry for success. With our new
          high-level collaborations, you won't just be working on local
          projects—you'll be playing on a bigger stage.
        </p>
      </div>
    </section>
  );
}
