import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Img3 from "../images/whoare.jpeg";
import Navbar from "../Component/Navbar";
import "../global.css"
import Footer from "@/Component/Footer";
import {Link} from "react-router-dom"
import "../weare.css"

export default function Weare() {
  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Navigation Bar */}
         <Navbar/>
      {/* Hero Section */}
      {/* <section
        className="relative  h-[300px] lg:h-[600px] bg-cover bg-center flex items-center justify-center mt-0 " id="hero-section"

      >
        <img className="imgt w-full h-full object-cover opacity-100" src={Img3} alt="#"/>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4"></h1>
          <p className="text-gray-300 text-sm lg:text-base">
          </p>
        </div>
      </section> */}

      {/* About Section */}
  <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Images Section - Left Side */}
          <div className="relative order-1 lg:order-1">
            {/* Orange curved element top left - hidden on small screens */}
            <div className="hidden sm:block absolute -top-4 sm:-top-6 lg:-top-8 -left-4 sm:-left-6 lg:-left-8 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-orange-500 rounded-full opacity-80"></div>
            
            {/* Main image collage */}
            <div className="relative bg-white p-3 sm:p-4 rounded-lg">
              {/* Main image */}
              <div className="relative mb-3 sm:mb-4">
                <img
                  src={Img3}
                  alt="Students at Mediacrest"
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-full object-cover"
                />
                
                {/* Empowering Growth banner */}
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-red-500 text-white px-2 sm:px-3 py-1  text-xs sm:text-sm font-bold shadow-lg">
                  <div className="leading-tight">
                    Empowering Growth.<br />
                    Shaping Futures.
                  </div>
                </div>
              </div>
              
              {/* Yellow decorative triangles */}
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 transform rotate-45"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 transform rotate-45"></div>
              </div>
            </div>
            
            {/* Bottom right image - responsive positioning and sizing */}
            {/* <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 -right-4 sm:-right-6 lg:-right-8 w-48 h-36 sm:w-64 sm:h-72 md:w-72 md:h-54 lg:w-96 lg:h-96">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c5850af856ccda951a030a13ed13f674c749f46?width=696"
                alt="Student with laptop wearing Mediacrest hoodie"
                className="w-full h-full object-cover  shadow-lg border-24 sm:border-4 border-white"
              />
            </div> */}
            
            {/* Orange and gray decorative squares bottom - responsive sizing and positioning */}
            <div className="absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 left-4 sm:left-6 lg:left-8 flex space-x-1 sm:space-x-2">
              <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-orange-500"></div>
              <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gray-400"></div>
            </div>
          </div>

          {/* Content Section - Right Side */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 pt-4 sm:pt-6 lg:pt-8 order-2 lg:order-2">
            {/* WHO WE ARE badge */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500"></div>
              <span className="text-orange-500 uppercase text-xs sm:text-sm font-medium tracking-wide">
                WHO WE ARE
              </span>
            </div>

            {/* Main heading - responsive text sizing */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              About <span className="text-orange-500">Mediacrest</span> Training College
            </h2>

            {/* First paragraph - responsive text sizing */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Mediacrest Training College is a premier private learning institution located at Office 
              Suites Block B, along Parklands Road – Nairobi, Kenya. The college is a dynamic hub 
              for aspiring digital media, marketing, communications and technology professionals, 
              dedicated to shaping Africa's next generation of creative talent. With a wide range of 
              market-aligned training programs and courses, the college equips students with the 
              practical skills, knowledge and innovative mindset needed to excel in today's fast-
              evolving digital landscape.
            </p>

            {/* Second paragraph - responsive text sizing */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Mediacrest Training College offers specialized courses in areas like digital marketing, 
              multimedia design, photography and videography, graphic design, software engineering, 
              data science, cybersecurity and information technology, ensuring that graduates are 
              prepared for both local and global opportunities. The college focuses on hands-on 
              training, real-world industry insights and cutting-edge technology, empowering students 
              to be adaptable, creative, and forward-thinking professionals. As a creative house, the 
              college fosters an environment where passion meets purpose, blending technical 
              proficiency with artistic expression. With experienced faculty, modern facilities and 
              strong industry connections, the college is committed to molding Africa's brightest 
              minds, helping them to thrive in competitive fields.
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* Mission & Vision */}
      <section className="py-12 lg:py-16 px-4 lg:px-16 bg-mediacrest-bg-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mission Card */}
            <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
                <div className="w-16 h-16 flex items-center justify-center bg-[#FFF4EF] rounded-2xl">
             <svg
  className="w-8 h-8 lg:w-9 lg:h-9"
  viewBox="0 0 37 37"
  fill="#EB4823"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M35.375 9.9082C35.375 9.4582 35.15 9.1207 34.8125 8.8957L26.9375 4.3957C26.7125 4.2832 26.6 4.2832 26.375 4.2832C26.15 4.2832 26.0375 4.2832 25.8125 4.3957L18.5 8.5582L11.1875 4.3957C10.9625 4.2832 10.85 4.2832 10.625 4.2832C10.4 4.2832 10.2875 4.2832 10.0625 4.3957L2.1875 8.8957C1.85 9.1207 1.625 9.4582 1.625 9.9082V32.4082C1.625 33.0832 2.075 33.5332 2.75 33.5332C2.975 33.5332 3.0875 33.4207 3.3125 33.4207L10.625 29.2582L17.9375 33.4207C18.1625 33.5332 18.275 33.5332 18.5 33.5332C18.725 33.5332 18.8375 33.5332 19.0625 33.4207L26.375 29.2582L33.6875 33.4207C33.8 33.5332 34.025 33.5332 34.25 33.5332C34.925 33.5332 35.375 33.0832 35.375 32.4082V9.9082Z" />
</svg>

                </div>
                <div className="flex-1 space-y-3 lg:space-y-5">
                  <h3 className="text-xl lg:text-2xl font-medium text-mediacrest-dark">
                    Our Mission
                  </h3>
                  <p className="text-mediacrest-text-medium text-sm leading-relaxed">
                    To empower the next generation of digital media,
                    communications and technology professionals with the skills,
                    creativity and knowledge needed to thrive in a rapidly
                    evolving industries.
                  </p>
                  <p className="text-mediacrest-text-medium text-sm leading-relaxed">
                    We are committed to providing a dynamic, inclusive and
                    innovative learning environment that fosters critical
                    thinking and hands-on experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
                <div className="bg-orange-50 p-4 lg:p-5 rounded-lg flex-shrink-0">
                  <svg
                    className="w-8 h-8 lg:w-9 lg:h-9 text-mediacrest-primary"
                    viewBox="0 0 37 37"
                    fill="currentColor"
                  >
                    <path d="M31.1833 6.22498L34.9543 6.97873C35.1567 7.01923 35.3232 7.16773 35.3818 7.36798C35.4113 7.46525 35.4139 7.56871 35.3894 7.66737C35.3648 7.76602 35.314 7.85616 35.2423 7.92823L32.153 11.0197C31.7828 11.3878 31.2823 11.5948 30.7603 11.5957H28.1975L21.7625 18.033C21.8853 18.4965 21.9078 18.9809 21.8287 19.4539C21.7496 19.9268 21.5706 20.3775 21.3037 20.7759C21.0367 21.1742 20.6879 21.5111 20.2806 21.7641C19.8732 22.0171 19.4166 22.1804 18.9412 22.2431C18.4658 22.3058 17.9825 22.2664 17.5235 22.1277C17.0644 21.9889 16.6403 21.754 16.2792 21.4384C15.9181 21.1229 15.6284 20.734 15.4294 20.2977C15.2303 19.8614 15.1266 19.3878 15.125 18.9082C15.1249 18.3903 15.244 17.8794 15.473 17.4149C15.7021 16.9504 16.0349 16.5448 16.4459 16.2296C16.8568 15.9144 17.3347 15.698 17.8427 15.5971C18.3507 15.4963 18.8751 15.5137 19.3752 15.648L25.8125 9.20848V6.65023C25.8125 6.12823 26.0195 5.62648 26.3885 5.25748L29.48 2.16598C29.5521 2.09427 29.6422 2.04343 29.7409 2.01886C29.8395 1.9943 29.943 1.99693 30.0402 2.02648C30.2405 2.08498 30.389 2.25148 30.4295 2.45398L31.1833 6.22498Z" />
                  </svg>
                </div>
                <div className="flex-1 space-y-3 lg:space-y-5">
                  <h3 className="text-xl lg:text-2xl font-medium text-mediacrest-dark">
                    Our Vision
                  </h3>
                  <p className="text-mediacrest-text-medium text-sm leading-relaxed">
                    To become a world-class institution that empowers students
                    with cutting-edge skills, innovative thinking ethical
                    foundations in digital media, communications, and
                    technology.
                  </p>
                  <p className="text-mediacrest-text-medium text-sm leading-relaxed">
                    We aim to cultivate a diverse community of creative
                    professionals and technologists who drive positive change,
                    influence global media landscapes, and shape the future of
                    digital communication through a commitment to excellence,
                    collaboration, and lifelong learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidiaries Section */}
      <section className="py-16 px-4 lg:px-16 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Our Subsidiaries
            </h2>
            <div className="relative inline-block">
              {/* <svg
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                width="206"
                height="5"
                viewBox="0 0 210 15"
                fill="none"
              >
                <path
                  d="M2.04669 3.87312C36.5353 1.32076 126.004 -0.51961 207.969 12.5378"
                  stroke="#EB4823"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Mediacrest Digital */}
            <div className="bg-white p-10 rounded-lg border-b-8 border-mediacrest-orangeFR ">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/81c436c7dfb7163944db7905529fd42614c21639?width=264"
                alt="Mediacrest Digital"
                className="h-20 w-auto mb-8"
              />
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-mediacrest-dark">
                  Mediacrest Digital
                </h3>
                <p className="text-mediacrest-text-medium text-sm leading-relaxed">
                  Helps brands build authentic, meaningful and impactful
                  narratives in the digital space. Mediacrest Digital
                  collaborates with brands and individuals to create purposeful
                  work that harnesses creativity and culture to impact business.
                </p>
                
                <Link to="https://www.mediacrest.africa" className="lg:w-[200px] flex items-center space-x-2 px-6 py-3 border border-mediacrest-orange text-mediacrest-orange rounded-lg hover:bg-mediacrest-orange hover:text-white transition-colors font-semibold">
                  <span>Visit Website</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Mediacrest Foundation */}
            <div className="bg-white p-10 rounded-lg border-b-8 border-mediacrest-blue ">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/90d0e7b91e6d98099e89a1059f4a9a7f4185c23d?width=158"
                alt="Mediacrest Foundation"
                className="h-20 w-auto mb-8"
              />
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-mediacrest-dark">
                  Mediacrest Foundation
                </h3>
                <p className="text-mediacrest-text-medium text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Orci vulputate at
                  euismod nibh amet molestie gravida vel. Facilisi tellus tellus
                  volutpat habitant cum scelerisque donec egestas massa.
                  Maecenas ultrices felis tempus aliquam. Nam quis nunc volutpat
                  eleifend.
                </p>
                <Link to="" className="lg:w-[200px] flex items-center space-x-2 px-6 py-3 border border-mediacrest-blue text-mediacrest-blue rounded-lg hover:bg-mediacrest-blue hover:text-white transition-colors font-semibold">
                  <span>Visit Website</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Consumer Champions Awards */}
            <div className="bg-white p-10 rounded-lg border-b-8 border-mediacrest-purple border-opacity-50">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f3a53a3855540172d55eca84307c46d8aa45fb2?width=414"
                alt="Consumer Champions Awards"
                className="h-20 w-auto mb-8"
              />
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-mediacrest-dark">
                  Consumer Champions Awards
                </h3>
                <p className="text-mediacrest-text-medium text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Facilisis tincidunt
                  sed faucibus vulputate dignissim at at in. Duis odio morbi
                  malesuada sit sapien nec nisl porta. Ut amet mauris fermentum
                  non eu amet. Duis odio morbi malesuada sit sapien nec nisl
                  porta.
                </p>
                <Link to="https://ccawardskenya.co.ke" className=" lg:w-[200px] flex items-center space-x-2 px-6 py-3 border border-mediacrest-purple text-mediacrest-purple rounded-lg hover:bg-mediacrest-purple hover:text-white transition-colors font-semibold">
                  <span>Visit Website</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 lg:px-16 bg-mediacrest-orangebg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            Our core values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Innovation */}
            <ValueCard
              icon={<InnovationIcon />}
              title="Innovation"
              description="We encourage creative thinking and embrace cutting-edge technologies to equip our students with the ability to solve real-world problems in dynamic and forward-thinking ways."
            />

            {/* Excellence */}
            <ValueCard
              icon={<ExcellenceIcon />}
              title="Excellence"
              description="We pursue the highest standards in education, creativity, and professional development. It reflects our commitment to delivering exceptional training, ensuring that students not only meet but exceed industry expectations."
            />

            {/* Integrity */}
            <ValueCard
              icon={<IntegrityIcon />}
              title="Integrity"
              description="We uphold ethical practices and professionalism in all aspects of our operations. Integrity that resembles the very high standards of ethical behaviour and high moral character."
            />

            {/* Collaboration */}
            <ValueCard
              icon={<CollaborationIcon />}
              title="Collaboration"
              description="The college fosters an environment where students, faculty and industry partners work together to solve problems, exchange ideas, and create innovative solutions."
            />

            {/* Student Centricity */}
            <ValueCard
              icon={<StudentCentricityIcon />}
              title="Student Centricity"
              description="Student Centricity emphasizes on putting students at the heart of everything the institution does. This means prioritizing their learning experiences, personal development and career readiness."
            />

            {/* Community */}
            <ValueCard
              icon={<CommunityIcon />}
              title="Community"
              description="We are committed to making a positive impact on the community through service and engagement."
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 px-4 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-mediacrest-dark mb-4 lg:mb-6 leading-tight">
              The Team Empowering Growth and Shaping the Future of Digital Media
              & Technology in Africa and beyond.
            </h2>
            <p className="text-lg lg:text-xl text-mediacrest-dark font-medium max-w-4xl mx-auto">
              Our organization is led by a team of experienced professionals who
              are passionate about digital media and technology education.
            </p>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {/* First Row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <TeamMemberCard
                image="https://cdn.builder.io/api/v1/image/assets/TEMP/3effaadd2fd7435471abca1c7aa1aa0d0860f097?width=696"
                name="Micah Langat"
                position="College Principal"
              />
                 <TeamMemberCard
                image="https://cdn.builder.io/api/v1/image/assets/TEMP/b5726fae917eda34c39be8ad035231788d011d80?width=700"
                name="Humphrey Otwande"
                position="Head of Faculty - Digital Media & Technology"
              />
            
            </div>

            {/* Second Row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
           
              {/* <TeamMemberCard
                image="https://cdn.builder.io/api/v1/image/assets/TEMP/9a2489538846b4ff7238963a904dac25e5471b1c?width=696"
                name="Vincent Adam"
                position="Head of Faculty - Media Production"
              />
              <TeamMemberCard
                image="https://cdn.builder.io/api/v1/image/assets/TEMP/ac91c3ed5474187531d33622c7fe08f788c06e3b?width=696"
                name="Essy Wawira"
                position="Creative Arts"
              /> */}
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
 <Footer/>
    </div>
  );
}

