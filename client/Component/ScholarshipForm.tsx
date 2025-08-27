import { useState, useCallback, useMemo } from "react";
import { ChevronDown, X, Check, AlertCircle } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function InterestForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+254", // Default to Kenya
    gender: "",
    nationality: "",
    residence: "",
    educationLevel: "",
    occupation: "",
    referral: "",
    classFormat: "",
    availability: "",
    essay: "",
    consent: false,
  });

  type ErrorState = {
    fullName?: string;
    email?: string;
    phone?: string;
    gender?: string;
    nationality?: string;
    residence?: string;
    educationLevel?: string;
    occupation?: string;
    referral?: string;
    classFormat?: string;
    availability?: string;
    essay?: string;
    consent?: string;
  };

  const [errors, setErrors] = useState<ErrorState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized country codes to prevent re-renders
  const countryCodes = useMemo(() => [
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+256", country: "Uganda", flag: "🇺🇬" },
    { code: "+255", country: "Tanzania", flag: "🇹🇿" },
    { code: "+250", country: "Rwanda", flag: "🇷🇼" },
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+233", country: "Ghana", flag: "🇬🇭" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
    { code: "+20", country: "Egypt", flag: "🇪🇬" },
    { code: "+212", country: "Morocco", flag: "🇲🇦" },
    { code: "+213", country: "Algeria", flag: "🇩🇿" },
    { code: "+216", country: "Tunisia", flag: "🇹🇳" },
    { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+86", country: "China", flag: "🇨🇳" },
  ], []);

  // Initialize EmailJS once
  const emailJSInitialized = useMemo(() => {
    try {
      emailjs.init("XkzkD_egV2tjuN5PC");
      return true;
    } catch (error) {
      console.warn("EmailJS initialization failed:", error);
      return false;
    }
  }, []);

  // Optimized validation with early returns
  const validateForm = useCallback(() => {
    const newErrors: ErrorState = {};
    let hasErrors = false;

    // Check required fields with early exit
    const requiredFields = [
      { field: 'fullName', message: 'Full name is required' },
      { field: 'gender', message: 'Gender is required' },
      { field: 'nationality', message: 'Nationality is required' },
      { field: 'residence', message: 'Area of residence is required' },
      { field: 'educationLevel', message: 'Level of education is required' },
      { field: 'occupation', message: 'Occupation is required' },
      { field: 'referral', message: 'Please tell us how you heard about this scholarship' },
      { field: 'classFormat', message: 'Mode of study is required' },
      { field: 'availability', message: 'Availability is required' }
    ];

    // Batch validate required fields
    requiredFields.forEach(({ field, message }) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = message;
        hasErrors = true;
      }
    });

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      hasErrors = true;
    }

    // Validate email with regex
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    // Validate essay
    if (!formData.essay.trim()) {
      newErrors.essay = "Essay response is required";
      hasErrors = true;
    } else if (formData.essay.trim().length < 5) {
      newErrors.essay = "Please provide a more detailed response (at least 5 characters)";
      hasErrors = true;
    }

    // Validate consent
    if (!formData.consent) {
      newErrors.consent = "You must agree to the terms and conditions";
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  }, [formData]);

  // Optimized change handler
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));

    // Clear error immediately for better UX
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  // Optimized email sending with timeout
  const sendEmailJS = useCallback(async (templateParams: any) => {
    if (!emailJSInitialized) {
      return { success: false, error: "EmailJS not initialized" };
    }

    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email timeout')), 10000)
      );

      const emailPromise = emailjs.send(
        'service_5zhcskd',
        'template_q7xn15w',
        templateParams
      );

      const result = await Promise.race([emailPromise, timeoutPromise]);
      return { success: true, result };
    } catch (error) {
      return { success: false, error };
    }
  }, [emailJSInitialized]);

  // Optimized submit handler with parallel processing
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      // Quick scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare email template params early
      const [firstName, ...lastNameParts] = formData.fullName.split(" ");
      const templateParams = {
        to_email: formData.email,
        to_name: firstName,
        full_name: formData.fullName,
        phone: `${formData.countryCode}${formData.phone}`,
        gender: formData.gender,
        nationality: formData.nationality,
        residence: formData.residence,
        education_level: formData.educationLevel,
        occupation: formData.occupation,
        referral: formData.referral,
        class_format: formData.classFormat,
        availability: formData.availability,
        essay: formData.essay,
        reply_to: formData.email,
        from_name: "Mediacrest Scholarship Applications",
        pdf_download_link: "https://drive.google.com/file/d/1oLr3DyuLEi7CpQEe7dbZY9CNwkWdfunx/preview",
        document_title: "Scholarship Program Details"
      };

      // Start both operations in parallel
      const [applicationResult, emailResult] = await Promise.allSettled([
        // Application submission
        fetch("https://admin.mediacrestcollege.com/applications/api/scholarships/submit/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error(`Application submission failed: ${response.status}`);
          }
          return response.json();
        }),
        
        // Email sending
        sendEmailJS(templateParams)
      ]);

      // Check application submission result
      if (applicationResult.status === 'rejected') {
        throw new Error(applicationResult.reason);
      }

      console.log("✅ Application submitted successfully");
      
      // Log email result (but don't fail if email fails)
      if (emailResult.status === 'fulfilled' && emailResult.value.success) {
        console.log("✅ Email sent successfully");
      } else {
        console.warn("⚠️ Email sending failed, but application was successful");
      }

      // Update UI immediately
      setIsSubmitted(true);
      setShowSuccessModal(true);

      // Reset form in background
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          countryCode: "+254",
          gender: "",
          nationality: "",
          residence: "",
          educationLevel: "",
          occupation: "",
          referral: "",
          classFormat: "",
          availability: "",
          essay: "",
          consent: false,
        });
        setErrors({});
      }, 100);

    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("Something went wrong while submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, errors, sendEmailJS]);

  const closeModal = useCallback(() => {
    setShowSuccessModal(false);
  }, []);

  // Memoized class name generators
  const getInputClassName = useCallback((fieldName: keyof ErrorState) => {
    const baseClass = "w-full h-[53px] px-[14px] py-[15px] border rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none";
    const errorClass = errors[fieldName] ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500";
    return `${baseClass} ${errorClass}`;
  }, [errors]);

  const getSelectClassName = useCallback((fieldName: keyof ErrorState) => {
    const baseClass = "w-full h-[53px] px-[14px] py-[15px] border rounded-[8px] font-poppins text-[14px] leading-[24px] text-[rgba(17,15,36,0.4)] focus:outline-none appearance-none bg-white";
    const errorClass = errors[fieldName] ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500";
    return `${baseClass} ${errorClass}`;
  }, [errors]);

  const getTextareaClassName = useCallback((fieldName: keyof ErrorState) => {
    const baseClass = "w-full px-[14px] py-[15px] border rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none resize-vertical";
    const errorClass = errors[fieldName] ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500";
    return `${baseClass} ${errorClass}`;
  }, [errors]);

  return (
    <>
      <section className="bg-gray-50 py-[72px]">
        <div className="max-w-[1030px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-[36px] space-y-[13px]">
            <h2 className="font-poppins font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-[48px] text-black capitalize max-w-[606px] mx-auto">
              Call For Applications
            </h2>
            <p className="font-poppins text-[14px] sm:text-[15px] lg:text-[16px] leading-[28px] text-gray-600 max-w-[913px] mx-auto">
              Mediacrest Training College in partnership with its development
              partners, aims to train over 5 million digitally skilled youth and
              professionals in Africa by 2030. This 4-week program focuses on
              practical learning in Digital Marketing and AI, promoting
              innovation and digital transformation, offering hands-on
              experience to prepare individuals for careers in the digital
              economy.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-[24px] shadow-[0_8px_16px_0_rgba(0,0,0,0.10)] p-[34px_46px] sm:p-[40px] lg:p-[34px_46px]">
            <div className="space-y-[65px]">
              {/* Personal Information Section */}
              <div className="space-y-[13px]">
                <h3 className="font-poppins font-bold text-[20px] leading-[54px] text-black capitalize">
                  Personal Information
                </h3>

                <div className="space-y-[18px]">
                  {/* Full Name */}
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={getInputClassName("fullName")}
                      required
                    />
                    {errors.fullName && (
                      <div className="flex items-center gap-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.fullName}</span>
                      </div>
                    )}
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
                    <div className="space-y-[5px]">
                      <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className={getInputClassName("email")}
                        required
                      />
                      {errors.email && (
                        <div className="flex items-center gap-1 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-[5px]">
                      <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                        Phone Number
                      </label>
                      <div className="flex gap-[8px]">
                        {/* Country Code Selector */}
                        <div className="relative w-[140px]">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="w-full h-[53px] px-[14px] py-[15px] border border-gray-300 rounded-[8px] font-poppins text-[14px] leading-[24px] focus:outline-none focus:border-blue-500 appearance-none bg-white"
                          >
                            {countryCodes.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.flag} {country.code}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-[14px] top-1/2 transform -translate-y-1/2 w-[12px] h-[12px] text-[#9F9A9E] pointer-events-none" />
                        </div>
                        {/* Phone Number Input */}
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className={`flex-1 h-[53px] px-[14px] py-[15px] border rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none ${errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                          required
                        />
                      </div>
                      {errors.phone && (
                        <div className="flex items-center gap-1 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gender & Nationality Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
                    {/* Gender */}
                    <div className="space-y-[5px]">
                      <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={getSelectClassName("gender")}
                          required
                        >
                          <option value="">Select your gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="prefer-not-to-say">
                            Prefer not to say
                          </option>
                        </select>
                        <ChevronDown className="absolute right-[14px] top-1/2 transform -translate-y-1/2 w-[12px] h-[12px] text-[#9F9A9E] pointer-events-none" />
                      </div>
                      {errors.gender && (
                        <div className="flex items-center gap-1 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.gender}</span>
                        </div>
                      )}
                    </div>

                    {/* Nationality */}
                    <div className="space-y-[5px]">
                      <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        placeholder="Enter your nationality"
                        className={getInputClassName("nationality")}
                        required
                      />
                      {errors.nationality && (
                        <div className="flex items-center gap-1 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.nationality}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Area of Residence */}
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                      Area of Residence
                    </label>
                    <input
                      type="text"
                      name="residence"
                      value={formData.residence}
                      onChange={handleChange}
                      placeholder="Enter your area of residence"
                      className={getInputClassName("residence")}
                      required
                    />
                    {errors.residence && (
                      <div className="flex items-center gap-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.residence}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic & Professional Information Section */}
              <div className="space-y-[13px]">
                <h3 className="font-poppins font-bold text-[20px] leading-[54px] text-black capitalize">
                  Academic & Professional Information
                </h3>

                <div className="space-y-[18px]">
                  {/* Level of Education */}
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                      Level of Education
                    </label>
                    <div className="relative">
                      <select
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleChange}
                        className={getSelectClassName("educationLevel")}
                        required
                      >
                        <option value="">Select your level of education</option>
                        <option value="high-school">High School</option>
                        <option value="college-diploma">College Diploma</option>
                        <option value="bachelors-degree">
                          Bachelor's Degree
                        </option>
                        <option value="masters-degree">Master's Degree</option>
                        <option value="doctorate">Doctorate</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-[14px] top-1/2 transform -translate-y-1/2 w-[12px] h-[12px] text-[#9F9A9E] pointer-events-none" />
                    </div>
                    {errors.educationLevel && (
                      <div className="flex items-center gap-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.educationLevel}</span>
                      </div>
                    )}
                  </div>

                  {/* Occupation */}
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Enter your current occupation"
                      className={getInputClassName("occupation")}
                      required
                    />
                    {errors.occupation && (
                      <div className="flex items-center gap-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.occupation}</span>
                      </div>
                    )}
                  </div>

                  {/* How did you hear about this scholarship */}
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                      How did you hear about this scholarship?
                    </label>
                    <input
                      type="text"
                      name="referral"
                      value={formData.referral}
                      onChange={handleChange}
                      placeholder="e.g., Social Media, Referral, Website, etc."
                      className={getInputClassName("referral")}
                      required
                    />
                    {errors.referral && (
                      <div className="flex items-center gap-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.referral}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Program Preferences Section */}
              <div className="space-y-[13px]">
                <h3 className="font-poppins font-bold text-[20px] leading-[54px] text-black capitalize">
                  Program Preferences
                </h3>

                <div className="space-y-[18px]">
                  {/* Preferred Class Format */}
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                      Mode of Study
                    </label>
                    <div className="relative">
                      <select
                        name="classFormat"
                        value={formData.classFormat}
                        onChange={handleChange}
                        className={getSelectClassName("classFormat")}
                        required
                      >
                        <option value="">Select your preferred format</option>
                        <option value="physical">Physical</option>
                        <option value="online">Online</option>
                      </select>
                      <ChevronDown className="absolute right-[14px] top-1/2 transform -translate-y-1/2 w-[12px] h-[12px] text-[#9F9A9E] pointer-events-none" />
                    </div>
                    {errors.classFormat && (
                      <div className="flex items-center gap-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.classFormat}</span>
                      </div>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                      Availability
                    </label>
                    <div className="relative">
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        className={getSelectClassName("availability")}
                        required
                      >
                        <option value="">Select your availability</option>
                        <option value="weekdays">Weekdays</option>
                        <option value="weekends">Weekends</option>
                        <option value="both">Both weekdays and weekends</option>
                      </select>
                      <ChevronDown className="absolute right-[14px] top-1/2 transform -translate-y-1/2 w-[12px] h-[12px] text-[#9F9A9E] pointer-events-none" />
                    </div>
                    {errors.availability && (
                      <div className="flex items-center gap-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.availability}</span>
                      </div>
                    )}
                  </div>

                  {/* Essay */}
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-gray-700">
                      Why are you interested in this scholarship program and how
                      will you use these skills in the future?
                    </label>
                    <textarea
                      name="essay"
                      value={formData.essay}
                      onChange={handleChange}
                      placeholder="Please provide a detailed response about your interest in digital marketing and AI, and your future plans..."
                      rows={6}
                      className={getTextareaClassName("essay")}
                      required
                    />
                    {errors.essay && (
                      <div className="flex items-center gap-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.essay}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Declaration and Consent Section */}
              <div className="space-y-[13px]">
                <h3 className="font-poppins font-bold text-[20px] leading-[54px] text-black capitalize">
                  Declaration and Consent
                </h3>

                <div className="space-y-[18px]">
                  <p className="font-poppins text-[14px] leading-[24px] text-black">
                    I declare that all the information I have provided is true
                    and accurate to the best of my knowledge.
                  </p>
                  <p className="font-poppins text-[14px] leading-[24px] text-black">
                    I consent to the collection and use of my personal
                    information for the purpose of this scholarship application.
                  </p>

                  {/* Terms and Conditions Checkbox */}
                  <div className="space-y-[5px]">
                    <div className="flex items-start gap-[12px] mt-[18px]">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        required
                      />
                      <label
                        htmlFor="consent"
                        className="font-poppins text-[14px] leading-[24px] text-black"
                      >
                        I agree to the terms and conditions.
                      </label>
                    </div>
                    {errors.consent && (
                      <div className="flex items-center gap-1 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.consent}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-[35px]">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || isSubmitted}
                  className={`transition-colors duration-200 rounded-[8px] px-[22px] py-[11px] w-[220px] flex items-center justify-center gap-2 ${
                    isSubmitted
                      ? "bg-green-600 hover:bg-green-700"
                      : isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#EB4823] hover:bg-[#d63e1e] active:bg-[#c23419]"
                  }`}
                >
                  {isSubmitting && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {isSubmitted && <Check className="w-4 h-4" />}
                  <span className="font-poppins font-bold text-[15px] leading-[26px] text-white">
                    {isSubmitting
                      ? "Submitting..."
                      : isSubmitted
                      ? "Submitted Successfully"
                      : "Submit Application"}
                  </span>
                </button>

                {/* Privacy Notice */}
                <div className="max-w-[790px]">
                  <p className="font-poppins text-[14px] leading-[24px]">
                    <span className="text-[#EB4823] font-medium">
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
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full mx-4 p-8 text-center relative transform transition-all duration-300 scale-100 opacity-100">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Thank You Message */}
            <h2 className="font-poppins font-bold text-2xl text-[#EB4823] mb-4">
              Application Submitted Successfully!
            </h2>

            <p className="font-poppins text-gray-700 mb-8">
              Thank you for your application. Our admissions team will reach out to you shortly on the next steps.
            </p>

            <button
              onClick={closeModal}
              className="bg-[#EB4823] hover:bg-[#d63e1e] text-white font-poppins font-medium px-6 py-2 rounded-[8px] transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}