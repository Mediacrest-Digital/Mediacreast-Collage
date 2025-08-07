import React from 'react';
import { Link } from "react-router-dom";
import "../index.css"

const JoinUs = () => {
  return (
    
       <section className="SCJoin py-12 sm:py-6 lg:py-20 bg-white/70 ">
            <div className="container mx-auto px-13 sm:px-0 lg:px-20">
              <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
              <div className="relative w-full max-w-md sm:max-w-lg mx-auto lg:mx-0">
      {/* Border frame with offset lines */}
      <div className="absolute inset-0 rounded-[30px] border-[1px] border-[#5AC8FF] pointer-events-none z-0" style={{left:"20px", top: '-20px', right: '-25px', bottom:"2px"}}></div>
    
      {/* Image container */}
      <div className="relative z-10 rounded-[50px] overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a7c1b6d942651215068c82dc30ffc5d05ed02a6?width=1072"
          alt="Student learning"
          className="w-full h-full object-cover aspect-[4/2.7]"
        />
      </div>
    
      {/* Star top-left */}
      <div className="absolute -top-4 -left-4 z-20  sm:block">
        <svg
          width="50"
          height="49"
          viewBox="0 0 50 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#EF6B4D]"
        >
          <path
            d="M31.002 31.2951L26.5613 43.5068C26.4526 43.7998 26.2567 44.0526 26.0001 44.2311C25.7435 44.4095 25.4384 44.5052 25.1258 44.5052C24.8132 44.5052 24.5081 44.4095 24.2515 44.2311C23.9949 44.0526 23.799 43.7998 23.6902 43.5068L19.2496 31.2951C19.1721 31.0846 19.0498 30.8934 18.8911 30.7348C18.7325 30.5762 18.5414 30.4539 18.3309 30.3763L6.11916 25.9357C5.82611 25.8269 5.57337 25.6311 5.3949 25.3745C5.21642 25.1178 5.12076 24.8127 5.12076 24.5002C5.12076 24.1876 5.21642 23.8825 5.3949 23.6259C5.57337 23.3692 5.82611 23.1734 6.11916 23.0646L18.3309 18.624C18.5414 18.5464 18.7325 18.4241 18.8911 18.2655C19.0498 18.1069 19.1721 17.9157 19.2496 17.7052L23.6902 5.49351C23.799 5.20047 23.9949 4.94773 24.2515 4.76926C24.5081 4.59078 24.8132 4.49512 25.1258 4.49512C25.4384 4.49512 25.7435 4.59078 26.0001 4.76926C26.2567 4.94773 26.4526 5.20047 26.5613 5.49351L31.002 17.7052C31.0795 17.9157 31.2018 18.1069 31.3605 18.2655C31.5191 18.4241 31.7102 18.5464 31.9207 18.624L44.1324 23.0646C44.4255 23.1734 44.6782 23.3692 44.8567 23.6259C45.0352 23.8825 45.1308 24.1876 45.1308 24.5002C45.1308 24.8127 45.0352 25.1178 44.8567 25.3745C44.6782 25.6311 44.4255 25.8269 44.1324 25.9357L31.9207 30.3763C31.7102 30.4539 31.5191 30.5762 31.3605 30.7348C31.2018 30.8934 31.0795 31.0846 31.002 31.2951Z"
            stroke="currentColor"
            strokeWidth="3.0625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    
      {/* Orange squiggle top-right */}
      <svg
        className="SquiggleT absolute lg:-top-8 lg:-right-20 lg:w-44 h-20 text-[#EF6B4D]   sm:block z-0"
        viewBox="0 0 142 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M138.374 15.3151C115.023 38.3355 70.731 73.062 80.3673 27.8046C92.4127 -28.7671 47.061 27.3974 26.8579 52.098C28.0883 50.6514 -16.3925 107.058 14.913 12.019"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    
      {/* Yellow dot bottom-right */}
      <div className="YellowDot absolute bottom-4 lg:-right-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#FBBC04] rounded-full z-0  sm:block" />
    </div>
    
    
                <div className="textDec  w-full lg:flex-1 space-y-8 sm:space-y-6  lg:text-left">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                    Join us at{" "}
                    <span className="text-mediacrest-orange">Mediacrest</span>{" "}
                    Training College
                  </h2>
                  <p className="text-mediacrest-gray-600 leading-relaxed text-sm sm:text-base">
                    As a creative house, the college fosters an environment where
                    passion meets purpose, blending technical proficiency with
                    artistic expression. With experienced faculty, modern facilities
                    and strong industry connections, the college is committed to
                    molding Africa's brightest minds, helping them to thrive in
                    competitive fields.
                  </p>
    
    
    <div className="flex justify-center sm:justify-start">
      <Link
        to="/application"
        className="w-fit px-6 py-3 bg-[#EB4823] text-white rounded-lg font-semibold flex items-center gap-3 hover:bg-[#d63e1e] transition-colors text-lg"
      >
        Apply Now
        <svg
          className="w-4 h-4 rotate-180"
          viewBox="0 0 17 17"
          fill="none"
        >
          <path
            d="M11.9953 9.16664L9.362 11.8C9.29833 11.8615 9.24754 11.935 9.2126 12.0164C9.17766 12.0977 9.15927 12.1852 9.1585 12.2737C9.15773 12.3622 9.1746 12.45 9.20812 12.5319C9.24164 12.6139 9.29114 12.6883 9.35374 12.7509C9.41633 12.8135 9.49077 12.863 9.5727 12.8965C9.65463 12.93 9.74241 12.9469 9.83093 12.9461C9.91945 12.9454 10.0069 12.927 10.0883 12.892C10.1696 12.8571 10.2432 12.8063 10.3047 12.7426L14.076 8.97131C14.201 8.84629 14.2712 8.67675 14.2712 8.49997C14.2712 8.3232 14.201 8.15366 14.076 8.02864L10.3047 4.25731C10.1789 4.13587 10.0105 4.06867 9.83573 4.07019C9.66093 4.07171 9.49373 4.14182 9.37012 4.26543C9.24652 4.38903 9.1764 4.55624 9.17488 4.73104C9.17337 4.90584 9.24056 5.07424 9.362 5.19997L11.9953 7.83331L3.16667 7.83331C2.98986 7.83331 2.82029 7.90355 2.69526 8.02857C2.57024 8.15359 2.5 8.32316 2.5 8.49997C2.5 8.67679 2.57024 8.84635 2.69526 8.97138C2.82029 9.0964 2.98986 9.16664 3.16667 9.16664H11.9953Z"
            fill="white"
          />
        </svg>
      </Link>
    </div>
    
    
                </div>
              </div>
            </div>
          </section>
    
  )
}

export default JoinUs
