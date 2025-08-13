import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Try from "./Try";
import Footer from "../Component/Footer";
import FAQAccordion from "../Component/courseDropdown3";
import photopic from "../images/photo.png";
import "../photography.css";
import CTAphotos from "@/Component/CTAphotos";
import PhotoTry from "@/Component/PhotoTry";
const AccordionItem = ({
  question,
  isOpen,
  onToggle,
}: {
  question: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="bg-white rounded-2xl">
    <button
      className="w-full flex items-center justify-between p-6 text-left"
      onClick={onToggle}
    >
      <span className="text-lg font-semibold text-[#3D3D3D] leading-7">
        {question}
      </span>
      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
        <path
          d="M3.75 12H20.25"
          stroke="#EB4823"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {!isOpen && (
          <path
            d="M12 3.75V20.25"
            stroke="#EB4823"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  </div>
);

const CollapsibleSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl shadow-md mb-4">
    <button
      className="w-full flex items-center justify-between p-6 text-left"
      onClick={onToggle}
    >
      <span className="text-xl font-medium text-[#3D3D3D]">{title}</span>
      <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d={isOpen ? "M7 14L12 9L17 14" : "M7 10L12 15L17 10"}
            stroke="#EB4823"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
    {isOpen && <div className="px-6 pb-6">{children}</div>}
  </div>
);

// Example Usage
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <CollapsibleSection
        title="Digital Marketing Certification"
        isOpen={openIndex === 0}
        onToggle={() => handleToggle(0)}
      >
        <p className="text-[#7B7B7B] leading-8 mb-4">
          Elevate your career with Mediacrest College's Digital Marketing
          Certification designed for working professionals like you.
        </p>
        <p className="text-[#7B7B7B] leading-8 mb-4">
          This flexible evening course covers essential topics including SEO,
          social media strategies, and content marketing.
        </p>
        <p className="text-[#7B7B7B] leading-8">
          Whether you're enhancing your current role or pivoting into the
          digital space, this program empowers your journey.
        </p>
      </CollapsibleSection>

      <CollapsibleSection
        title="Graphic Design Diploma"
        isOpen={openIndex === 1}
        onToggle={() => handleToggle(1)}
      >
        <p className="text-[#7B7B7B] leading-8 mb-4">
          This program offers in-depth design principles, tools like Adobe
          Creative Suite, and real-world portfolio building.
        </p>
        <p className="text-[#7B7B7B] leading-8">
          Whether you're starting out or sharpening your skills, you'll gain
          everything needed to thrive in creative industries.
        </p>
      </CollapsibleSection>
    </div>
  );
};

