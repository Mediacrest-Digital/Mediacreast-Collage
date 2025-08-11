import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Try from "./Try";
import "../digital.css"
import Footer from "../Component/Footer";
import FAQAccordion from "../Component/courseDropdown";
import bgSoftware from "../images/Herosoftpic.png"
import heroSoft from "../images/softwarepic.png"
import {WhyTakeCourseSection } from "../Component/whysoftware";



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
    setOpenIndex(prev => (prev === index ? null : index));
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
      <section className="relative bg-[#1D2026] py-16 md:py-20 overflow-hidden">
<div className="absolute inset-y-0 right-0 w-full sm:w-1/2 z-0">
  <img
    src={bgSoftware}
    alt="Digital Marketing Background"
    className="w-full h-full object-cover opacity-80"
  />
</div>


        <div className="relative max-w-7xl mx-auto px-4 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="relative">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Software Engineering
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
Accelerate your tech career with our immersive Software Engineering course, designed to equip you with advanced skills in coding, in web development, software architecture, and collaborative tools.                </p>
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
<section className="CourseCardsC py-[-20px] px-4 md:px-16">
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
                  <p className="text-[#1B1D1F] text-xl font-bold">25 Weeks</p>
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
                    Ksh. 150,500
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start md:ml-8 pt-8 md:pt-0">
                <Link
                  to="/software-engineering-application"
                  className="w-fit px-6 py-3 bg-[#EB4823] text-white rounded-lg font-semibold flex items-center gap-3 hover:bg-[#d63e1e] transition-colors text-lg whitespace-nowrap"
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
Accelerate your tech career with our immersive Software Engineering course, designed to equip you with advanced skills in coding, in web development, software architecture, and collaborative tools. Master industry-standard languages like Python and JavaScript, sharpen your problem-solving abilities and gain hands-on experience with collaborative tools like Git. 
              </p>
                <div className="pl-4 border-l-4 border-[#EB4823]">
                  <p className="text-[#7A746D] leading-relaxed">
This intensive, project-based program prepares you to thrive in the fast-paced tech and AI industry, whether you're launching your career or leveling up your coding expertise. Part-Time and Full-Time (Hybrid and online) options available with admissions entry guided by a technical assessment to ensure you’re ready to excel in this course.
                  </p>
                </div>
              </div>

            </div>

            <div className="relative">
              <div className="bg-[#EB4823] rounded-3xl w-48 h-48 absolute -top-8 -right-8"></div>
              <div className="bg-[#1D2026] rounded-3xl w-28 h-28 absolute -bottom-16 -left-16"></div>
              <div className="relative bg-gray-200 rounded-3xl overflow-hidden">
                <img
                  src={ heroSoft}
                  alt="Digital Marketing Course"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why You Should Take This Course */}
    <WhyTakeCourseSection/>

      {/* Course Sections */}
<section className="py-16 px-4 md:px-16">
  <div className="max-w-5xl mx-auto space-y-8">
    <CollapsibleSection
      title="Course Requirements"
      isOpen={openSection === "description"}
      onToggle={() =>
        setOpenSection(openSection === "description" ? null : "description")
      }
    >
      <p className="text-[#7B7B7B] leading-8 mb-4">
<li>Have basic computer knowledge </li> 
<li>Have graduated from high school</li> 
<li>Complete the application process by taking a technical assessment test </li> 
<li>Have a laptop with the following specs (core i5 upwards, 8GB RAM, 500GB upwards of storage)</li> 
<li>Have stable internet access</li> 




</p>
    </CollapsibleSection>

    {/* <CollapsibleSection
      title="Learning Outcomes"
      isOpen={openSection === "outcomes"}
      onToggle={() =>
        setOpenSection(openSection === "outcomes" ? null : "outcomes")
      }
    >
      <ul className="list-disc ml-6 text-[#7B7B7B] space-y-2 leading-8">
        <li>Create and manage marketing campaigns</li>
        <li>Manage Google and Meta Ad campaigns</li>
        <li>Manage social media pages for brands</li>
        <li>Optimize websites for SEO</li>
        <li>Use Google Analytics</li>
        <li>Master social media marketing strategies</li>
        <li>Develop content writing skills for digital platforms</li>
        <li>Understand inbound marketing principles</li>
        <li>Gain expertise in email marketing techniques</li>
        <li>Learn SEO and SEM strategies</li>
        <li>Build proficiency in data analysis for digital marketing</li>
        <li>Understand design principles for digital content</li>

      </ul>
    </CollapsibleSection> */}

    <CollapsibleSection
      title="Career Opportunities"
      isOpen={openSection === "career"}
      onToggle={() =>
        setOpenSection(openSection === "career" ? null : "career")
      }
    >
      <p className="text-[#7B7B7B] leading-8 mb-4">
        Upon completion, graduates are equipped to pursue roles such as:
      </p>
      <ul className="list-disc ml-6 text-[#7B7B7B] space-y-2 leading-8">