// Value Card Component
function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 lg:p-10 rounded-lg text-center">
      <div className="relative mb-6 lg:mb-8">
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto relative">
          <div className="absolute -inset-2 border border-dashed border-red-600 rounded-full"></div>
          {icon}
        </div>
      </div>
      <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-5">
        {title}
      </h3>
      <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// Team Member Card Component
function TeamMemberCard({
  image,
  name,
  position,
}: {
  image: string;
  name: string;
  position: string;
}) {
  return (
    <div className="text-center"> 
      <div className="w-full max-w-80 h-64 lg:h-80 bg-gray-200 rounded-xl overflow-hidden mb-4 mx-auto">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg lg:text-xl font-medium text-mediacrest-dark mb-2">
        {name}
      </h3>
      <p className="text-sm lg:text-base text-gray-500">{position}</p>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6 text-white">
        <h3 className="text-lg lg:text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-xs lg:text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// Icon Components
function InnovationIcon() {
  return (
    <svg
      className="w-12 h-12 text-white"
      viewBox="0 0 48 49"
      fill="currentColor"
    >
      <path
        d="M10.286 28.9082C8.78535 26.4507 7.99414 23.6257 8.00003 20.7462C8.00003 11.9982 15.164 4.9082 24 4.9082C32.836 4.9082 40 11.9982 40 20.7462C40.0059 23.6257 39.2147 26.4507 37.714 28.9082M30 38.9082L29.74 40.2022C29.46 41.6162 29.318 42.3222 29 42.8822C28.51 43.7453 27.7166 44.3954 26.774 44.7062C26.164 44.9082 25.44 44.9082 24 44.9082C22.56 44.9082 21.836 44.9082 21.226 44.7082C20.2831 44.3969 19.4897 43.7461 19 42.8822C18.682 42.3222 18.54 41.6162 18.26 40.2022L18 38.9082M14.766 35.1042C14.582 34.5522 14.49 34.2742 14.5 34.0502C14.5113 33.8186 14.5895 33.5952 14.7251 33.4071C14.8607 33.219 15.0479 33.0742 15.264 32.9902C15.472 32.9082 15.764 32.9082 16.344 32.9082H31.656C32.238 32.9082 32.528 32.9082 32.736 32.9882C32.9525 33.0723 33.1399 33.2174 33.2755 33.4059C33.4111 33.5944 33.4891 33.8182 33.5 34.0502C33.51 34.2742 33.418 34.5502 33.234 35.1042C32.894 36.1262 32.724 36.6382 32.462 37.0522C31.914 37.9174 31.055 38.5395 30.062 38.7902C29.586 38.9082 29.05 38.9082 27.976 38.9082H20.024C18.95 38.9082 18.412 38.9082 17.938 38.7882C16.9454 38.538 16.0864 37.9167 15.538 37.0522C15.276 36.6382 15.106 36.1262 14.766 35.1042Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExcellenceIcon() {
  return (
    <svg
      className="w-12 h-12 text-white"
      viewBox="0 0 48 49"
      fill="currentColor"
    >
      <path
        d="M24.0007 26.9082V36.9082M12.0007 44.9082H36.0007M26.0747 6.64222L28.1847 10.9002C28.4727 11.4922 29.2407 12.0602 29.8887 12.1702L33.7167 12.8102C36.1647 13.2222 36.7407 15.0122 34.9767 16.7802L32.0007 19.7802C31.4967 20.2882 31.2207 21.2682 31.3767 21.9702L32.2287 25.6822C32.9007 28.6222 31.3527 29.7602 28.7727 28.2222L25.1867 26.0822C24.5387 25.6942 23.4707 25.6942 22.8107 26.0822L19.2227 28.2222C16.6547 29.7602 15.0947 28.6102 15.7667 25.6822L16.6187 21.9682C16.7747 21.2682 16.4987 20.2882 15.9947 19.7802L13.0187 16.7802C11.2667 15.0122 11.8307 13.2222 14.2787 12.8102L18.1067 12.1702C18.7427 12.0602 19.5107 11.4922 19.7987 10.9002L21.9107 6.64021C23.0627 4.33021 24.9347 4.33021 26.0747 6.64021M16.0007 42.9082C16.0007 40.0802 16.0007 38.6662 16.8807 37.7882C17.7567 36.9082 19.1707 36.9082 22.0007 36.9082H26.0007C28.8287 36.9082 30.2427 36.9082 31.1207 37.7882C32.0007 38.6662 32.0007 40.0802 32.0007 42.9082V44.9082H16.0007V42.9082Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IntegrityIcon() {
  return (
    <svg
      className="w-12 h-12 text-white"
      viewBox="0 0 48 49"
      fill="currentColor"
    >
      <path
        d="M4 40.9082V38.9082C4 35.1952 5.475 31.6342 8.1005 29.0087C10.726 26.3832 14.287 24.9082 18 24.9082"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.6089 25.5363C31.9125 25.204 32.282 24.9386 32.6938 24.757C33.1056 24.5755 33.5508 24.4817 34.0009 24.4817C34.451 24.4817 34.8961 24.5755 35.308 24.757C35.7198 24.9386 36.0893 25.204 36.3929 25.5363C37.0429 26.2483 37.9729 26.6343 38.9369 26.5883C39.3867 26.5678 39.8359 26.6413 40.2557 26.8041C40.6756 26.967 41.0568 27.2155 41.3753 27.5339C41.6937 27.8523 41.9422 28.2336 42.105 28.6535C42.2678 29.0733 42.3414 29.5225 42.3209 29.9723C42.2749 30.9343 42.6609 31.8663 43.3729 32.5163C44.7829 33.8003 44.7829 36.0163 43.3729 37.3003C42.6609 37.9503 42.2749 38.8803 42.3209 39.8443C42.3414 40.2941 42.2678 40.7433 42.105 41.1631C41.9422 41.583 41.6937 41.9643 41.3753 42.2827C41.0568 42.6011 40.6756 42.8496 40.2557 43.0124C39.8359 43.1753 39.3867 43.2488 38.9369 43.2283C38.4616 43.2061 37.9873 43.2889 37.5476 43.4707C37.1079 43.6525 36.7137 43.9289 36.3929 44.2803C36.0893 44.6126 35.7198 44.878 35.308 45.0596C34.8961 45.2411 34.451 45.3349 34.0009 45.3349C33.5508 45.3349 33.1056 45.2411 32.6938 45.0596C32.282 44.878 31.9125 44.6126 31.6089 44.2803C31.2881 43.9289 30.8938 43.6525 30.4542 43.4707C30.0145 43.2889 29.5401 43.2061 29.0649 43.2283C28.615 43.2488 28.1659 43.1753 27.746 43.0124C27.3262 42.8496 26.9449 42.6011 26.6265 42.2827C26.3081 41.9643 26.0595 41.583 25.8967 41.1631C25.7339 40.7433 25.6604 40.2941 25.6809 39.8443C25.7028 39.3689 25.6198 38.8944 25.4376 38.4548C25.2554 38.0151 24.9786 37.6209 24.6269 37.3003C24.2946 36.9967 24.0292 36.6272 23.8476 36.2154C23.666 35.8035 23.5723 35.3584 23.5723 34.9083C23.5723 34.4582 23.666 34.0131 23.8476 33.6012C24.0292 33.1894 24.2946 32.8199 24.6269 32.5163C25.3409 31.8663 25.7269 30.9363 25.6809 29.9723C25.6604 29.5225 25.7339 29.0733 25.8967 28.6535C26.0595 28.2336 26.3081 27.8523 26.6265 27.5339C26.9449 27.2155 27.3262 26.967 27.746 26.8041C28.1659 26.6413 28.615 26.5678 29.0649 26.5883C30.0269 26.6343 30.9589 26.2483 31.6089 25.5343V25.5363Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M30.728 34.9082L32.908 37.0882L37.272 32.7282M18 24.9082C20.1217 24.9082 22.1566 24.0653 23.6569 22.5651C25.1571 21.0648 26 19.0299 26 16.9082C26 14.7865 25.1571 12.7516 23.6569 11.2513C22.1566 9.75106 20.1217 8.9082 18 8.9082C15.8783 8.9082 13.8434 9.75106 12.3431 11.2513C10.8429 12.7516 10 14.7865 10 16.9082C10 19.0299 10.8429 21.0648 12.3431 22.5651C13.8434 24.0653 15.8783 24.9082 18 24.9082Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CollaborationIcon() {
  return (
    <svg
      className="w-12 h-12 text-white"
      viewBox="0 0 108 109"
      fill="currentColor"
    >
      <rect x="9" y="9.9082" width="90" height="90" rx="45" fill="#CA3C1B" />
      <rect
        x="0.5"
        y="1.4082"
        width="107"
        height="107"
        rx="53.5"
        stroke="#CA3C1B"
        strokeDasharray="3 2"
      />
      <path
        d="M40.7136 40.7642C42.1336 40.7642 43.2847 39.6131 43.2847 38.1931C43.2847 36.7732 42.1336 35.6221 40.7136 35.6221C39.2937 35.6221 38.1426 36.7732 38.1426 38.1931C38.1426 39.6131 39.2937 40.7642 40.7136 40.7642Z"
        fill="white"
      />
      <path
        d="M70.7039 48.7551C72.1238 48.7551 73.2749 47.604 73.2749 46.1841C73.2749 44.7641 72.1238 43.613 70.7039 43.613C69.2839 43.613 68.1328 44.7641 68.1328 46.1841C68.1328 47.604 69.2839 48.7551 70.7039 48.7551Z"
        fill="white"
      />
    </svg>
  );
}

function StudentCentricityIcon() {
  return (
    <svg
      className="w-12 h-12 text-white"
      viewBox="0 0 48 49"
      fill="currentColor"
    >
      <path
        d="M24.0007 26.9082V36.9082M12.0007 44.9082H36.0007M26.0747 6.64222L28.1847 10.9002C28.4727 11.4922 29.2407 12.0602 29.8887 12.1702L33.7167 12.8102C36.1647 13.2222 36.7407 15.0122 34.9767 16.7802L32.0007 19.7802C31.4967 20.2882 31.2207 21.2682 31.3767 21.9702L32.2287 25.6822C32.9007 28.6222 31.3527 29.7602 28.7727 28.2222L25.1867 26.0822C24.5387 25.6942 23.4707 25.6942 22.8107 26.0822L19.2227 28.2222C16.6547 29.7602 15.0947 28.6102 15.7667 25.6822L16.6187 21.9682C16.7747 21.2682 16.4987 20.2882 15.9947 19.7802L13.0187 16.7802C11.2667 15.0122 11.8307 13.2222 14.2787 12.8102L18.1067 12.1702C18.7427 12.0602 19.5107 11.4922 19.7987 10.9002L21.9107 6.64021C23.0627 4.33021 24.9347 4.33021 26.0747 6.64021M16.0007 42.9082C16.0007 40.0802 16.0007 38.6662 16.8807 37.7882C17.7567 36.9082 19.1707 36.9082 22.0007 36.9082H26.0007C28.8287 36.9082 30.2427 36.9082 31.1207 37.7882C32.0007 38.6662 32.0007 40.0802 32.0007 42.9082V44.9082H16.0007V42.9082Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg
      className="w-12 h-12 text-white"
      viewBox="0 0 48 49"
      fill="currentColor"
    >
      <path
        d="M14 36.9082V34.9082C14 32.256 15.0536 29.7125 16.9289 27.8371C18.8043 25.9618 21.3478 24.9082 24 24.9082M24 24.9082C26.6522 24.9082 29.1957 25.9618 31.0711 27.8371C32.9464 29.7125 34 32.256 34 34.9082V36.9082M24 24.9082C25.5913 24.9082 27.1174 24.2761 28.2426 23.1508C29.3679 22.0256 30 20.4995 30 18.9082C30 17.3169 29.3679 15.7908 28.2426 14.6656C27.1174 13.5403 25.5913 12.9082 24 12.9082C22.4087 12.9082 20.8826 13.5403 19.7574 14.6656C18.6321 15.7908 18 17.3169 18 18.9082C18 20.4995 18.6321 22.0256 19.7574 23.1508C20.8826 24.2761 22.4087 24.9082 24 24.9082ZM2 36.9082V34.9082C2 33.3169 2.63214 31.7908 3.75736 30.6656C4.88258 29.5403 6.4087 28.9082 8 28.9082M8 28.9082C9.06087 28.9082 10.0783 28.4868 10.8284 27.7366C11.5786 26.9865 12 25.9691 12 24.9082C12 23.8473 11.5786 22.8299 10.8284 22.0798C10.0783 21.3296 9.06087 20.9082 8 20.9082C6.93913 20.9082 5.92172 21.3296 5.17157 22.0798C4.42143 22.8299 4 23.8473 4 24.9082C4 25.9691 4.42143 26.9865 5.17157 27.7366C5.92172 28.4868 6.93913 28.9082 8 28.9082ZM46 36.9082V34.9082C46 33.3169 45.3679 31.7908 44.2426 30.6656C43.1174 29.5403 41.5913 28.9082 40 28.9082M40 28.9082C41.0609 28.9082 42.0783 28.4868 42.8284 27.7366C43.5786 26.9865 44 25.9691 44 24.9082C44 23.8473 43.5786 22.8299 42.8284 22.0798C42.0783 21.3296 41.0609 20.9082 40 20.9082C38.9391 20.9082 37.9217 21.3296 37.1716 22.0798C36.4214 22.8299 36 23.8473 36 24.9082C36 25.9691 36.4214 26.9865 37.1716 27.7366C37.9217 28.4868 38.9391 28.9082 40 28.9082Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}