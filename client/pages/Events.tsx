import React from 'react';
import "./images.css"
import Footer from "@/Component/Footer";
import EventCard from "@/Component/EventCard";
import Link from "react-router-dom";
import Navbar from "../Component/Navbar";
import Img1 from "../images/events.png"

const Events = () => {
 const upcomingEvents = [
    {
      month: "AUG",
      day: "20",
      title: "Join Us For A Free Virtual Tour & Open Day",
      time: "7:00PM - 9:00PM",
      location: "Virtual",
      description:
        "Join us for a virtual tour and open day for our top 3 certification courses : Digital Marketing | Graphic Design | Photography & Videography",
    },
    // {
    //   month: "AUG",
    //   day: "20",
    //   title: "Join Us For A Free Virtual Tour & Open Day",
    //   time: "7:00PM - 9:00PM",
    //   location: "Virtual",
    //   description:
    //     "Join us for a virtual tour and open day for our top 3 certification courses : Digital Marketing | Graphic Design | Photography & Videography",
    // },
    // {
    //   month: "AUG",
    //   day: "20",
    //   title: "Join Us For A Free Virtual Tour & Open Day",
    //   time: "7:00PM - 9:00PM",
    //   location: "Virtual",
    //   description:
    //     "Join us for a virtual tour and open day for our top 3 certification courses : Digital Marketing | Graphic Design | Photography & Videography",
    // },
  ];

  const pastEvents = [
    {
      month: "MARCH",
      day: "28",
      title: "Consumer Choice Awards Kenya",
      time: "6:00pm - 11:00pm",
      location: "Argyle Grand Hotel ",
      description:
        "Mediacrest Training College and Mediacrest Digital powered media and PR for the prestigious awards, ensuring strong coverage throughout the event.",
    },
     {
       month: "APRIL",
      day: "12",
      title: "Digital Marketing & Personal Branding",
       time: "12:00pm - 4:00pm",
       location: "HH Towers, Nairobi ",
       description:
         "The masterclass equipped participants with practical strategies for social media, content creation, and personal branding to boost their online presence.",
    },
     {
       month: "AUG",
       day: "20",
       title: "Join Us For A Free Virtual Tour & Open Day",
       time: "7:00PM - 9:00PM",
       location: "Virtual",
       description:
         "Our training tackled core digital marketing topics—from social media behavior to crisis management—empowering brands with timely, practical skills to thrive online.",
     },
  ];



  return (
   <div className="min-h-screen bg-white">
     
<Navbar/>
      {/* Hero Section */}
      <div
        className=" relative homeImg3 h-[300px] lg:h-[600px] bg-cover bg-center flex items-center justify-center mt-0 "
      ><img className="imgt" src= {Img1} alt="#" />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className=" eventsText relative flex flex-col items-center justify-center h-full text-center">
          <div className="flex flex-col items-center gap-[9px] w-[360px]">
            <h1 className="text-white font-bold text-5xl leading-[72px]">
              Events
            </h1>
            <nav className=" txtReg text-text-muted font-normal text-base leading-7 ">
              Home / About Us / Events
            </nav>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section className="w-full bg-white py-[80px] px-4 lg:px-[82px]">
        <div className="max-w-[1441px] mx-auto flex flex-col items-center gap-[52px]">
          {/* Section Title */}
          <div className="relative w-[308px] h-[67px] flex flex-col items-center">
            <h2 className="text-black font-semibold text-[32px] leading-[54px] text-center">
              Upcoming Events
            </h2>
            <svg
              className="absolute bottom-[18px] left-[190px]"
              width="118"
              height="5"
              viewBox="0 0 123 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.4148 5.29136C22.2941 2.46295 73.6963 -0.0993245 120.27 12.2788"
                stroke="#EB4823"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Events Grid */}
          <div className="flex flex-wrap justify-center gap-[10px] items-start max-w-[1200px]">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} {...event} showRegisterButton={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="w-full bg-[#F8F3F1] py-[80px] px-4 lg:px-[82px]">
        <div className="max-w-[1441px] mx-auto flex flex-col items-center gap-[52px]">
          {/* Section Title */}
          <div className="relative w-[308px] h-[67px] flex flex-col items-center">
            <h2 className="text-black font-semibold text-[32px] leading-[54px] text-center">
              Past Events
            </h2>
            <svg
              className="absolute bottom-[18px] left-[144px]"
              width="118"
              height="5"
              viewBox="0 0 122 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00074 5.29136C21.8801 2.46295 73.2823 -0.0993245 119.856 12.2788"
                stroke="#EB4823"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Events Grid */}
          <div className="flex flex-wrap justify-center gap-[10px] items-start max-w-[1200px]">
            {pastEvents.map((event, index) => (
              <EventCard key={index} {...event} showRegisterButton={false} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Events