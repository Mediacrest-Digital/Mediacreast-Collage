import { useState } from "react";
import {
  Search,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";
import AnnouncementBanner from "../Component/AnnouncementBanner";
import background from "../images/background.png";
import bgMobile from "../images/indexImg.jpg";
import JoinUs from "@/Component/JoinUs";
import VideoCarousel from "@/Component/videos";
import VideoTry from "../Component/videosTry";
import VideoPlayer from "@/Component/videosTry";

const courses = [
  {
    title: "Digital Marketing",
    duration: "6 weeks",
    description:
      "This Digital Marketing Short Course is designed to equip you with the essential skills and strategies...",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/afde4b56c02ed92c5dfd7b97f5ba5275b6c48c61?width=570",
    link: "/digital-marketing",
  },
  {
    title: "Graphic Design",
    duration: "6 weeks",
    description:
      "The Graphic Design Certification at Mediacrest Training College is a comprehensive program ...",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/38863a94093c2af43b64f3d5dc50aa00c14f9cec?width=562",
    link: "/graphic-design",
  },
  {
    title: "Photography and Videography",
    duration: "8 weeks",
    description:
      "This course is designed to give you a comprehensive learning experience with a strong focus on practical...",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b2c7e7369d67d77252afcaae0150a48fc4d88619?width=645",
    link: "/photography-videography",
  },
  {
    title: "Software Engineering",
    duration: "8 weeks",
    description:
      "Accelerate your tech career with our immersive Software Engineering course, designed to equip you...",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/24512bbf9c48581eacfbb53844b0eb34861fa880?width=562",
    link: "/courses/software-engineering",
  },
  {
    title: "Data Science",
    duration: "8 weeks",
    description:
      "This course provides a comprehensive curriculum and equips participants with the tools and techniques...",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/867f49d5a07ea12c6e13252f10adce6f590dbcad?width=562",
    link: "/courses/data-science",
  },
  {
    title: "CyberSecurity",
    duration: "8 weeks",
    description:
      "An Industry-Aligned and Practical Cybersecurity Certification course! Launch a lucrative career with...",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/47866fb60d3e38eb3e2eebc8f3ee3a258de5e5e2?width=562",
    link: "/courses/cyber-security",
  },
];

const whyChooseFeatures = [
  {
    title: "Comprehensive Programs",
    description:
      "Our diverse range of programs equips you with in-demand skills tailored to today's job market.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/656c9c7524c7c54fbf9286cbb8effe04e6e451c7?width=758",
  },
  {
    title: "State of the Art Facilities",
    description:
      "Train in a modern environment with up-to-date tools and technology that simulate real-world workspaces.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2512fc25cb70c0fac54cf3928f4e5e0e4251fb0d?width=758",
  },
  {
    title: "Hands-on Learning",
    description:
      "We emphasize learning by doing—gain real experience through practical projects",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d4873e5d862ad6e04518672ce330171788444dbd?width=758",
  },
  {
    title: "Technical Mentorship",
    description:
      "Learn from seasoned professionals who guide you every step of the way with personalized technical mentorship.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3596b016dba64b44f804ccf1366fb3a074d48a11?width=758",
  },
  {
    title: "Career Coaching",
    description:
      "Get career-ready with expert guidance and support to help you land your dream role.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/32a56701c93d20d1a247d0c77b297ec7724bba37?width=756",
  },
  {
    title: "Strong Industry Connections",
    description:
      "Benefit from our partnerships with top companies for internships, job placements, and industry exposure.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cb9238aec7459e874822b164aefa35cd9da73037?width=756",
  },
];

const testimonials = [
  {
    name: "Stephen Okumu",
    title: "Full Stack Developer",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a59771c553b79a2d747bd55b340918681c1fd48b?width=146",
    quote:
      "Joining Mediacrest Training College was one of the best decisions I've ever made. The Software Engineering course was not only comprehensive but also incredibly practical. I gained skills and confidence to launch my tech career. Today, I'm working as a Full Stack Developer in one of the leading tech companies in Kenya, thanks to the solid foundation I got. I highly recommend Mediacrest Training College!",
  },
  {
    name: "Joy Bundi",
    title: "Digital Marketing Specialist",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6efc122acac0680a91e5df4ab06b7a1dbf49876a?width=184",
    quote:
      "Studying Digital Marketing at Mediacrest Training College was a game-changer for my career. Just a month after graduating, I secured a role as a digital marketing specialist with a leading real estate company in Africa. I'm incredibly grateful for my time at Mediacrest Training College. If you're serious about launching a career in digital marketing, this is the place to be! Practical exposure allowed me to apply everything I learned in a professional setting, working on actual digital campaigns.",
  },
  {
    name: "Frank Ongaga",
    title: "Founder & Creative Director Black Ace Studios",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6b4cf3bb8091d25a4a0f8a137a9baf5a028298d4?width=148",
    quote:
      "The Photography and Videography Certification course equipped me with not just technical skills, but real industry knowledge and confidence. I've now opened my own studio in Westlands Nairobi, a dream that felt far off before I joined Mediacrest Training College. Today, I'm running a growing business, working with clients on events, commercials and creative projects. I highly recommend their trainings to anyone serious about building a career in media",
  },
];

const companyLogos = [
  "https://cdn.builder.io/api/v1/image/assets/TEMP/fadb37a3462f237214864b247d1268842226bbbd?width=118",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/d3a847608a08f0b86ba308bab4409558d76090a8?width=236",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/5ffc5877e464a0ad8ed88c00b79b15c4d1648e3b?width=170",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/442d3bdea0279f05dcfacaa80869162bf473a41c?width=210",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/16c0a3e44d10be2bc0f9bf7a9361f9846ed55f7e?width=182",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/c5f2a29e5529efc04cc0d3f0a89df32ab246f82f?width=260",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/23153f560424f913559667e26da820d55224ee67?width=126",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/85259f0a76c2292baf3af28023383d0020e6c825?width=150",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/f9745af60b2fc072af0d378fd0ce1198d4a68d85?width=210",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/bd71951e22fbe62939db1925a4e51df167671239?width=262",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/b10a9a6bfcefb57e7bfd817f9fe016987be14445?width=178",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/29e2b630491b1784021f3adc5524811d59d05af2?width=86",
];

const partnerLogos = [
  "https://cdn.builder.io/api/v1/image/assets/TEMP/14d49e385b034ff4fbc6a676554357a894970a37?width=212",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/dc7bc46eeaf9ac9165967075a4c8d7a5822c9920?width=246",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/49d5cbfd2382855bc4daeb139203ca38351ed8de?width=390",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/157be8824fd6786636b1464126e13de74b67b9a4?width=118",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/384f69bbf47f3038c6946a22d48ef54582b0ab7c?width=348",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/5c30ef23680e42e3f15e21ad3391a54c6468cb7b?width=128",
];

export default function Index() {
  return (
    <div className="min-h-screen bg-white text-mediacrest-gray-900 pt-12">
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <section className="Seindex relative h-[80vh] bg-gradient-to-r from-mediacrest-navy to-mediacrest-navy/90">
        {/* Desktop/Tablet Background Image - Hidden on mobile */}
        <div className="Dimg absolute inset-0 z-0 hidden md:block">
          <img
            className="imgT w-full h-full object-cover"
            src={background}
            alt="Desktop background"
          />
          {/* Optional overlay for desktop */}
          <div className="absolute inset-0 bg-mediacrest-navy/20"></div>
        </div>

  {/* Foreground Content */}
  <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-[74px] pt-16 lg:pt-20 pb-16 lg:pb-20 h-full flex items-center">
    <div className="max-w-2xl">
      <div className="relative mb-6">
        <h1 className="IHero text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Empowering Growth, Shaping Futures
        </h1>
        <svg
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
        {/* Mobile Background Image - Only visible on mobile */}
        <div className="absolute inset-0 z-0 md:hidden">
          {/* Replace 'mobileBackground' with your mobile background image variable */}
          <img
            className="w-full h-full object-cover"
            src={bgMobile}
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

      <p className=" text-mediacrest-gray-300 text-base lg:text-lg leading-relaxed mb-8 lg:mb-12 max-w-xl">
        Mediacrest Training College blends passion with purpose, offering expert faculty, modern
        facilities, and industry ties to equip Africa's brightest minds for success in competitive
        fields.
      </p>

        {/* Foreground Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-[74px] pt-16 lg:pt-20 pb-16 lg:pb-20 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="relative mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Empowering Growth, Shaping Futures
              </h1>
              <svg
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
              </svg>
            </div>

            <p className="text-mediacrest-gray-300 text-base lg:text-lg leading-relaxed mb-8 lg:mb-12 max-w-xl">
              Mediacrest Training College blends passion with purpose, offering
              expert faculty, modern facilities, and industry ties to equip
              Africa's brightest minds for success in competitive fields.
            </p>

            {/* <div className="SearchHome bg-white/95 backdrop-blur-sm md:bg-white rounded-xl border shadow-lg p-2 flex flex-col sm:flex-row gap-2 max-w-lg">
        <input
          type="text"
          placeholder="What course are you looking for?"
          className="flex-1 px-4 py-3 text-mediacrest-gray-600 placeholder:text-mediacrest-gray-500 border-none outline-none rounded-lg bg-transparent"
        />
        <Button className="bg-mediacrest-orange hover:bg-mediacrest-orange/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap">
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div> */}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-mediacrest-orange py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[110px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-y-10 gap-x-6 text-center text-white relative">
            {/* Item 1 */}
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                300+
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-mediacrest-gray-200">
                Trained Professionals
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block absolute left-1/4 top-0 bottom-0 w-px bg-gray-300 mx-auto" />

            {/* Item 2 */}
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                20+
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-mediacrest-gray-200">
                Employers that trust us
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block absolute left-2/4 top-0 bottom-0 w-px bg-gray-300 mx-auto" />

            {/* Item 3 */}
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                95%
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-mediacrest-gray-200">
                Graduate Satisfaction Rating
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block absolute left-3/4 top-0 bottom-0 w-px bg-gray-300 mx-auto" />

            {/* Item 4 */}
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                2022
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-mediacrest-gray-200 max-w-[200px] mx-auto">
                Year Mediacrest Training College was founded
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-mediacrest-gray-900 mb-4">
              Browse Our Popular Courses
            </h2>
            <p className="text-mediacrest-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Explore a wide range of in-demand courses designed to boost your
              skills and advance your career. Whether you're starting out or
              looking to specialize, we have something for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-mediacrest-light-beige rounded-full px-3 py-1 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-mediacrest-orange" />
                      <span className="text-mediacrest-orange text-xs font-semibold">
                        {course.duration}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-mediacrest-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-mediacrest-gray-600 text-sm leading-relaxed mb-6">
                    {course.description}
                  </p>
                  <Link
                    to={course.link}
                    className="flex items-center gap-1 text-mediacrest-orange font-semibold cursor-pointer hover:gap-2 transition-all"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-mediacrest-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 lg:mb-16">
            Why <span className="text-mediacrest-orange">Choose</span>{" "}
            Mediacrest Training College?
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {whyChooseFeatures.slice(0, 3).map((feature, index) => (
                <div
                  key={index}
                  className="relative group rounded-xl overflow-hidden shadow-md bg-white"
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {whyChooseFeatures.slice(3).map((feature, index) => (
                <div
                  key={index}
                  className="relative group rounded-xl overflow-hidden shadow-md bg-white"
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/**Video section */}
      <VideoTry />
      {/* Where Our Graduates Work */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12 lg:mb-16 relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-mediacrest-gray-900">
              Where Our Graduates Work
            </h2>
            <svg
              className="hidden sm:block absolute top-8 left-1/2 transform translate-x-8 w-20 h-2"
              viewBox="0 0 99 13"
              fill="none"
            >
              <path
                d="M2 5.29136C17.9557 2.23033 59.1565 -0.936776 96.3139 10.8831"
                stroke="#EB4823"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12 items-center justify-items-center">
            {companyLogos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="Company logo"
                className="h-6 sm:h-8 lg:h-12 w-auto "
              />
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Success Stories */}
      <section className="py-12 sm:py-16 lg:py-20 bg-mediacrest-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-mediacrest-gray-900 mb-4">
              Alumni Success Stories
            </h2>
            <p className="text-mediacrest-gray-600 text-base sm:text-lg">
              Empowering Growth, Shaping Futures
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-6">
                  <div className="flex items-center gap-3 flex-1">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-base sm:text-lg text-mediacrest-gray-900 truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-mediacrest-gray-600 text-xs sm:text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl text-[#EF6B4D] leading-none flex-shrink-0">
                    "
                  </div>
                </div>
                <p className="text-mediacrest-gray-700 text-xs sm:text-sm leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <JoinUs />

      {/* Partners Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-32">
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-center text-mediacrest-gray-900 mb-8 sm:mb-12">
            Our Partners
          </h2>

          <div className="overflow-hidden">
            <div className="flex gap-6 sm:gap-8 lg:gap-20 animate-scroll-partners w-max">
              {partnerLogos.concat(partnerLogos).map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt="Partner logo"
                  className="h-8 sm:h-10 lg:h-14 w-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
