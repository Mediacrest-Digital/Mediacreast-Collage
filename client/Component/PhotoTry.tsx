import { useState } from "react";
import { ChevronUp, ChevronDown, Linkedin } from "lucide-react";
import Img7 from "../images/elizapic.jpg"; // Adjust the path as necessary
import "../Try.css"; // Ensure this CSS file is imported

const PhotoTry = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDescription = () => setIsOpen(!isOpen);

  return (
<div className="bg-[#f8f3f1] h-auto md:h-[500px] flex flex-col items-center justify-center px-4 py-10">

      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Course Leader & Technical Mentor
      </h2>

      <div className="HumpheryO bg-white shadow-md rounded-2xl p-6 w-100  relative transition-all duration-200">
        <div className="flex items-center gap-4">
         
        <img className="imgEliza" src= {Img7} alt="#" />
        
          <div>
            <h3 className=" text-xl font-bold text-gray-900">
              Elizabeth Muthoni
            </h3>
            <p className="text-gray-600">Head of Faculty, Photography and Videography</p>
<a
  href="https://www.instagram.com/muthonee_gichurah?igsh=bHRxcnhsbGJ6eW9j"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-1 inline-block"
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
    alt="Instagram"
    className="w-6 h-6 object-contain transition-transform hover:scale-110"
  />
</a>



          </div>
        </div>

        {isOpen && (
          <p className="mt-4 text-gray-700 transition-all duration-300">
Elizabeth Muthoni is a seasoned media trainer and journalist with over five
 years of experience in both mainstream media and academic institutions. Renowned for her dynamic approach to storytelling and content creation, Elizabeth has spearheaded powerful media campaigns, produced award-worthy documentaries, and mentored students who have
 gone on to launch their own production houses and compete in prestigious national film awards. <br />
With a deep passion for shaping future storytellers,
 Elizabeth is committed to ensuring her learners leave the classroom not just as graduates—but as industry-ready professionals. Her mission is to cultivate a generation of creative, market-ready communicators equipped with technical skill, bold originality, and a winning spirit.
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

export default PhotoTry;