export default function Index() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const faqQuestions = [
    "Is prior digital marketing experience required?",
    "What software and tools are used in the course?",
    "What topics are covered in the course curriculum?",
    "What career opportunities can I expect after completing the program?",
    "Can I work internationally with this qualification?",
    "How often do you offer intakes for the Digital Marketing Certification Course?",
    "How can I schedule a campus tour or learn more about the program?",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="photoHero relative md:bg-[#1D2026] lg:bg-[#1D2026] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full sm:w-1/2 z-0">
          <img
            src={photopic}
            alt="Digital Marketing Background"
            className="imgP w-full h-full object-cover "
          />
          <div className="opPV"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="relative">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Photography and Videography
                  </h1>
                  <svg
                    className="absolute -bottom-2 right-0 w-64 h-4"
                    viewBox="0 0 255 14"
                    fill="none"
                  >
                    <path
                      d="M1.99997 5.29882C43.8008 2.39933 152.356 -0.341007 252.172 11.8936"
                      stroke="#EB4823"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-white text-lg leading-7 max-w-lg">
                  This course is designed to give you a comprehensive learning
                  experience with a strong focus on practical skills, hands-on
                  projects
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <span className="px-5 py-2 bg-[#EBEBFF] text-[#1D2026] rounded-full text-sm">
                  Full-time Remote
                </span>
                <span className="px-5 py-2 bg-[#FFF2E5] text-[#1D2026] rounded-full text-sm">
                  Part-time Remote
                </span>
                <span className="px-5 py-2 bg-[#E1F7E3] text-[#1D2026] rounded-full text-sm">
                  Part-time Hybrid
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Info Cards */}
      <section className="CourseCardsCP py-8 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <div className="grid md:grid-cols-4 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-[#FFF5EC] rounded-lg">
                  <svg className="w-6 h-6" viewBox="0 0 25 25" fill="none">
                    <path
                      d="M12.5 22.5C18.023 22.5 22.5 18.023 22.5 12.5C22.5 6.977 18.023 2.5 12.5 2.5C6.977 2.5 2.5 6.977 2.5 12.5C2.5 18.023 6.977 22.5 12.5 22.5Z"
                      stroke="#FFC27A"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5039 6.5V12.505L16.7434 16.745"
                      stroke="#FFC27A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[#1B1D1F] text-lg font-medium">Duration</p>
                  <p className="text-[#1B1D1F] text-xl font-bold">8 Weeks</p>
                </div>
              </div>

              <div className="flex items-center gap-5 pt-8 md:pt-0 md:pl-8">
                <div className="p-3 bg-[#E9F8F3] rounded-lg">
                  <svg className="w-6 h-6" viewBox="0 0 25 25" fill="none">
                    <path
                      d="M13.5 18.5H3.5C3.23478 18.5 2.98043 18.3946 2.79289 18.2071C2.60536 18.0196 2.5 17.7652 2.5 17.5V4.5C2.5 4.23478 2.60536 3.98043 2.79289 3.79289C2.98043 3.60536 3.23478 3.5 3.5 3.5H21.5C21.7652 3.5 22.0196 3.60536 22.2071 3.79289C22.3946 3.98043 22.5 4.23478 22.5 4.5V17.5C22.5 17.7652 22.3946 18.0196 22.2071 18.2071C22.0196 18.3946 21.7652 18.5 21.5 18.5H17.5M6.5 7.5H18.5M6.5 11H9.5M6.5 14.5H8.5"
                      stroke="#25BE8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5 17C16.2956 17 17.0587 16.6839 17.6213 16.1213C18.1839 15.5587 18.5 14.7956 18.5 14C18.5 13.2044 18.1839 12.4413 17.6213 11.8787C17.0587 11.3161 16.2956 11 15.5 11C14.7044 11 13.9413 11.3161 13.3787 11.8787C12.8161 12.4413 12.5 13.2044 12.5 14C12.5 14.7956 12.8161 15.5587 13.3787 16.1213C13.9413 16.6839 14.7044 17 15.5 17Z"
                      stroke="#25BE8E"
                      strokeWidth="2"
                    />
                    <path
                      d="M15.5 20.5L17.5 21.5V16.236C17.5 16.236 16.93 17 15.5 17C14.07 17 13.5 16.25 13.5 16.25V21.5L15.5 20.5Z"
                      stroke="#25BE8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[#1B1D1F] text-lg font-medium">
                    Award Level
                  </p>
                  <p className="text-[#1B1D1F] text-xl font-bold">
                    Certificate
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 pt-8 md:pt-0 md:pl-8">
                <div className="p-3 bg-[#FFF2EE] rounded-lg">
                  <svg className="w-6 h-6" viewBox="0 0 25 25" fill="none">
                    <path
                      d="M6.5 10.5H10.5"
                      stroke="#EB4823"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.333 11.5H18.731C16.946 11.5 15.5 12.843 15.5 14.5C15.5 16.157 16.947 17.5 18.73 17.5H21.333C21.417 17.5 21.458 17.5 21.493 17.498C22.033 17.465 22.463 17.066 22.498 16.565C22.5 16.533 22.5 16.494 22.5 16.417V12.583C22.5 12.506 22.5 12.467 22.498 12.435C22.462 11.934 22.033 11.535 21.493 11.502C21.458 11.5 21.417 11.5 21.333 11.5Z"
                      stroke="#EB4823"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M21.465 11.5C21.387 9.628 21.137 8.48 20.328 7.672C19.157 6.5 17.271 6.5 13.5 6.5H10.5C6.729 6.5 4.843 6.5 3.672 7.672C2.501 8.844 2.5 10.729 2.5 14.5C2.5 18.271 2.5 20.157 3.672 21.328C4.844 22.499 6.729 22.5 10.5 22.5H13.5C17.271 22.5 19.157 22.5 20.328 21.328C21.137 20.52 21.388 19.372 21.465 17.5"
                      stroke="#EB4823"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6.5 6.49995L10.235 4.02295C10.7604 3.68165 11.3735 3.5 12 3.5C12.6265 3.5 13.2396 3.68165 13.765 4.02295L17.5 6.49995"
                      stroke="#EB4823"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18.491 14.5H18.501"
                      stroke="#EB4823"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[#1B1D1F] text-lg font-medium">
                    Tuition Fee
                  </p>
                  <p className="text-[#1B1D1F] text-xl font-bold">
                    KSH. 54,500
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start md:ml-8 pt-8 md:pt-0">
                <Link
                  to="/photography-videography-application"
                  className="w-fit px-6 py-3 bg-[#EB4823] text-white rounded-lg font-semibold flex items-center gap-3 hover:bg-[#d63e1e] transition-colors text-lg whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href =
                      "/photography-videography-application";
                  }}
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

      {/* About This Course */}
      <section className="py-16 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-[#EB4823] capitalize">
                  About this course
                </h2>
                <p className="text-[#7A746D] leading-relaxed">
                  This course is designed to give you a comprehensive learning
                  experience with a strong focus on practical, hands-on
                  projects. Throughout the course, you’ll spend a majority of
                  your time working on real-time projects and fieldwork
                  experience, supported by our affiliate digital marketing
                  agency, Mediacrest Digital. This will give you valuable
                  exposure to industry standard equipment and workflows,
                  ensuring you gain the practical experience needed to excel in
                  professional environments. The program emphasizes practical
                  experience, ensuring that graduates are ready to meet the
                  challenges of real-world photography and videography
                  environments. You'll learn to light, shoot, edit, and print
                  photos and videos using state-of-the-art cameras and
                  equipment.
                </p>
                <div className="pl-4 border-l-4 border-[#EB4823]">
                  <p className="text-[#7A746D] leading-relaxed">
                    With classes held at Mediacrest’ state-of-the-art campus,
                    equipped with professional-grade photography and videography
                    equipment and facilities, this certificate equips you with
                    the skills, creativity, and industry connections needed to
                    thrive in the competitive field of photography and
                    videography.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#EB4823] rounded-3xl w-48 h-48 absolute -top-8 -right-8"></div>
              <div className="bg-[#1D2026] rounded-3xl w-28 h-28 absolute -bottom-16 -left-16"></div>
              <div className="relative bg-gray-200 rounded-3xl overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/02f18d1ab741c5ae33c44800451e5ce53c8022e9?width=1774"
                  alt="Digital Marketing Course"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why You Should Take This Course */}
      <section className="py-16 px-4 md:px-16 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] capitalize">
              Why you should take this course?
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="p-5 bg-[#FFF5EC] rounded-lg w-fit mb-6">
                <svg className="w-9 h-9" viewBox="0 0 37 36" fill="none">
                  <path
                    d="M32.5625 4.72501C32.1757 4.47477 31.7333 4.32338 31.2743 4.28414C30.8153 4.24491 30.3537 4.31904 29.93 4.50001L16.0475 9.96751C15.7192 10.1024 15.3675 10.1712 15.0125 10.17H6.125C5.37908 10.17 4.66371 10.4663 4.13626 10.9938C3.60882 11.5212 3.3125 12.2366 3.3125 12.9825V13.2075H0.5V19.9575H3.3125V20.25C3.33012 20.9842 3.6342 21.6823 4.15975 22.1953C4.6853 22.7082 5.39063 22.9952 6.125 22.995L9.5 30.15C9.72853 30.6318 10.0883 31.0394 10.5381 31.326C10.9878 31.6125 11.5092 31.7664 12.0425 31.77H13.46C14.202 31.7641 14.9116 31.4651 15.4342 30.9383C15.9568 30.4115 16.25 29.6995 16.25 28.9575V23.265L29.93 28.7325C30.2669 28.8649 30.6255 28.9335 30.9875 28.935C31.5491 28.9247 32.0959 28.7528 32.5625 28.44C32.9326 28.1901 33.2378 27.8557 33.453 27.4645C33.6682 27.0732 33.7872 26.6364 33.8 26.19V7.04251C33.7979 6.58467 33.6841 6.13425 33.4685 5.73038C33.2528 5.32651 32.9418 4.98139 32.5625 4.72501ZM13.4375 12.9825V20.25H6.125V12.9825H13.4375ZM13.4375 28.9575H12.02L9.2525 22.995H13.4375V28.9575ZM17.0825 20.5875C16.8153 20.4511 16.5368 20.3382 16.25 20.25V12.825C16.5339 12.766 16.8124 12.6832 17.0825 12.5775L30.9875 7.04251V26.1225L17.0825 20.5875ZM33.8675 13.77V19.395C34.6134 19.395 35.3288 19.0987 35.8562 18.5712C36.3837 18.0438 36.68 17.3284 36.68 16.5825C36.68 15.8366 36.3837 15.1212 35.8562 14.5938C35.3288 14.0663 34.6134 13.77 33.8675 13.77Z"
                    fill="#FFC27A"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#061C3D] mb-3">
                Unlock Your Creative Vision
              </h3>
              <p className="text-[#42526B] leading-relaxed">
                Immerse yourself in a curriculum designed to bring out your
                unique perspective. From understanding your camera to mastering
                composition, each module is crafted to empower you with the
                skills needed to create compelling and visually stunning
                photographs and videos.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="p-5 bg-[#E9F8F3] rounded-lg w-fit mb-6">
                <svg className="w-9 h-9" viewBox="0 0 37 36" fill="none">
                  <path
                    d="M36.5 6.75V29.25H0.5V6.75H11.75V4.5C11.75 4.18359 11.8086 3.89062 11.9258 3.62109C12.043 3.35156 12.2012 3.11719 12.4004 2.91797C12.5996 2.71875 12.8398 2.55469 13.1211 2.42578C13.4023 2.29687 13.6953 2.23828 14 2.25H23C23.3164 2.25 23.6094 2.30859 23.8789 2.42578C24.1484 2.54297 24.3828 2.70117 24.582 2.90039C24.7812 3.09961 24.9453 3.33984 25.0742 3.62109C25.2031 3.90234 25.2617 4.19531 25.25 4.5V6.75H36.5ZM14 6.75H23V4.5H14V6.75ZM2.75 9V12.252L14 17.8594V15.75H23V17.8594L34.25 12.252V9H2.75ZM16.25 18V20.25H20.75V18H16.25ZM34.25 27V14.748L23 20.3906V22.5H14V20.3906L2.75 14.748V27H34.25Z"
                    fill="#25BE8E"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#061C3D] mb-3">
                Practical Learning with Industry-Standard Equipment
              </h3>
              <p className="text-[#42526B] leading-relaxed">
                Gain hands-on experience with professional equipment and
                industry-standard techniques. Our course ensures you are
                well-equipped to navigate the ever-evolving field of photography
                and videography, from basic principles to advanced techniques.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="p-5 bg-[#FFF2EF] rounded-lg w-fit mb-6">
                <svg className="w-9 h-9" viewBox="0 0 37 36" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.0343 17.9997L25.3824 19.7935C26.1615 20.0556 26.8683 20.4833 27.4638 21.0362L29.1438 20.4508L30.5958 23.0488L29.2659 24.2581C29.349 24.6668 29.3907 25.0827 29.3905 25.4998C29.3905 25.9254 29.3475 26.3408 29.2659 26.7414L30.5958 27.9507L29.1438 30.5488L27.4638 29.9633C26.8683 30.5163 26.1615 30.9439 25.3824 31.206L25.0343 32.9998H22.1301L21.7835 31.2065C21.0038 30.9444 20.2965 30.5166 19.7006 29.9633L18.0206 30.5488L16.5686 27.9507L17.8988 26.743C17.8155 26.3338 17.7737 25.9173 17.7739 25.4998C17.7739 25.0735 17.817 24.6577 17.8988 24.2566L16.949 23.3938L17.1043 22.5958L17.1219 22.5894C17.8031 22.2844 18.4461 21.9003 19.0375 21.4449L19.0501 21.4332L20.6407 21.9895L21.6325 22.3359C20.6221 23.0018 19.9521 24.1699 19.9521 25.4998C19.9521 27.5708 21.5773 29.2497 23.5822 29.2497C25.5871 29.2497 27.2123 27.5708 27.2123 25.4998C27.2123 23.4287 25.5871 21.7498 23.5822 21.7498C22.9847 21.7493 22.3968 21.9008 21.874 22.1901L22.3628 21.3184L24.2166 17.9997H25.0343ZM15.3519 2.99976L15.8394 5.51104C16.9304 5.87807 17.9201 6.47699 18.7539 7.25141L21.1053 6.43108L23.1382 10.0684L21.2761 11.7603C21.3924 12.3328 21.4509 12.9156 21.4506 13.4997C21.4506 14.0961 21.3905 14.678 21.2761 15.2392L23.1382 16.9311L21.1053 20.5684L18.7539 19.7481C17.9201 20.5225 16.9304 21.1215 15.8394 21.4885L15.3519 23.9998H11.2862L10.8003 21.489C9.70838 21.1219 8.71796 20.5225 7.88363 19.7475L5.53288 20.5684L3.5 16.9311L5.36237 15.2407C5.24578 14.6677 5.18722 14.0844 5.18757 13.4997C5.18757 12.9034 5.24769 12.3216 5.36209 11.7603L3.5 10.0684L5.53288 6.43115L7.88363 7.25204C8.71831 6.47664 9.70923 5.87708 10.8017 5.51005L11.2862 2.99976H15.3519ZM13.3191 8.24978C10.5123 8.24978 8.23688 10.6003 8.23688 13.4997C8.23688 16.3993 10.5123 18.7498 13.3191 18.7498C16.1259 18.7498 18.4013 16.3993 18.4013 13.4997C18.4013 10.6002 16.1259 8.24978 13.3191 8.24978ZM27.9384 2.99976L28.2865 4.7935C29.0656 5.05562 29.7724 5.48326 30.368 6.03627L32.0479 5.45071L33.5 8.04883L32.1701 9.25813C32.2531 9.66679 32.2948 10.0828 32.2946 10.4998C32.2948 10.9168 32.2531 11.3328 32.1701 11.7414L33.5 12.9507L32.0479 15.5488L30.368 14.9632C29.7724 15.5162 29.0656 15.9439 28.2865 16.206L27.9384 17.9997H25.0343L24.6876 16.2065L24.4344 16.1113L24.0972 15.8048L22.8342 14.6578L22.851 14.5333C22.8854 14.1915 22.9027 13.8467 22.9027 13.4997L22.8897 12.9811C22.8812 12.8092 22.8682 12.6375 22.851 12.4663L22.8342 12.3403L23.1729 12.0341C23.7406 13.3401 25.0106 14.2498 26.4864 14.2498C28.4912 14.2498 30.1165 12.5708 30.1165 10.4998C30.1165 8.42872 28.4912 6.74973 26.4864 6.74973C25.3713 6.74973 24.3736 7.26913 23.7077 8.08637L22.551 6.01778L22.6047 6.03627C23.2006 5.48291 23.9079 5.05506 24.6876 4.79301L25.0343 2.99976H27.9384Z"
                    fill="#EB4823"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#061C3D] mb-3">
                Real-World Photography & Videography Experience
              </h3>
              <p className="text-[#42526B] leading-relaxed">
                Move beyond theory and step into real-world scenarios of
                photography and videography. Through our digital marketing
                agency, you will engage in practical projects and collaborative
                ventures that mirror the challenges and opportunities of the
                professional photography and videography landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Sections */}
      {/* Course Sections */}
      <section className="py-16 px-4 md:px-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <CollapsibleSection
            title="Course Description"
            isOpen={openSection === "description"}
            onToggle={() =>
              setOpenSection(
                openSection === "description" ? null : "description",
              )
            }
          >
            <p className="text-[#7B7B7B] leading-8 mb-4">
              This course introduces students to core principles in digital
              communication and marketing. Through hands-on projects and
              expert-led lectures, learners gain real-world skills in campaign
              creation, audience engagement, and analytics.
            </p>
            <p className="text-[#7B7B7B] leading-8">
              The curriculum is designed for both beginners and professionals
              transitioning into the digital space.
            </p>
          </CollapsibleSection>

          <CollapsibleSection
            title="Learning Outcomes"
            isOpen={openSection === "outcomes"}
            onToggle={() =>
              setOpenSection(openSection === "outcomes" ? null : "outcomes")
            }
          >
            <ul className="list-disc ml-6 text-[#7B7B7B] space-y-2 leading-8">
              <li>Develop and manage digital marketing campaigns</li>
              <li>Use SEO and analytics tools effectively</li>
              <li>Understand customer behavior across digital platforms</li>
              <li>Design optimized content strategies</li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection
            title="Career Options"
            isOpen={openSection === "career"}
            onToggle={() =>
              setOpenSection(openSection === "career" ? null : "career")
            }
          >
            <p className="text-[#7B7B7B] leading-8 mb-4">
              Upon completion, graduates are equipped to pursue roles such as:
            </p>
            <ul className="list-disc ml-6 text-[#7B7B7B] space-y-2 leading-8">
              <li>Digital Marketing Specialist</li>
              <li>Content Strategist</li>
              <li>SEO Analyst</li>
              <li>Social Media Manager</li>
            </ul>
          </CollapsibleSection>
        </div>
      </section>

      {/* Course Leader */}
