import React, { useState } from "react";
import "../coursedropdown.css"; // keep your styles

type FAQItem = {
  question: string;
  answer: string;
};
const faqData: FAQItem[] = [
  {
    question: "Do I need prior graphic design experience to join?",
    answer:
      "No prior experience is necessary. Our course is designed for complete beginners as well as those looking to sharpen their design skills.",
  },
  {
    question: "What tools and software will I learn to use?",
    answer:
      "You'll gain hands-on experience with industry-standard tools like Adobe Photoshop, Illustrator, InDesign, Figma, Canva, and CorelDRAW.",
  },
  {
    question: "What topics are covered in the course curriculum?",
    answer:
      "The curriculum includes design principles, typography, color theory, branding, logo design, digital illustration, layout design, and portfolio development.",
  },
  {
    question: "What career opportunities are available after completing the course?",
    answer:
      "Graduates can work as graphic designers, UI/UX designers, brand designers, visual content creators, or freelancers in creative agencies and businesses.",
  },
  {
    question: "Can I work internationally with this qualification?",
    answer:
      "Yes, the skills taught are globally applicable, and you’ll build a professional portfolio that can help you secure freelance or full-time opportunities worldwide.",
  },
  {
    question: "When are the next intakes for the Graphic Design Certification Course?",
    answer:
      "We offer three intakes annually — in January, May, and September — giving you flexibility to enroll at your preferred time.",
  },
  {
    question: "How can I visit the campus or get more information?",
    answer:
      "You can schedule a campus tour or attend an info session by contacting our admissions team via phone, email, or our official website.",
  },
];


const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
<section className="dropDownT bg-[#F0F0F0]" >
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
    </div></section>
  );
};

export default FAQAccordion;
