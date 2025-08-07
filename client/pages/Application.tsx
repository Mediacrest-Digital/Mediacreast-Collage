import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { ChevronDown } from "lucide-react";
import "../Application.css"
export default function Index() {
  const [formData, setFormData] = useState({
    course: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const courses = [
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'photography', label: 'Photography & Videography' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCourseSelect = (courseValue: string) => {
    setFormData(prev => ({
      ...prev,
      course: courseValue
    }));
    setDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { course, firstName, lastName, email, phone } = formData;

    if (!course || !firstName || !lastName || !email || !phone) {
      setErrorMessage("Please fill in all the fields.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://admin.mediacrestcollege.com/applications/api/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          course: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const err = await response.json();
        setErrorMessage("Failed to submit form: " + (err.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedCourse = courses.find(course => course.value === formData.course);

  return (
    <div className="min-h-screen bg-white font-poppins relative">
      <Navbar />

      {/* Header Section */}
      <section className="relative">
        <div className="uk absolute inset-0 bg-black h-[400px] md:h-[536px] top-0 z-0"></div>
        
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4699432c85f5209ac57325d012822c6052107235?width=2014"
          alt="Students group photo"
          className="Appimg absolute right-0 top-0 w-full  md:w-[1007px] h-[400px] md:h-[536px] object-cover z-0"
        />
        <div className="opApp"></div>
        <div className="relative z-10 px-4 md:px-[70px] pt-[60px] md:pt-[98px] pb-[100px] md:pb-[140px]">
          <div className="flex flex-col gap-[16px] md:gap-[22px] max-w-full md:max-w-[522px]">
            <h1 className="text-white text-[32px] md:text-[48px] font-bold leading-[40px] md:leading-[72px]">
              Apply Today!
            </h1>
            <p className="text-[14px] md:text-[16px] leading-[24px] md:leading-[28px] max-w-full md:max-w-[513px] text-white">
              Join us at Mediacrest Training College, where you'll not only learn the theory but also gain valuable hands-on experiences from our affiliate digital marketing agency,
              <span className="text-[#EB4823] underline"> Mediacrest Digital</span>, that sets you apart in today's competitive job market.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="absolute left-1/2 top-[350px] md:top-[489px] transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1030px] bg-white rounded-[24px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.10)] p-[32px_24px] md:p-[52px_46px] z-20">
          <h2 className="text-black text-[24px] md:text-[28px] font-bold leading-[40px] md:leading-[54px] capitalize mb-[24px] md:mb-[32px]">
            Application Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-[32px] md:space-y-[40px]">
            <div className="space-y-[16px] md:space-y-[18px]">
              {/* Custom Select Course */}
              <div className="space-y-[5px]">
                <label className="text-[#5E5E5E] text-[14px] font-medium leading-[26px]">Select Course</label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full h-[53px] px-[14px] py-[15px] border border-[rgba(145,158,171,0.32)] rounded-[8px] text-[14px] leading-[24px] text-left bg-transparent focus:outline-none focus:ring-2 focus:ring-[#EB4823] focus:border-[#EB4823] flex items-center justify-between"
                  >
                    <span className={selectedCourse ? "text-black" : "text-[rgba(17,15,36,0.40)]"}>
                      {selectedCourse ? selectedCourse.label : "Select"}
                    </span>
                    <ChevronDown className={`w-[12px] h-[12px] text-[#9F9A9E] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[rgba(145,158,171,0.32)] rounded-[8px] shadow-lg z-50 max-h-48 overflow-y-auto">
                      {courses.map((course, index) => (
                        <button
                          key={course.value}
                          type="button"
                          onClick={() => handleCourseSelect(course.value)}
                          className={`w-full px-[14px] py-[12px] text-left text-[14px] leading-[24px] text-black hover:bg-[#EB4823] hover:text-white transition-colors ${
                            index === 0 ? 'rounded-t-[8px]' : ''
                          } ${
                            index === courses.length - 1 ? 'rounded-b-[8px]' : ''
                          }`}
                        >
                          {course.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Names */}
              <div className="flex flex-col md:flex-row gap-[16px] md:gap-[18px]">
                <div className="flex-1 space-y-[5px]">
                  <label htmlFor="firstName" className="text-[#5E5E5E] text-[14px] font-medium leading-[26px]">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter First Name"
                    className="w-full h-[53px] px-[14px] py-[15px] border border-[rgba(145,158,171,0.32)] rounded-[8px] text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.40)] focus:outline-none focus:ring-2 focus:ring-[#EB4823] focus:border-transparent"
                  />
                </div>
                <div className="flex-1 space-y-[5px]">
                  <label htmlFor="lastName" className="text-[#5E5E5E] text-[14px] font-medium leading-[26px]">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter Last Name"
                    className="w-full h-[53px] px-[14px] py-[15px] border border-[rgba(145,158,171,0.32)] rounded-[8px] text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.40)] focus:outline-none focus:ring-2 focus:ring-[#EB4823] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="flex flex-col md:flex-row gap-[16px] md:gap-[18px]">
                <div className="flex-1 space-y-[5px]">
                  <label htmlFor="email" className="text-[#5E5E5E] text-[14px] font-medium leading-[26px]">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Email Address"
                    className="w-full h-[53px] px-[14px] py-[15px] border border-[rgba(145,158,171,0.32)] rounded-[8px] text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.40)] focus:outline-none focus:ring-2 focus:ring-[#EB4823] focus:border-transparent"
                  />
                </div>
                <div className="flex-1 space-y-[5px]">
                  <label htmlFor="phone" className="text-[#5E5E5E] text-[14px] font-medium leading-[26px]">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter Phone Number"
                    className="w-full h-[53px] px-[14px] py-[15px] border border-[rgba(145,158,171,0.32)] rounded-[8px] text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.40)] focus:outline-none focus:ring-2 focus:ring-[#EB4823] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full md:w-[159px] px-[22px] py-[11px] bg-[#EB4823] rounded-[8px] hover:bg-[#d93f1f] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-white text-[15px] font-bold leading-[26px]">
                {loading ? "Submitting..." : "Submit"}
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-xl border border-green-200 flex flex-col items-center max-w-xs text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 mb-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-green-700 font-semibold">Form submitted successfully!</p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-xl border border-red-300 flex flex-col items-center max-w-xs text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600 mb-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm-1 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-700 font-semibold">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 flex flex-col items-center max-w-xs text-center">
            <svg className="animate-spin h-8 w-8 text-[#EB4823] mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p className="text-gray-700 font-medium">Submitting form...</p>
          </div>
        </div>
      )}

      <div className="h-[700px] md:h-[800px]"></div>
      <Footer />
    </div>
  );
}