import { useState } from 'react'
import { ChevronDown, X, Check } from 'lucide-react'

export default function InterestForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+254', // Default to Kenya
    idNumber: '',
    nationality: '',
    residence: '',
    educationLevel: '',
    occupation: '',
    referral: '',
    classFormat: '',
    availability: '',
    essay: '',
    consent: false
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Common country codes for Africa and other regions
  const countryCodes = [
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+256', country: 'Uganda', flag: '🇺🇬' },
    { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
    { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+212', country: 'Morocco', flag: '🇲🇦' },
    { code: '+213', country: 'Algeria', flag: '🇩🇿' },
    { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
  ]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'https://admin.mediacrestcollege.com/applications/api/scholarships/submit/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ Application submitted:', result)
      
      // Show success modal and update button state
      setIsSubmitted(true)
      setShowSuccessModal(true)

      // Reset form after showing success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        countryCode: '+254',
        idNumber: '',
        nationality: '',
        residence: '',
        educationLevel: '',
        occupation: '',
        referral: '',
        classFormat: '',
        availability: '',
        essay: '',
        consent: false
      })
    } catch (error) {
      console.error('❌ Submission failed:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  const closeModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <>
      <section className="bg-gray-50 py-[72px]">
        <div className="max-w-[1030px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-[36px] space-y-[13px]">
            <h2 className="font-poppins font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-[48px] text-mediacrest-text-black capitalize max-w-[606px] mx-auto">
              Call For Applications
            </h2>
            <p className="font-poppins text-[14px] sm:text-[15px] lg:text-[16px] leading-[28px] text-mediacrest-gray-medium max-w-[913px] mx-auto">
              Mediacrest Training College in partnership with its development partners, aims to train over 5 million digitally skilled youth and professionals in Africa by 2030.

              This 4-week program focuses on practical learning in Digital Marketing and AI, promoting innovation and digital transformation, offering hands-on experience to prepare individuals for careers in the digital economy.
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
                    />
                  </div>

                  {/* Email & Phone Row */}
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
                      />
                    </div>
                    <div className="space-y-[5px]">
                      <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                        Phone Number
                      </label>
                      <div className="flex gap-[8px]">
                        {/* Country Code Selector */}
                        <div className="relative w-[140px]">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] focus:outline-none focus:border-mediacrest-primary appearance-none bg-white"
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
                          className="flex-1 h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gender & Nationality Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
                    {/* Gender */}
                    <div className="space-y-[5px]">
                      <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          name="idNumber"
                          value={formData.idNumber}
                          onChange={handleChange}
                          className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary appearance-none bg-white"
                          required
                        >
                          <option value="">Select your gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                        <ChevronDown className="absolute right-[14px] top-1/2 transform -translate-y-1/2 w-[12px] h-[12px] text-[#9F9A9E] pointer-events-none" />
                      </div>
                    </div>

                    {/* Nationality */}
                    <div className="space-y-[5px]">
                      <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        placeholder="Enter your nationality"
                        className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* Area of Residence */}
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
                    />
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

                  {/* Occupation */}
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
                    />
                  </div>

                  {/* How did you hear about this scholarship */}
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
                    />
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
                      >
                        <option value="">Select your preferred format</option>
                        <option value="physical">Physical</option>
                        <option value="online">Online</option>
                      </select>
                      <ChevronDown className="absolute right-[14px] top-1/2 transform -translate-y-1/2 w-[12px] h-[12px] text-[#9F9A9E] pointer-events-none" />
                    </div>
                  </div>

                  {/* Availability */}
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
                      >
                        <option value="">Select your availability</option>
                        <option value="weekdays">Weekdays</option>
                        <option value="weekends">Weekends</option>
                        <option value="both">Both weekdays and weekends</option>
                      </select>
                      <ChevronDown className="absolute right-[14px] top-1/2 transform -translate-y-1/2 w-[12px] h-[12px] text-[#9F9A9E] pointer-events-none" />
                    </div>
                  </div>

                  {/* Essay */}
                  <div className="space-y-[5px]">
                    <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                      Why are you interested in this scholarship
                      programme and how will you use these skills in the future?
                    </label>
                    <textarea
                      name="essay"
                      value={formData.essay}
                      onChange={handleChange}
                      placeholder="Please provide a detailed response about your interest in digital marketing and AI, and your future plans..."
                      rows={6}
                      className="w-full px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary resize-vertical"
                      required
                    />
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
                    I declare that all the information I have provided is true and accurate to the
                    best of my knowledge.
                  </p>
                  <p className="font-poppins text-[14px] leading-[24px] text-black">
                    I consent to the collection and use of my personal information for the purpose of
                    this scholarship application.
                  </p>

                  {/* Terms and Conditions Checkbox */}
                  <div className="flex items-start gap-[12px] mt-[18px]">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-mediacrest-primary bg-gray-100 border-gray-300 rounded focus:ring-mediacrest-primary focus:ring-2"
                      required
                    />
                    <label htmlFor="consent" className="font-poppins text-[14px] leading-[24px] text-black">
                      I agree to the terms and conditions.
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-[35px]">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`transition-colors rounded-[8px] px-[22px] py-[11px] w-[220px] flex items-center justify-center gap-2 ${
                    isSubmitted 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-[#EB4823] hover:bg-[#d63e1e]'
                  }`}
                  disabled={isSubmitted}
                >
                  {isSubmitted && <Check className="w-4 h-4" />}
                  <span className="font-poppins font-bold text-[15px] leading-[26px] text-white">
                    {isSubmitted ? 'Submitted Successfully' : 'Submit Application'}
                  </span>
                </button>

                {/* Privacy Notice */}
                <div className="max-w-[790px]">
                  <p className="font-poppins text-[14px] leading-[24px]">
                    <span className="text-mediacrest-primary font-medium">Privacy Note: </span>
                    <span className="text-black">
                      Your information is strictly confidential and will only be used for your
                      scholarship application process and relevant communications. We respect your
                      privacy.
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
          <div className="bg-white rounded-[24px] max-w-md w-full mx-4 p-8 text-center relative animate-in fade-in duration-300">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
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
              Thank you!
            </h2>
            
            <p className="font-poppins text-gray-700 mb-8">
              Thank you for your enquiry. Our team will reach out with more information about our courses.
            </p>

            {/* Mediacrest Logo */}

          </div>
        </div>
      )}
    </>
  )
}