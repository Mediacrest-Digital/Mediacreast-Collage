import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import AnnouncementBanner from "../Component/AnnouncementBanner";
import Mrnew from "../images/Mrnew.png"; 
import events from "../images/events.jpg"
export default function MasterclassApplication() {
  const [formData, setFormData] = useState({
    course: "masterclass",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    expectations: "",
  });

  const courseDisplayName = "Digital Marketing Masterclass";

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { course, firstName, lastName, email, phone } = formData;

    if (!course || !firstName || !lastName || !email || !phone) {
      setErrorMessage("Please fill in all required fields.");
      setTimeout(() => setErrorMessage(null), 2000);
      return;
    }

    setLoading(true);

    try {
      let applicationSubmitted = false;
      let localSubmitted = false;

      // Priority 1: Submit to our local API (most reliable)
      try {
        console.log("Submitting to local masterclass API...");
        const localResponse = await fetch("/api/masterclass", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (localResponse.ok) {
          console.log("Local masterclass API submission successful");
          localSubmitted = true;
        } else {
          const error = await localResponse.json();
          console.warn("Local API error:", error);
        }
      } catch (localError) {
        console.warn("Local API submission failed:", localError);
      }

      // Priority 2: Try to submit to external admin API (for admin dashboard)
      try {
        console.log("Submitting to external admin API...");
        const response = await fetch(
          "https://admin.mediacrestcollege.com/applications/api/submit/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        if (response.ok) {
          console.log("External API submission successful");
          applicationSubmitted = true;
        } else {
          const err = await response.json();
          console.warn("External API returned error:", err);
        }
      } catch (externalError) {
        console.warn("External API submission failed:", externalError);
        // This is OK - we have local backup
      }

      // Note: We don't need to call /api/application since /api/masterclass already handles email notifications
      // The masterclass route sends emails only to admin (applications@mediacrestcollege.com) as requested

      // Show success if any method worked (prioritize local submission)
      if (localSubmitted || applicationSubmitted) {
        setFormData({
          course: "masterclass",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          expectations: "",
        });

        setTimeout(() => {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }, 500);
      } else {
        setErrorMessage(
          "Unable to submit application. Please try again later or contact us directly.",
        );
        setTimeout(() => setErrorMessage(null), 5000);
      }
    } catch (error) {
      console.error("Unexpected error during form submission:", error);
      setErrorMessage(
        "An unexpected error occurred. Please try again or contact us directly at info@mediacrestcollege.com",
      );
      setTimeout(() => setErrorMessage(null), 8000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-poppins relative pt-12">
      <AnnouncementBanner />
      <Navbar />

      {/* Header Section */}
      <section className="relative">
        {/* Desktop Layout - Image and text side by side */}
        <div className="hidden md:block">
          <div className="absolute inset-0 bg-black h-[536px] top-0 z-0"></div>
          <img
            src="./client/images/graphic2.png"  
            alt="Digital Marketing Masterclass"
            className="absolute right-0 top-0 w-[1007px] h-[536px] object-cover z-0"
          />
          <div className="relative z-10 px-[70px] pt-[98px] pb-[140px]">
            <div className="flex flex-col gap-[22px] max-w-[522px]">
              <h1 className="text-white text-[48px] font-bold leading-[72px]">
                Digital Marketing Masterclass
              </h1>
              <p className="text-[16px] leading-[28px] max-w-[513px] text-[#CDCDCD]">
                Join our intensive masterclass and learn advanced digital
                marketing strategies from industry experts. Gain practical
                skills in social media marketing, content creation, SEO, and
                personal branding to accelerate your career.
              </p>
              <div className="flex flex-col gap-2 text-white">
                <div className="flex items-center gap-2">
                  <span className="text-[#EB4823]">📅</span>
                  <span>Date: Saturday, August 23, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#EB4823]">⏰</span>
                  <span>Time: 10:00 AM - 1:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#EB4823]">📍</span>
                  <span>Location: Mediacrest Training College, Nairobi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#EB4823]">💰</span>
                  <span>Investment: Ksh 4,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Image at top, text below */}
        <div className="md:hidden">
          {/* Image Section */}
          <div className="relative w-full h-[280px] sm:h-[320px]">
            <img
              src={Mrnew}
              alt="Digital Marketing Masterclass"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content Section */}
          <div className="bg-black px-4 sm:px-6 py-8 sm:py-12">
            <div className="flex flex-col gap-4 sm:gap-6">
              <h1 className="text-white text-[28px] sm:text-[36px] font-bold leading-[36px] sm:leading-[44px]">
                Digital Marketing Masterclass
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#CDCDCD]">
                Join our intensive masterclass and learn advanced digital
                marketing strategies from industry experts. Gain practical
                skills in social media marketing, content creation, SEO, and
                personal branding to accelerate your career.
              </p>
              <div className="flex flex-col gap-3 text-white text-[14px] sm:text-[16px]">
                <div className="flex items-center gap-3">
                  <span className="text-[#EB4823]">📅</span>
                  <span>Date: Saturday, August 23, 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#EB4823]">⏰</span>
                  <span>Time: 10:00 AM - 1:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#EB4823]">📍</span>
                  <span>Location: Mediacrest Training College, Nairobi</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#EB4823]">💰</span>
                  <span>Investment: Ksh 4,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section - New Design */}
      <section className="w-full bg-white py-[68px] px-4 lg:px-[82px]">
        <div className="max-w-[1441px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-[40px] p-9 bg-[#F8F3F1] border-2 border-[#EFDDD5] rounded-xl">
            {/* Left Side - Promotional Image */}
            <div className="w-full lg:w-[451px] h-[300px] lg:h-[451px] flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-sm">
              <img
                src={events}
                alt="Digital Marketing Masterclass"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Right Side - Registration Form */}
            <div className="flex flex-col gap-[17px] w-full">
              <h2 className="text-black font-bold text-2xl lg:text-[28px] leading-[54px] capitalize">
                Digital Marketing Masterclass Registration Form
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="flex flex-col gap-[18px] w-full max-w-[727px]">
                  {/* Event Field */}
                  <div className="flex flex-col gap-[5px]">
                    <label className="text-[#5E5E5E] font-medium text-sm leading-[26px]">
                      Event
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={courseDisplayName}
                        readOnly
                        className="w-full h-[53px] px-[14px] border border-[rgba(145,158,171,0.32)] rounded-lg text-sm bg-gray-100 text-gray-700 cursor-not-allowed"
                      />
                      <input
                        type="hidden"
                        name="course"
                        value={formData.course}
                      />
                    </div>
                  </div>

                  {/* First Name & Last Name Row */}
                  <div className="flex flex-col lg:flex-row gap-[18px]">
                    <div className="flex flex-col gap-[5px] flex-1">
                      <label className="text-[#5E5E5E] font-medium text-sm leading-[26px]">
                        First Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter First Name"
                          className="w-full h-[53px] px-[14px] border border-[rgba(145,158,171,0.32)] rounded-lg text-sm placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-[#EB4823]"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[5px] flex-1">
                      <label className="text-[#5E5E5E] font-medium text-sm leading-[26px]">
                        Last Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter Last Name"
                          className="w-full h-[53px] px-[14px] border border-[rgba(145,158,171,0.32)] rounded-lg text-sm placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-[#EB4823]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="flex flex-col lg:flex-row gap-[18px]">
                    <div className="flex flex-col gap-[5px] flex-1">
                      <label className="text-[#5E5E5E] font-medium text-sm leading-[26px]">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter Email Address"
                          className="w-full h-[53px] px-[14px] border border-[rgba(145,158,171,0.32)] rounded-lg text-sm placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-[#EB4823]"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[5px] flex-1">
                      <label className="text-[#5E5E5E] font-medium text-sm leading-[26px]">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter Phone Number"
                          className="w-full h-[53px] px-[14px] border border-[rgba(145,158,171,0.32)] rounded-lg text-sm placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-[#EB4823]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expectations Field */}
                  <div className="flex flex-col gap-[5px]">
                    <label className="text-[#5E5E5E] font-medium text-sm leading-[26px]">
                      What do you hope to achieve from this masterclass?
                    </label>
                    <div className="relative">
                      <textarea
                        name="expectations"
                        value={formData.expectations}
                        onChange={handleInputChange}
                        placeholder="Tell us about your learning goals and expectations..."
                        rows={4}
                        className="w-full px-[14px] py-[15px] border border-[rgba(145,158,171,0.32)] rounded-lg text-sm placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-[#EB4823] resize-vertical"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`font-semibold text-[15px] leading-[26px] px-[22px] py-[11px] rounded-lg transition-colors w-[200px] ${
                    loading
                      ? "bg-[#ccc] text-white cursor-not-allowed"
                      : "bg-[#EB4823] hover:bg-[#d93f1f] text-white"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Register Now"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl border flex flex-col items-center max-w-xs w-full text-center">
            <svg
              className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2 sm:mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="text-gray-800 font-medium text-xs sm:text-sm">
              Submitting your registration...
            </p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 px-4">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl border border-green-200 flex flex-col items-center max-w-xs w-full text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 mb-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-green-700 font-semibold text-xs sm:text-sm">
              Registration successful! Check your email for payment
              instructions.
            </p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 px-4">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl border border-red-300 flex flex-col items-center max-w-xs w-full text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 sm:h-10 sm:w-10 text-red-600 mb-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm-1 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-700 font-semibold text-xs sm:text-sm">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
