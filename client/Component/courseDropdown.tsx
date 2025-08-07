import React, { useState } from "react";
import "../coursedropdown.css"; // keep your styles

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "Is prior digital marketing experience required?",
    answer:
      "No prior experience is needed. This course is designed for both beginners and professionals looking to enhance their skills in the digital marketing landscape.",
  },
  {
    question: "What software and tools are used in the course?",
    answer:
      "Our curriculum includes industry-standard software and tools for social media management, content creation, SEO, and online advertising."  
  },
  {
    question: "What topics are covered in the course curriculum?",
    answer:
      "The curriculum covers social media management, content creation, paid advertising, search engine optimization (SEO), and online advertising, providing a comprehensive understanding of digital marketing.",
  },
  {
    question: "What career opportunities can I expect after completing the program?",
    answer:
      "Graduates often pursue roles like digital marketing specialist, SEO analyst, content strategist, PPC manager, or social media marketer in various industries.",
  },
  {
    question: "Can I work internationally with this qualification?",
    answer:
      "Yes, the skills and certifications acquired are globally relevant, allowing you to work with international clients or companies across the globe.",
  },
  {
    question: "How often do you offer intakes for the Digital Marketing Certification Course?",
    answer:
      "We offer new intakes three times a year — January, May, and September — allowing flexibility in planning your enrollment and study schedule.",
  },
  {
    question: "How can I schedule a campus tour or learn more about the program?",
    answer:
      "You can contact our admissions office via phone or email to book a tour or attend an info session. Details are available on our website.",
  },
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="dropDownT bg-[#F0F0F0]">
  <div className=".FAQST">

          <h2 className="text-3xl md:text-4xl font-bold text-[#170602] text-center mb-12">
            Frequently Asked Questions
          </h2>
        </div>
   
    <div className="dropDownT space-y-4">
      {faqData.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={`contDrop rounded-[25px] shadow transition-all duration-200 ${
              isOpen ? "bg-mediacrest-orange" : "bg-white"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className={`btnDrop w-full flex justify-between items-center p-4 text-left transition-colors duration-200 ${
                isOpen ? "text-white" : "text-gray-800"
              }`}
            >
              <span className="font-semibold text-base">{item.question}</span>
              <span
                className={`text-2xl font-bold transition-colors duration-200 ${
                  isOpen ? "text-white" : "text-mediacrest-orange"
                }`}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm text-white leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div> </section>
  );
};

export default FAQAccordion;
