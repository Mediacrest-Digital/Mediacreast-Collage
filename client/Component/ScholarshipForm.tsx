import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function InterestForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    residence: '',
    educationLevel: '',
    occupation: '',
    referral: '',
    classFormat: '',
    availability: '',
    essay: '',
    consent: false
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
      alert('Application submitted successfully!')

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        idNumber: '',
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

  return (
    <section className="bg-gray-50 py-[72px]">
      <div className="max-w-[1030px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-[36px] space-y-[13px]">
          <h2 className="font-poppins font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-[48px] text-mediacrest-text-black capitalize max-w-[606px] mx-auto">
            Call For Applications
          </h2>
          <p className="font-poppins text-[14px] sm:text-[15px] lg:text-[16px] leading-[28px] text-mediacrest-gray-medium max-w-[913px] mx-auto">
            Mediacrest Training College in the spirit of its goal to train over 5 million digitally skilled
             professionals by 2030 is looking to train individuals interested in Digital Marketing to become 
             Digital Marketing Champions. The program emphasizes on practical learning experiences,
              fostering innovation and digital transformation.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[24px] shadow-[0_8px_16px_0_rgba(0,0,0,0.10)] p-[34px_46px] sm:p-[40px] lg:p-[34px_46px]">
          <form onSubmit={handleSubmit} className="space-y-[65px]">
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
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary"
                      required
                    />
                  </div>
                </div>

                {/* ID Number & Area of Residence Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
              {/* ID Number */}
              <div className="space-y-[5px]">
                <label className="font-poppins text-[14px] leading-[26px] text-mediacrest-gray-dark">
                  Gender
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="Gender"
                  className="w-full h-[53px] px-[14px] py-[15px] border border-mediacrest-border-light rounded-[8px] font-poppins text-[14px] leading-[24px] placeholder:text-[rgba(17,15,36,0.4)] focus:outline-none focus:border-mediacrest-primary"
                  required
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
                    />
                  </div>
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
                type="submit"
                className=" bg-[#EB4823] transition-colors rounded-[8px] px-[22px] py-[11px] w-[200px]"
              >
                <span className="font-poppins font-bold text-[15px] leading-[26px] text-white">
                  Submit Application
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
          </form>
        </div>
      </div>
    </section>
  )
}