<li>Full Stack Developer</li>
<li>Web Developer</li>
<li>Software Engineer</li>
<li>DevOps Engineer</li>
<li>Mobile App Developer</li>
<li>API Developer</li>
<li>Data Engineer</li>
<li>Cloud Engineer</li>
<li>Product Manager</li>
<li>Technical Architect</li>
<li>Entrepreneur</li>
<li>Game Developer</li>

      </ul>
    </CollapsibleSection>
  </div>
</section>


      {/* Course Leader */}

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
 <div className=" borderD hidden md:block h-px  flex-1"></div>              </div>
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

{/*  
      <FAQAccordion/> */}

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-16">
        <div className="CtastE  max-w-7xl mx-auto">
          <div className="Ctast relative bg-mediacrest-orange/90 rounded-3xl overflow-hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/00aba66a0e0097d23456fe458bdc0e7b5150db81?width=2200"
              alt="Start Your Journey"
              className="CtastImg absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative p-12 md:p-16">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    Start Your Journey in Digital Marketing
                  </h2>
                  <p className="text-white leading-relaxed max-w-lg">
                    Join us at Mediacrest Training College, where you'll not
                    only learn the theory but also gain valuable hand-on
                    experiences from our affiliate digital marketing agency,
                    Mediacrest Digital that sets you apart in today's
                    competitive job market.
                  </p>
                  {/* <button className=" hidden px-8 py-3 bg-[#1D2026] text-white rounded-lg font-semibold flex items-center gap-3 hover:bg-gray-800 transition-colors">
                    Apply Now
                    <svg
                      className="w-4 h-4 rotate-180"
                      viewBox="0 0 17 16"
                      fill="none"
                    >
                      <path
                        d="M11.9953 8.66676L9.362 11.3001C9.29833 11.3616 9.24754 11.4352 9.2126 11.5165C9.17766 11.5978 9.15927 11.6853 9.1585 11.7738C9.15773 11.8623 9.1746 11.9501 9.20812 12.0321C9.24164 12.114 9.29114 12.1884 9.35374 12.251C9.41633 12.3136 9.49077 12.3631 9.5727 12.3966C9.65463 12.4302 9.74241 12.447 9.83093 12.4463C9.91945 12.4455 10.0069 12.4271 10.0883 12.3922C10.1696 12.3572 10.2432 12.3064 10.3047 12.2428L14.076 8.47143C14.201 8.34641 14.2712 8.17687 14.2712 8.0001C14.2712 7.82332 14.201 7.65378 14.076 7.52876L10.3047 3.75743C10.1789 3.63599 10.0105 3.56879 9.83573 3.57031C9.66093 3.57183 9.49373 3.64195 9.37012 3.76555C9.24652 3.88916 9.1764 4.05637 9.17488 4.23116C9.17337 4.40596 9.24056 4.57436 9.362 4.7001L11.9953 7.33343L3.16667 7.33343C2.98986 7.33343 2.82029 7.40367 2.69526 7.52869C2.57024 7.65372 2.5 7.82329 2.5 8.0001C2.5 8.17691 2.57024 8.34648 2.69526 8.4715C2.82029 8.59653 2.98986 8.66676 3.16667 8.66676H11.9953Z"
                        fill="white"
                      />
                    </svg>
                  </button> */}
                </div>
                <div className="hidden lg:block">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5fb5eb7248b4df72a32409e8af17df8940d0be8?width=756"
                    alt="Student"
                    className="w-full h-auto max-w-md ml-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
     <Footer/>
    </div>
  );
}