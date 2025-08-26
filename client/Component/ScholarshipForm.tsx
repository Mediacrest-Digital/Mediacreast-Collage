import { useState } from "react";
import { ChevronDown, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ScholarshipForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    residence: "",
    educationLevel: "",
    occupation: "",
    referral: "",
    classFormat: "",
    availability: "",
    essay: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const showAlert = (message, type = "success") => {
    setAlertMessage({ message, type });
    setTimeout(() => setAlertMessage(null), 5000);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Submit application to local backend API (uses Nodemailer)
      const response = await fetch("/api/scholarship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Application submission failed: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Application submitted:", result);

      showAlert(
        "Scholarship application submitted successfully! Check your email for confirmation.",
        "success"
      );

      // Reset form after submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        idNumber: "",
        residence: "",
        educationLevel: "",
        occupation: "",
        referral: "",
        classFormat: "",
        availability: "",
        essay: "",
        consent: false,
      });
    } catch (error) {
      console.error("❌ Submission failed:", error);
      showAlert(
        `Something went wrong with the application submission: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const AlertModal = ({ message, type, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 ${type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {type === 'success' ? (
                <CheckCircle size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
            </div>
            <div className="flex-1">
              <h3 className={`font-poppins font-semibold text-lg mb-2 ${
                type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {type === 'success' ? 'Success!' : 'Error'}
              </h3>
              <p className="font-poppins text-gray-700 text-sm leading-relaxed">
                {message}
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className={`px-6 py-2 rounded-lg font-poppins font-medium text-sm transition-colors ${
                type === 'success'
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="bg-gray-50 py-[72px]">
        <div className="max-w-[1030px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-[36px] space-y-[13px]">
            <h2 className="font-poppins font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-[48px] text-mediacrest-text-black capitalize max-w-[606px] mx-auto">
              Call For Applications
            </h2>
          </div>

          <div className="space-y-[36px]">
            <div className="space-y-[13px]">
              <h3 className="font-poppins font-bold text-[20px] leading-[54px] text-black capitalize">
                Personal Information
              </h3>
              <div className="space-y-[18px]">
                <div className="space-y-[5px]">
                  <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                      Gender
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleChange}
                      placeholder="Enter your gender"
                      className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                      Area of Residence
                    </label>
                    <input
                      type="text"
                      name="residence"
                      value={formData.residence}
                      onChange={handleChange}
                      placeholder="Enter your area of residence"
                      className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-[13px]">
              <h3 className="font-poppins font-bold text-[20px] leading-[54px] text-black capitalize">
                Academic & Professional Information
              </h3>
              <div className="space-y-[18px]">
                <div className="space-y-[5px]">
                  <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                    Level of Education
                  </label>
                  <div className="relative">
                    <select
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleChange}
                      className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary appearance-none bg-white"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select your level of education</option>
                      <option value="high-school">High School</option>
                      <option value="college-diploma">College Diploma</option>
                      <option value="bachelors-degree">Bachelor's Degree</option>
                      <option value="masters-degree">Master's Degree</option>
                      <option value="doctorate">Doctorate</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-[14px] top-1/2 transform -translate-y-1/2 w-[12px] h-[12px] text-[#9F9A9E] pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-[5px]">
                  <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Enter your current occupation"
                    className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-[5px]">
                  <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                    How did you hear about this scholarship?
                  </label>
                  <input
                    type="text"
                    name="referral"
                    value={formData.referral}
                    onChange={handleChange}
                    placeholder="e.g., Social Media, Referral, Website, etc."
                    className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-[13px]">
              <h3 className="font-poppins font-bold text-[20px] leading-[54px] text-black capitalize">
                Program Preferences
              </h3>
              <div className="space-y-[18px]">
                <div className="space-y-[5px]">
                  <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                    Mode of Study
                  </label>
                  <div className="relative">
                    <select
                      name="classFormat"
                      value={formData.classFormat}
                      onChange={handleChange}
                      className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary appearance-none bg-white"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select your preferred format</option>
                      <option value="physical">Physical</option>
                      <option value="online">Online</option>
                    </select>
                    <ChevronDown className="absolute right-[14px] top-1/2 transform -translate-y-1/2 w-[12px] h-[12px] text-[#9F9A9E] pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-[5px]">
                  <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                    Availability
                  </label>
                  <div className="relative">
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary appearance-none bg-white"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select your availability</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="both">Both weekdays and weekends</option>
                    </select>
                    <ChevronDown className="absolute right-[14px] top-1/2 transform -translate-y-1/2 w-[12px] h-[12px] text-[#9F9A9E] pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-[5px]">
                  <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                    Why are you interested in this scholarship programme and how
                    will you use these skills in the future?
                  </label>
                  <textarea
                    name="essay"
                    value={formData.essay}
                    onChange={handleChange}
                    placeholder="Please provide a detailed response about your interest in digital marketing and AI, and your future plans..."
                    rows={6}
                    className="w-full px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary resize-vertical"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-[13px]">
              <h3 className="font-poppins font-bold text-[20px] leading-[54px] text-black capitalize">
                Declaration and Consent
              </h3>
              <div className="space-y-[18px]">
                <p className="font-poppins text-[14px] leading-[24px] text-black">
                  I declare that all the information I have provided is true and
                  accurate to the best of my knowledge.
                </p>
                <p className="font-poppins text-[14px] leading-[24px] text-black">
                  I consent to the collection and use of my personal information
                  for the purpose of this scholarship application.
                </p>
                <div className="flex items-start gap-[12px] mt-[18px]">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-mediacrest-primary bg-gray-100 border-gray-300 rounded focus:ring-mediacrest-primary focus:ring-2"
                    required
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="consent"
                    className="font-poppins text-[14px] leading-[24px] text-black"
                  >
                    I agree to the terms and conditions.
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-[35px]">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`transition-all duration-200 rounded-[8px] px-[22px] py-[11px] w-[200px] flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed transform scale-95' 
                    : 'bg-[#EB4823] hover:bg-[#d63f1e] hover:transform hover:scale-105 active:scale-100 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="font-poppins font-bold text-[15px] leading-[26px] text-white">
                      Submitting...
                    </span>
                  </>
                ) : (
                  <span className="font-poppins font-bold text-[15px] leading-[26px] text-white">
                    Submit Application
                  </span>
                )}
              </button>
              <div className="max-w-[790px]">
                <p className="font-poppins text-[14px] leading-[24px]">
                  <span className="text-mediacrest-primary font-medium">
                    Privacy Note:{" "}
                  </span>
                  <span className="text-black">
                    Your information is strictly confidential and will only be
                    used for your scholarship application process and relevant
                    communications. We respect your privacy.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {alertMessage && (
        <AlertModal
          message={alertMessage.message}
          type={alertMessage.type}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </>
  );
}