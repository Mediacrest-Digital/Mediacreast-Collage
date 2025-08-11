import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "../Component/Navbar";
import Footer from "@/Component/Footer";
import "../contact.css";
import Img2 from "../images/contact.png";
import {
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  ArrowRight,
} from "lucide-react";
// Adjust the path as necessary
import Img1 from "../images/f626028b8c3a308846168904722a3aea83d1b01a.png";
export default function Index() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Validate form fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you! Your message has been sent successfully to hr@mediacrest.africa. We will get back to you soon.",
        });
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div className="homeImg4  bg-cover ">
        <img className="imgtP  " src={Img2} alt="#" />
        <div className=" opT absolute inset-0 bg-black opacity-10" />
        <div className="Ctxt relative  z-10 flex flex-col items-center  h-full text-center px-4">
          <h1 className="text-white font-poppins text-[48px] font-bold leading-[82px] mb-[7px]">
            Contact Us
          </h1>
          <p className=" text-[#D8D8D8] font-poppins text-base font-normal leading-[28px]">
            Home / Contact Us
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contactSection relative lg:-mt-[px] md:-mt-[200px] z-20 px-4 mb-20">
        <div className="max-w-[1150px] mx-auto bg-white rounded-[20px] shadow-2xl p-[17px]">
          <div className="flex flex-col lg:flex-row h-full min-h-[647px]">
            {/* Contact Information Panel */}
            <div className="lg:w-[491px] bg-[#621909] rounded-[10px] p-[57px] relative overflow-hidden">
              {/* Background circles */}
              <div className="absolute bottom-[183px] right-[-134px] w-[269px] h-[269px] bg-[#96270F] rounded-full" />
              <div className="absolute bottom-[209px] right-[-108px] w-[138px] h-[138px] bg-[#C43213] bg-opacity-50 rounded-full" />

              <div className="relative z-10 text-white">
                <h2 className="text-[28px] font-semibold mb-[44px] font-poppins">
                  Contact Information
                </h2>

                <div className="space-y-[35px]">
                  <div className="flex items-center gap-[8px] py-[12px]">
                    <Phone className="w-6 h-6" />
                    <span className="text-base font-medium">
                      +254 725 223 669
                    </span>
                  </div>

                  <div className="flex items-center gap-[8px] py-[12px]">
                    <Mail className="w-6 h-6" />
                    <span className="text-base font-medium">
                      info@mediacrestcollege.com
                    </span>
                  </div>

                  <div className="flex items-start gap-[8px] py-[12px]">
                    <MapPin className="w-6 h-6 mt-1" />
                    <span className="text-base font-medium leading-[22px] max-w-[252px]">
                      Office Suites, Block B - 3rd Floor Parklands Road -
                      Nairobi
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-[44px] mt-[215px]">
                  <Instagram className="w-6 h-6 cursor-pointer hover:opacity-80" />
                  <Linkedin className="w-6 h-6 cursor-pointer hover:opacity-80" />
                  <Facebook className="w-6 h-6 cursor-pointer hover:opacity-80" />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="flex-1 p-[30px]">
              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {submitStatus.type === "success" ? (
                        <svg
                          className="h-5 w-5 text-green-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-red-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">
                        {submitStatus.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-[18px]">
                {/* First Row - Name Fields */}
                <div className="flex flex-col sm:flex-row gap-[18px]">
                  <div className="flex-1">
                    <label className="block text-[#5E5E5E] text-sm font-medium mb-[5px]">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter First Name"
                      className="w-full h-[53px] px-[14px] border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[#5E5E5E] text-sm font-medium mb-[5px]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter Last Name"
                      className="w-full h-[53px] px-[14px] border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Second Row - Email and Phone */}
                <div className="flex flex-col sm:flex-row gap-[18px]">
                  <div className="flex-1">
                    <label className="block text-[#5E5E5E] text-sm font-medium mb-[5px]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Email Address"
                      className="w-full h-[53px] px-[14px] border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[#5E5E5E] text-sm font-medium mb-[5px]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter Phone Number"
                      className="w-full h-[53px] px-[14px] border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Third Row - Subject */}
                <div>
                  <label className="block text-[#5E5E5E] text-sm font-medium mb-[5px]">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    className="w-full h-[53px] px-[14px] border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Fourth Row - Message */}
                <div>
                  <label className="block text-[#5E5E5E] text-sm font-medium mb-[5px]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type here..."
                    rows={6}
                    className="w-full h-[172px] px-[14px] py-[23px] border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-[200px] bg-[#EB4823] hover:bg-[#EB4823]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg px-[22px] py-[11px] text-[15px] font-semibold"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[446px] relative">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/23f8686664fdeeff8d597f5ba2fc91f64723b3a0?width=2880"
          alt="Location Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
