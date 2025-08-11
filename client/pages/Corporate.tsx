import { Check, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import "../corporate.css";
import React from 'react'
 import Navbar from "../Component/Navbar";
 import Footer from "../Component/Footer";
 import { Link } from "react-router-dom";
 import Img3 from "../images/6d0f237c6385a360bd076f0d336ebe12796faa08.png"
const Corporate = () => {
  return (
        <div className="min-h-screen bg-white">
<Navbar />
      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center"
     
      ><img className="imgbg" src={Img3} alt="#" />
        <div className="absolute  bg-black" id="op"></div>
        <div className="relative max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl" id="herocontent">
            <h1
              className="text-2xl sm:text-xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(24px, 4vw, 47px)" }}
            >
Upskill Your Teams with Our Industry-Driven Digital Media, Technology & All Training Programs
            </h1>
            {/* <p className="CoText text-[15.6px] text-gray-200 mb-8 max-w-2xl leading-relaxed">
              We offer customized and open digital media and technology training
              programs designed to equip your teams with the skills needed to
              
import bgMobil from "../images/countypic.jpeg"
              thrive in a rapidly changing business environment. Mediacrest
              College bridges the global digital skills gap by equipping
              organizations with industry-driven training programs. We upskill
              and reskill corporate teams, ensuring they are prepared to thrive
              in the ever-evolving digital and tech landscape.
            </p> */}
    <Link to="/contact">
      <button className="btns bg-mediacrest-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-lg text-lg font-semibold">
        Get In Touch With Us
      </button>
    </Link>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
      Numbers That Showcase{" "}
      <span className="text-mediacrest-primary">Our Impact</span>
    </h2>
    <p className="text-xl text-black max-w-lg mx-auto">
      Tangible results that highlight our growth and the value we deliver.
    </p>
  </div>

  {/* Top Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <div className="allHover  border rounded-xl p-8 text-center shadow-sm  transition duration-300">
      <div className="text-4xl font-bold mb-4 
      ">500+</div>
      <h3 className="text-lg font-semibold mb-4">Employees Empowered</h3>
      <p className="text-sm">
        Professionals who have benefited from our training programs.
      </p>
    </div>

    <div className="allHover border rounded-xl p-8 text-center shadow-sm  transition duration-300">
      <div className="text-4xl font-bold text-mediacrest-primary mb-4">
        75%
      </div>
      <h3 className="text-lg font-semibold mb-4">Positive Job Outcomes</h3>
      <p className="text-sm">
        Ratio of trained staff that report positive job outcomes after our training.
      </p>
    </div>

    <div className="allHover border rounded-xl p-8 text-center shadow-sm transition duration-300">
      <div className="text-4xl font-bold text-mediacrest-primary mb-4">
        89%
      </div>
      <h3 className="text-lg font-semibold mb-4">Placement Rate</h3>
      <p className="text-sm">
        Our success rate in placing trained individuals in relevant roles.
      </p>
    </div>
  </div>

  {/* Bottom Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="allHover border rounded-xl p-8 text-center shadow-sm  transition duration-300">
      <div className="text-4xl font-bold text-mediacrest-primary mb-4">
        40+
      </div>
      <h3 className="text-lg font-semibold mb-4">Companies Trained</h3>
      <p className="text-sm">
        Organizations we've partnered with to upskill their teams.
      </p>
    </div>

    <div className="allHover border rounded-xl p-8 text-center shadow-sm  transition duration-300">
      <div className="text-4xl font-bold text-mediacrest-primary mb-4">
        12+
      </div>
      <h3 className="text-lg font-semibold mb-4">Courses Delivered</h3>
      <p className="text-sm">
        Technical skills courses successfully delivered across various industries.
      </p>
    </div>

    <div className="allHover  border rounded-xl p-8 text-center shadow-sm transition duration-300">
      <div className="text-4xl font-bold text-mediacrest-primary mb-4">
        7
      </div>
      <h3 className="text-lg font-semibold mb-4">Years of Operation</h3>
      <p className="text-sm">
        Experience delivering impactful and practical training solutions.
      </p>
    </div>
  </div>
</div>


      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-mediacrest-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Why <span className="text-mediacrest-primary">Choose</span>{" "}
                Mediacrest Training College?
              </h2>

              <div className="space-y-6">
                {[
                  "Curriculum developed in conjunction with employers",
                  "Industry expert trainers",
                  "Self-paced and Instructor delivery is available according to your needs",
                  "Dedicated project delivery support",
                  "Vendor agnostic",
                  "Both the company and individual participating team members receive a certificate of participation at the end of the program.",
                  "Practical hands-on skills learning through industry-relevant projects",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-mediacrest-primary/10 rounded-full p-2 flex-shrink-0">
                      <Check className="h-4 w-4 text-mediacrest-primary" />
                    </div>
                    <p className="text-black">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f41352aa0ee3e8630ddb6613c94670bf448c733?width=456"
                  alt="Training session"
                  className="rounded-xl w-full h-64 object-cover"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/178cd307a4210a8f1889d363d3825a4dfb62de22?width=766"
                  alt="Student learning"
                  className="rounded-xl w-full h-64 object-cover"
                />
              </div>
              <div className="space-y-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/11cdc4d7e3acb8623b67552ce20f473b2a44d7fc?width=536"
                  alt="Group training"
                  className="rounded-xl w-full h-96 object-cover"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5d8232d2fe69757f3121ae46283c032842f7ba5?width=458"
                  alt="Practical session"
                  className="rounded-xl w-full h-40 object-cover"
                />
              </div>
              <div className="space-y-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/15e6c5d6aedba3419089d7736ca841af79d81919?width=452"
                  alt="Collaboration"
                  className="rounded-xl w-full h-40 object-cover"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/738d91c545e381679200a47d0cf81798f77025f6?width=448"
                  alt="Individual learning"
                  className="rounded-xl w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Clients */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black relative inline-block">
              Our Corporate Clients
              <svg
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                width="118"
                height="15"
                viewBox="0 0 118 15"
                fill="none"
              >
                <path
                  d="M1.99878 5.29136C21.235 2.42482 70.9649 -0.236599 115.995 12.05"
                  stroke="#EB4823"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
            {[
              "https://cdn.builder.io/api/v1/image/assets/TEMP/694f28800d9a49bde95efb3f159a85357cc3d7a3?width=236",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/e271babd4bac43dddb017379bfb1595e918de48a?width=192",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/4889c5b1db4151ab94b5d75d1e5ebf9beea97ae2?width=262",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/0e59e76a88a818529652e85201a14ca5584c878b?width=210",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/8170fb6b2ebcd9a6a813797891dafbaeaec49e6f?width=152",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/456034663b083586c750d1b6b781bf4c0d90a4cc?width=216",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/5ffc5877e464a0ad8ed88c00b79b15c4d1648e3b?width=170",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/29e2b630491b1784021f3adc5524811d59d05af2?width=86",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/d996c7f7e5c711659445a394f715af1414742479?width=94",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/435e7426026f9d2b61f766f8fb1a28465f89f580?width=176",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/23153f560424f913559667e26da820d55224ee67?width=126",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/b8744810aaeed57a93588abd07709149079409b9?width=76",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/58a329c57bf723d377f5228d816fae4e239c2347?width=238",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/2861d16c278b77df3def7e86110c571376f4ee38?width=272",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/851b2251bdce2a71b1123a2a62fb35cd559c0dfc?width=344",
              "https://cdn.builder.io/api/v1/image/assets/TEMP/48c345ea5d69af2a5ea79e3eecf735b8f2ad209f?width=260",
            ].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Client ${index + 1}`}
                className="h-10 w-auto transition-all"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-mediacrest-orangebg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-mediacrest-text-dark">
              Clients' Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-3xl p-8">
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/375f095f2dc39aa3ceb1ecc175f5deb1b12ae2f8?width=168"
                  alt="Nerea Okoth"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-black text-lg">Nerea Okoth</h4>
                  <p className="text-sm ">
                    Customer Experience Manager
                    <br />
                    RFH Healthcare Group
                  </p>
                </div>
                <svg
                  className="w-8 h-6 text-mediacrest-orange flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 30 23"
                >
                  <path d="M8.33333 0.5H5C2.24289 0.5 0 2.61472 0 5.21429V8.35714C0 10.9567 2.24289 13.0714 5 13.0714H8.33333C8.86844 13.0714 9.37444 12.971 9.85822 12.8234C9.18622 16.5245 5.78233 19.3571 1.66667 19.3571C0.745444 19.3571 0 20.06 0 20.9286C0 21.7972 0.745444 22.5 1.66667 22.5C8.099 22.5 13.3333 17.5648 13.3333 11.5V5.21429C13.3333 2.61472 11.0904 0.5 8.33333 0.5ZM25 0.5H21.6667C18.9096 0.5 16.6667 2.61472 16.6667 5.21429V8.35714C16.6667 10.9567 18.9096 13.0714 21.6667 13.0714H25C25.5351 13.0714 26.0411 12.971 26.5249 12.8234C25.8529 16.5245 22.449 19.3571 18.3333 19.3571C17.4121 19.3571 16.6667 20.06 16.6667 20.9286C16.6667 21.7972 17.4121 22.5 18.3333 22.5C24.7657 22.5 30 17.5648 30 11.5V5.21429C30 2.61472 27.7571 0.5 25 0.5Z" />
                </svg>
              </div>
              <p className=" text-sm leading-relaxed">
                The training was insightful, practical and highly relevant to
                the challenges we face in today's rapidly evolving healthcare
                environment. Our team gained valuable skills and strategies that
                have already begun to enhance how we engage with our patients
                and stakeholders. We appreciate Mediacrest's professionalism and
                expertise and we look forward to future collaborations to
                further strengthen our customer experience capabilities.
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="TestT bg-white rounded-3xl p-8" >
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1546f06dee127976097420d9e265eb869c2e37a?width=284"
                  alt="Allan Ratemo"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-black text-lg">Allan Ratemo</h4>
                  <p className="text-sm">
                    Head of Corporate Communications
                    <br />
                    Access Bank Kenya PLC
                  </p>
                </div>
                <svg
                  className="w-8 h-6 text-mediacrest-orange flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 30 22"
                >
                  <path d="M8.33333 0H5C2.24289 0 0 2.11472 0 4.71429V7.85714C0 10.4567 2.24289 12.5714 5 12.5714H8.33333C8.86844 12.5714 9.37444 12.471 9.85822 12.3234C9.18622 16.0245 5.78233 18.8571 1.66667 18.8571C0.745444 18.8571 0 19.56 0 20.4286C0 21.2972 0.745444 22 1.66667 22C8.099 22 13.3333 17.0648 13.3333 11V4.71429C13.3333 2.11472 11.0904 0 8.33333 0ZM25 0H21.6667C18.9096 0 16.6667 2.11472 16.6667 4.71429V7.85714C16.6667 10.4567 18.9096 12.5714 21.6667 12.5714H25C25.5351 12.5714 26.0411 12.471 26.5249 12.3234C25.8529 16.0245 22.449 18.8571 18.3333 18.8571C17.4121 18.8571 16.6667 19.56 16.6667 20.4286C16.6667 21.2972 17.4121 22 18.3333 22C24.7657 22 30 17.0648 30 11V4.71429C30 2.11472 27.7571 0 25 0Z" />
                </svg>
              </div>
              <p className=" text-sm leading-relaxed">
                Joining Mediacrest Training College was one of the best
                decisions I've ever made. The Software Engineering course was
                not only comprehensive but also incredibly practical. I gained
                skills and confidence to launch my tech career. Today, I'm
                working as a Full Stack Developer in one of the leading tech
                companies in Kenya, thanks to the solid foundation I got. I
                highly recommend Mediacrest Training College! We look forward to
                continuing this partnership as we build stronger, more agile
                marketing and communications teams equipped to meet the evolving
                demands of the financial sector.
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-3xl p-8">
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6949e79f5defc0171c42205cdca3397ea978cd5a?width=166"
                  alt="Diane Onditi"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-black text-lg">Diane Onditi</h4>
                  <p className="text-sm">
                    Marketing & Business Development
                    <br />
                    KNCCI
                  </p>
                </div>
                <svg
                  className="w-8 h-6 text-mediacrest-orange flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 30 22"
                >
                  <path d="M8.33333 0H5C2.24289 0 0 2.11472 0 4.71429V7.85714C0 10.4567 2.24289 12.5714 5 12.5714H8.33333C8.86844 12.5714 9.37444 12.471 9.85822 12.3234C9.18622 16.0245 5.78233 18.8571 1.66667 18.8571C0.745444 18.8571 0 19.56 0 20.4286C0 21.2972 0.745444 22 1.66667 22C8.099 22 13.3333 17.0648 13.3333 11V4.71429C13.3333 2.11472 11.0904 0 8.33333 0ZM25 0H21.6667C18.9096 0 16.6667 2.11472 16.6667 4.71429V7.85714C16.6667 10.4567 18.9096 12.5714 21.6667 12.5714H25C25.5351 12.5714 26.0411 12.471 26.5249 12.3234C25.8529 16.0245 22.449 18.8571 18.3333 18.8571C17.4121 18.8571 16.6667 19.56 16.6667 20.4286C16.6667 21.2972 17.4121 22 18.3333 22C24.7657 22 30 17.0648 30 11V4.71429C30 2.11472 27.7571 0 25 0Z" />
                </svg>
              </div>
              <p className=" text-sm leading-relaxed">
                The trainers demonstrated deep knowledge and practical insights,
                engaging our marketing team with relevant digital and media
                strategies and hands-on approaches that are already translating
                into improved campaign performance and more effective
                communication on our marketing initiatives. Keep up the great
                work!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    <Footer/>
    </div>
  )
}

export default Corporate