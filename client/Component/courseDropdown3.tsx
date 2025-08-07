import React, { useState } from "react";
import "../coursedropdown.css";   // keep your styles

type FAQItem = {
  question: string;
  answer: string;
};
const faqData: FAQItem[] = [
  {
    question: "Do I need my own camera to enroll in the course?",
    answer:
      "While having your own camera is helpful, it's not required. We provide access to professional photography and videography equipment during the training sessions.",
  },
  {
    question: "What equipment and software will I learn to use?",
    answer:
      "You’ll gain hands-on experience with DSLR and mirrorless cameras, lighting kits, gimbals, and editing software such as Adobe Lightroom, Photoshop, and Premiere Pro.",
  },
  {
    question: "What topics are included in the course curriculum?",
    answer:
      "The course covers composition, lighting, photo editing, color grading, storytelling, video shooting techniques, post-production, and portfolio development.",
  },
  {
    question: "What career paths can I pursue after completing the course?",
    answer:
      "Graduates can work as photographers, videographers, content creators, editors, cinematographers, or freelance media professionals across industries.",
  },
  {
    question: "Is this qualification recognized internationally?",
    answer:
      "Yes, the skills and certifications you’ll earn are industry-relevant and recognized globally, enabling you to work with international clients or studios.",
  },
  {
    question: "When do you offer intakes for the Photography & Videography Course?",
    answer:
      "New intakes are available three times a year — in January, May, and September — so you can join at a time that best fits your schedule.",
  },
  {
    question: "Can I visit the college before enrolling?",
    answer:
      "Yes! You can schedule a campus tour or attend an information session by contacting our admissions team via phone or email. Full details are available on our website.",
  },
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="dropDownT bg-[#F0F0F0]">
  <div className="">

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
            className={`contDrop rounded-lg shadow transition-all duration-200 ${
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
