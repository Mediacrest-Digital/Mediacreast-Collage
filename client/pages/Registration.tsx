import React from 'react'
import "../index.css"
import Footer from "@/Component/Footer";
import { ChevronDown } from "lucide-react";
import { useState } from "react";;;
import BgImg from "../images/registrationimg.jpeg";
import Navbar from "../Component/Navbar"
const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    program: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };


  return (
 <div className="min-h-screen bg-white">
 {/* {call navbar} */}
<Navbar/>
      {/* Hero Section */}
      <div className="relative h-[300px] lg:h-[600px] bg-cover bg-center flex items-center  mt-0 ">
       
        <img className='imgt w-full h-full object-cover opacity-80' src={BgImg} alt="#"  />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative flex items-center h-full px-4 lg:px-[81px]">
          <div className="txtReg flex flex-col gap-[23px] max-w-[548px]" >
            <h1 className="text-white font-bold text-3xl lg:text-5xl leading-tight lg:leading-[60px]">
              Free Virtual Tour & Open Day
            </h1>
            <p className="text-[#D8D8D8] font-normal text-lg lg:text-xl leading-relaxed lg:leading-[31px] max-w-[548px]">
              Join us for a virtual tour and open day for our top 3
              certification courses : Digital Marketing | Graphic Design |
              Photography & Videography
            </p>
          </div>
        </div>
      </div>

      {/* Registration Section */}
      <section className="w-full bg-white py-[68px] px-4 lg:px-[82px]">
        <div className="max-w-[1441px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-[40px] p-9 bg-[#F8F3F1] border-2 border-[#EFDDD5] rounded-xl">
            {/* Left Side - Promotional Image */}
            <div className="w-full lg:w-[451px] h-[451px] flex-shrink-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4ff1068d769e853d2302a2d762af3bca974b2ba?width=902"
                alt="Event Promotion"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Right Side - Registration Form */}
            <div className="flex flex-col gap-[17px] w-full">
              <h2 className="text-black font-bold text-2xl lg:text-[28px] leading-[54px] capitalize bg-orange">
                Register for the event
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="flex flex-col gap-[18px] w-full max-w-[727px]">
                  {/* First Name & Last Name Row */}
                  <div className="flex flex-col lg:flex-row gap-[18px]">
                    <div className="flex flex-col gap-[5px] flex-1">
                      <label className="text-[#5E5E5E] font-medium text-sm leading-[26px]">
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter First Name"
                          className="w-full h-[53px] px-[14px] border border-[rgba(145,158,171,0.32)] rounded-lg text-sm placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[5px] flex-1">
                      <label className="text-[#5E5E5E] font-medium text-sm leading-[26px]">
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter Last Name"
                          className="w-full h-[53px] px-[14px] border border-[rgba(145,158,171,0.32)] rounded-lg text-sm placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="flex flex-col lg:flex-row gap-[18px]">
                    <div className="flex flex-col gap-[5px] flex-1">
                      <label className="text-[#5E5E5E] font-medium text-sm leading-[26px]">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter Email Address"
                          className="w-full h-[53px] px-[14px] border border-[rgba(145,158,171,0.32)] rounded-lg text-sm placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[5px] flex-1">
                      <label className="text-[#5E5E5E] font-medium text-sm leading-[26px]">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter Phone Number"
                          className="w-full h-[53px] px-[14px] border border-[rgba(145,158,171,0.32)] rounded-lg text-sm placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Certification Program Dropdown */}
                  <div className="flex flex-col gap-[5px]">
                    <label className="text-[#5E5E5E] font-medium text-sm leading-[26px]">
                      Which Certification Program will make the most difference
                      in your career right now?
                    </label>
                    <div className="relative">
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="w-full h-[53px] px-[14px] border border-[rgba(145,158,171,0.32)] rounded-lg text-sm text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-brand-orange appearance-none bg-white"
                      >
                        <option value="">Select</option>
                        <option value="digital-marketing">
                          Digital Marketing
                        </option>
                        <option value="graphic-design">Graphic Design</option>
                        <option value="photography-videography">
                          Photography & Videography
                        </option>
                        <option value="software-engineering">
                          Software Engineering
                        </option>
                        <option value="data-science">Data Science</option>
                        <option value="cyber-security">Cyber Security</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[#9F9A9E] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-brand-orange text-white font-semibold text-[15px] leading-[26px] px-[22px] py-[11px] rounded-lg bg-orange-600 transition-colors w-[159px]"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>


   
  )
}

export default Registration