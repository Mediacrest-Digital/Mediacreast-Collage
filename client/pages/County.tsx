import React from 'react';
import { Link } from "react-router-dom";

import Footer from "../Component/Footer";
import backgroun from "../images/CountyImage1.jpg";
import bgMobil from "../images/countypic.jpeg";
import county from "../images/countyHero.jpg"
import Navbar from "../Component/Navbar";
import { Briefcase, BarChart, Share2, Cpu, Users, Lightbulb } from "lucide-react"; // ✅ Add the new icons here

const impactItems = [
  {
    icon: <Share2 className="w-8 h-8 text-mediacrest-orange" />,
    title: "Enhanced Digital Competency",
  },
  {
    icon: <BarChart className="w-8 h-8 text-mediacrest-orange" />,
    title: "Economic Empowerment & Job Creation",
  },
  {
    icon: <Cpu className="w-8 h-8 text-mediacrest-orange" />,
    title: "Promoting Digital Inclusion",
  },
  {
    icon: <Users className="w-8 h-8 text-mediacrest-orange" />,
    title: "Industry-Relevant Mentorship & Exposure",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-mediacrest-orange" />,
    title: "Supporting Local Innovation & Transformation",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-mediacrest-orange" />,
    title: "Empower youth through job readiness & entrepreneurship.",
  },
];

const CountyModels = () => {
  return (
    <div>
          <Navbar />

    <section className="Seindex relative h-[80vh] bg-gradient-to-r from-mediacrest-navy to-mediacrest-navy/90">
      {/* Desktop/Tablet Background Image - Hidden on mobile */}
      <div className="Dimg absolute inset-0 z-0 hidden md:block">
        <img className="imgT w-full h-full object-cover" src={backgroun} alt="Desktop background" />
        {/* Optional overlay for desktop */}
        <div className="absolute inset-0 bg-mediacrest-navy/20"></div>
      </div>
      
      {/* Mobile Background Image - Only visible on mobile */}
      <div className="absolute inset-0 z-0 md:hidden">
        {/* Replace 'mobileBackground' with your mobile background image variable */}
        <img 
          className="w-full h-full object-cover" 
          src={county} 
          alt="Mobile background" 
        />
        {/* Mobile overlay with opacity for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-mediacrest-navy/90 via-mediacrest-navy/70 to-mediacrest-navy/50"></div>
        
        {/* Optional: Add subtle floating elements for mobile */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-8 w-24 h-24 bg-mediacrest-orange rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 left-6 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse delay-300"></div>
        </div>
      </div>
    
      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-[74px] pt-16 lg:pt-20 pb-16 lg:pb-20 h-full flex items-center">
        <div className="max-w-2xl">
          <div className="relative mb-6">
            <h1 className="TGovernor text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Building Digital Futures and Innovation Across Counties
            </h1>
            {/* <svg
              className="absolute -right-[-40px] sm:-right-2 top-8 sm:top-12 lg:top-16 w-20 sm:w-24 lg:w-32 h-2"
              viewBox="0 0 190 13"
              fill="none"
            >
              <path
                d="M2 5.29882C33.0528 2.116 113.664 -1.36098 187.684 10.1936"
                stroke="#EB4823"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
          </div>
    
          <p className="text-mediacrest-gray-300 text-base lg:text-lg leading-relaxed mb-8 lg:mb-12 max-w-xl">
              This County Skilling Model is designed to equip learners with practical, future-focused digital skills through immersive learning experiences, mentorship and industry exposure. 

          </p>
    
      
        </div>
      </div>  
    </section>
    {/* why partner with us */}
        <section className="bg-mediacrest-orange min-h-[60vh] py-12 px-4 sm:px-8 lg:px-16 text-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={bgMobil} // for Next.js with Image import
            alt="Group of people"
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-white">
            Kisii County Government in Partnership with Mediacrest Training College
          </h2>

          <p className="text-white/90 text-lg leading-relaxed mb-8">
            This program is designed to equip youth, entrepreneurs and public service professionals with essential digital competencies for the 21st century. Aligned with Kenya's digital transformation agenda and global digital literacy standards, the program offers tailored modules that range from basic computer skills to advanced digital marketing, Artificial Intelligence and online business strategies.
            <br/>
            <br/> 
            The Kisii County Government envisions a tech-savvy community where digital skills drive innovation, job creation and improved service delivery.
            <br/>
            <br/>
            This curriculum serves as a strategic guide to fostering digital inclusion, economic empowerment and sustainable development across the county.
          </p>
          <Link to="/contact">
          <button className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:text-mediacrest-orange transition">
            Partner with Us →
          </button>
          </Link>
        </div>
      </div>
    </section>
{/* *** */}

      <section className="bg-mediacrest-orange/10 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-mediacrest-orange mb-10">
          Program Highlights
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white border border-mediacrest-orange/30 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <div className="text-5xl font-semibold text-mediacrest-orange mb-4">01</div>
            <h3 className="text-xl font-bold text-mediacrest-orange mb-2">Hands-on Digital Skills Training</h3>
            <p className="text-gray-700">
              Building digital skills through hands-on training in marketing, content, AI, and more.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-mediacrest-orange/30 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <div className="text-5xl font-semibold text-mediacrest-orange mb-4">02</div>
            <h3 className="text-xl font-bold text-mediacrest-orange mb-2">Artificial Intelligence (AI) Skills Development</h3>
            <p className="text-gray-700">
              Equipping learners with practical AI skills to thrive in a digital-first world.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-mediacrest-orange/30 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <div className="text-5xl font-semibold text-mediacrest-orange mb-4">03</div>
            <h3 className="text-xl font-bold text-mediacrest-orange mb-2">Mentorship and Industry Exposure</h3>
            <p className="text-gray-700">
              Connecting learners with industry mentors to boost skills, confidence, and career readiness.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* sc3 */}

    <section className="py-16 px-4 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-mediacrest-orange mb-4">
        The Impact
      </h2>
      <p className="text-gray-700 max-w-xl mx-auto mb-12">
        By partnering with Mediacrest Ttraining College, County Governments can:
      </p>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {impactItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-mediacrest-orange/10 rounded-full p-6 mb-4">
              {item.icon}
            </div>
            <p className="text-gray-800 text-base md:text-lg max-w-xs">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
    
<Footer/>
</div>
        
    
  )
}

export default CountyModels