<PhotoTry />
      {/* Application Process */}
      <section className="py-16 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#101828] mb-4">
              Application Process
            </h2>
            <p className="text-[#66708A] max-w-2xl mx-auto">
              The application process is straightforward and designed to guide
              you step-by-step. To apply online please visit:
              <Link to="/application" className="text-[#EB4823] underline ml-1">
                https://mediacrestcollege.com/apply
              </Link>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#EB4823] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  01
                </div>
                <div className=" borderD hidden md:block h-px  flex-1"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0E0E0F] mb-3">
                  Choose Your Course
                </h3>
                <p className="text-[#7F8490] leading-relaxed">
                  Explore our range of programs and pick the one that aligns
                  with your goals.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#EB4823] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  02
                </div>
                <div className=" borderD hidden md:block h-px  flex-1"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0E0E0F] mb-3">
                  Fill Out the Application Form
                </h3>
                <p className="text-[#7F8490] leading-relaxed">
                  Tell us more about yourself and your interests. It only takes
                  a few minutes.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#EB4823] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  03
                </div>
                <div className=" borderD hidden md:block h-px  flex-1"></div>{" "}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0E0E0F] mb-3">
                  We'll Reach Out
                </h3>
                <p className="text-[#7F8490] leading-relaxed">
                  Our team will get in touch to guide you through the next
                  steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion />

      {/* CTA Section */}
     <CTAphotos/>

      {/* Footer */}
      <Footer />
    </div>
  );
}
