import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

export default function Index() {
  const [formData, setFormData] = useState({
    course: "data science",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const courseDisplayName = "Data Science";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
      // Submit to the existing external API
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
        // Also send confirmation email via our local API
        try {
          const emailResponse = await fetch("/api/application", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, course: "data science" }),
          });

          if (!emailResponse.ok) {
            console.warn("Application submitted but email confirmation failed");
          }
        } catch (emailError) {
          console.warn(
            "Application submitted but email service unavailable:",
            emailError,
          );
        }

        setFormData({
          course: "data science",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });

        setTimeout(() => {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 1500);
        }, 100);
      } else {
        setErrorMessage("Failed to submit application. Please try again.");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
            <p className="text-[14px] md:text-[16px] leading-[24px] md:leading-[28px] max-w-full md:max-w-[513px] text-[#CDCDCD]">
              Join us at Mediacrest Training College, where you'll not only
              learn the theory but also gain valuable hands-on experiences from
              our affiliate digital marketing agency,
              <span className="text-[#EB4823] underline">
                {" "}
                Mediacrest Digital
              </span>
              , that sets you apart in today's competitive job market.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="absolute left-1/2 top-[350px] md:top-[489px] transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1030px] bg-white rounded-[24px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.10)] p-[32px_24px] md:p-[52px_46px] z-20">
          <h2 className="text-black text-[24px] md:text-[28px] font-bold leading-[40px] md:leading-[54px] capitalize mb-[24px] md:mb-[32px]">
            Application Form
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-[32px] md:space-y-[40px]"
          >
            <div className="space-y-[16px] md:space-y-[18px]">
              {/* Course Field */}
              <div className="space-y-[5px]">
                <label className="text-[#5E5E5E] text-[14px] font-medium leading-[26px]">
                  Course
                </label>
                <input
                  type="text"
                  value={courseDisplayName}
                  readOnly
                  className="w-full h-[53px] px-[14px] py-[15px] border border-[rgba(145,158,171,0.32)] bg-gray-100 rounded-[8px] text-[14px] leading-[24px] text-gray-700 cursor-not-allowed"
                />
                <input type="hidden" name="course" value={formData.course} />
              </div>

              {/* First and Last Name */}
              <div className="flex flex-col md:flex-row gap-[16px] md:gap-[18px]">
                <div className="space-y-[5px] flex-1">
                  <label className="text-[#5E5E5E] text-[14px] font-medium leading-[26px]">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full h-[53px] px-[14px] py-[15px] border border-[rgba(145,158,171,0.32)] rounded-[8px] text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.40)] focus:outline-none focus:ring-2 focus:ring-[#EB4823] focus:border-[#EB4823]"
                  />
                </div>
                <div className="space-y-[5px] flex-1">
                  <label className="text-[#5E5E5E] text-[14px] font-medium leading-[26px]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full h-[53px] px-[14px] py-[15px] border border-[rgba(145,158,171,0.32)] rounded-[8px] text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.40)] focus:outline-none focus:ring-2 focus:ring-[#EB4823] focus:border-[#EB4823]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-[5px]">
                <label className="text-[#5E5E5E] text-[14px] font-medium leading-[26px]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                  className="w-full h-[53px] px-[14px] py-[15px] border border-[rgba(145,158,171,0.32)] rounded-[8px] text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.40)] focus:outline-none focus:ring-2 focus:ring-[#EB4823] focus:border-[#EB4823]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-[5px]">
                <label className="text-[#5E5E5E] text-[14px] font-medium leading-[26px]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+254712345678"
                  className="w-full h-[53px] px-[14px] py-[15px] border border-[rgba(145,158,171,0.32)] rounded-[8px] text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.40)] focus:outline-none focus:ring-2 focus:ring-[#EB4823] focus:border-[#EB4823]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center w-full md:w-[159px] px-[22px] py-[11px] rounded-[8px] transition font-bold text-[15px] leading-[26px] ${
                loading
                  ? "bg-[#ccc] text-white cursor-not-allowed"
                  : "bg-[#EB4823] hover:bg-[#d93f1f] text-white"
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
            <svg
              className="animate-spin h-8 w-8 text-[#EB4823] mb-4"
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
            <p className="text-gray-800 font-medium text-sm">
              Submitting your application...
            </p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-xl border border-green-200 flex flex-col items-center max-w-xs text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600 mb-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.23a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-green-700 font-semibold mb-2">
              Application submitted successfully!
            </p>
            <p className="text-sm text-gray-600">
              Please check your email for course details and next steps.
            </p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-xl border border-red-300 flex flex-col items-center max-w-xs text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-600 mb-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
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

      <div className="h-[700px] md:h-[800px]"></div>
      <Footer />
    </div>
  );
}
