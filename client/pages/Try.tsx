import { useState } from "react";
import { ChevronUp, ChevronDown, Linkedin } from "lucide-react";
import Img7 from "../images/hurmphry.png"; // Adjust the path as necessary
import "../Try.css"


const ProfileCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDescription = () => setIsOpen(!isOpen);

  return (
<div className="bg-[#f8f3f1] h-auto md:h-[500px] flex flex-col items-center justify-center px-4 py-10">

      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Course Leader & Technical Mentor
      </h2>

      <div className="HumpheryO bg-white shadow-md rounded-2xl p-6 w-100  relative transition-all duration-200">
        <div className="flex items-center gap-4">
         
        <img className="imghum" src= {Img7} alt="#" />
        
          <div>
            <h3 className=" text-xl font-bold text-gray-900">
              Humphrey Otwande
            </h3>
            <p className="text-gray-600">Head of Faculty, Digital Marketing</p>
<a
  href="https://www.linkedin.com/in/humphrey-otwande"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-1 inline-block"
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
    alt="LinkedIn"
    className="w-6 h-6 object-contain transition-transform hover:scale-110"
  />
</a>

          </div>
        </div>

        {isOpen && (
          <p className="mt-4 text-gray-700 transition-all duration-300">
Humphrey Otwande is a professional in the digital industry with over six years of experience, recognized as a game changer in the digital marketing landscape. With a proven track record of leading impactful campaigns and driving digital transformation across various sectors. His deep understanding of digital trends and consumer behavior has positioned him as a trusted expert in the industry.
<br></br>Humphrey is passionate about nurturing the next generation of digital marketers.
 He finds his greatest fulfillment in delivering dynamic in-person and online training sessions, facilitating insightful workshops, and developing practical learning materials. His mission is to empower individuals and teams with the tools and knowledge they need to thrive in the fast-evolving digital world. Through his mentorship and educational efforts, Humphrey continues to shape the future of digital marketing.

          </p>
        )}

        <button
          onClick={toggleDescription}
          className="absolute top-6 right-6 bg-white border shadow-sm rounded-full p-2 hover:bg-gray-100 transition"
        >
          {isOpen ? (
            <ChevronUp className="text-red-500" />
          ) : (
            <ChevronDown className="text-red-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
