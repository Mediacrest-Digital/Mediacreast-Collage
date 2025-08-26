import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import AnnouncementBanner from "../Component/AnnouncementBanner";

interface EventRegistrationFormData {
  eventId: string;
  eventTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  expectations: string;
}

export default function EventRegistration() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get event details from URL parameters
  const eventId = searchParams.get("eventId");
  const eventTitle = searchParams.get("title");
  const eventDate = searchParams.get("date");
  const eventTime = searchParams.get("time");
  const eventLocation = searchParams.get("location");
  const eventDescription = searchParams.get("description");

  const [formData, setFormData] = useState<EventRegistrationFormData>({
    eventId: eventId || "",
    eventTitle: eventTitle || "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    expectations: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Update form data when URL params change
  useEffect(() => {
    if (eventId && eventTitle) {
      setFormData((prev) => ({
        ...prev,
        eventId: eventId,
        eventTitle: eventTitle,
      }));
    }
  }, [eventId, eventTitle]);

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

    const { eventId, firstName, lastName, email, phone } = formData;

    if (!eventId || !firstName || !lastName || !email || !phone) {
      setErrorMessage("Please fill in all required fields.");
      setTimeout(() => setErrorMessage(null), 2000);
      return;
    }

    setLoading(true);

    try {
      // Submit to Django event registration API
      console.log("Submitting event registration to Django API...", {
        event: parseInt(eventId),
        name: `${firstName} ${lastName}`,
        email: email,
        phone: phone,
        expectations: formData.expectations,
      });

      // Use local proxy endpoint instead of external API directly
      const response = await fetch("https://admin.mediacrestcollege.com/events/api/register-event/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: parseInt(eventId),
          name: `${firstName} ${lastName}`,
          email: email,
          phone: phone,
          expectations: formData.expectations,
        }),
      });


      if (response.ok) {
        const result = await response.json();
        console.log("Event registration successful:", result);
        
        // Reset form
        setFormData({
          eventId: eventId || "",
          eventTitle: eventTitle || "",
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
        // Log the response details for debugging
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        
        let error;
        const responseText = await response.text();
        console.log("Response text:", responseText);
        
        try {
          error = JSON.parse(responseText);
        } catch (parseError) {
          // If response is not JSON (like HTML error page), create error object
          error = { 
            error: `Server returned ${response.status}: ${response.statusText}. Please check if the API endpoint exists.` 
          };
        }
        
        console.warn("Registration API error:", error);

        // Show specific error message from Django backend
        if (error.error === "Event not found") {
          setErrorMessage(
            "Event not found. This event may no longer be available for registration.",
          );
        } else if (error.error === "You are already registered for this event") {
          setErrorMessage("You are already registered for this event.");
        } else {
          setErrorMessage(error.error || "Registration failed. Please try again.");
        }
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

  // If no event details are provided, redirect back to events page
  if (!eventTitle) {
    return (
      <div className="min-h-screen bg-white pt-12">
        <AnnouncementBanner />
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Event Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The event you're trying to register for could not be found.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="bg-mediacrest-orange text-white px-6 py-3 rounded-lg hover:bg-mediacrest-orange/90 transition-colors"
          >
            Back to Events
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-poppins relative pt-12">
      <AnnouncementBanner />
      <Navbar />

      {/* Header Section */}
      <section className="relative py-16 bg-gradient-to-r from-mediacrest-navy to-mediacrest-navy/90">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Event Registration
            </h1>
            <p className="text-mediacrest-gray-300 max-w-2xl mx-auto">
              Complete the form below to register for this event
            </p>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-12 bg-mediacrest-beige">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Event Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-mediacrest-orange mb-2">
                  {eventTitle}
                </h3>
                <p className="text-gray-600 mb-4">{eventDescription}</p>
              </div>
              <div className="space-y-3">
                {eventDate && (
                  <div className="flex items-center gap-3">
                    <span className="text-mediacrest-orange">📅</span>
                    <span className="text-gray-700">
                      Date: {new Date(eventDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {eventTime && (
                  <div className="flex items-center gap-3">
                    <span className="text-mediacrest-orange">⏰</span>
                    <span className="text-gray-700">Time: {eventTime}</span>
                  </div>
                )}
                {eventLocation && (
                  <div className="flex items-center gap-3">
                    <span className="text-mediacrest-orange">📍</span>
                    <span className="text-gray-700">
                      Location: {eventLocation}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Registration Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Field (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event
                  </label>
                  <input
                    type="text"
                    value={eventTitle}
                    readOnly
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                </div>

                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter First Name"
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-mediacrest-orange"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter Last Name"
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-mediacrest-orange"
                      required
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Email Address"
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-mediacrest-orange"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter Phone Number"
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-mediacrest-orange"
                      required
                    />
                  </div>
                </div>

                {/* Expectations Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What do you hope to get from this event?
                  </label>
                  <textarea
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleInputChange}
                    placeholder="Tell us about your expectations and goals for attending this event..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-mediacrest-orange resize-vertical"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-colors ${
                      loading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-mediacrest-orange hover:bg-mediacrest-orange/90 text-white"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
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
                        Submitting...
                      </div>
                    ) : (
                      "Register for Event"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl border border-green-200 flex flex-col items-center max-w-md w-full text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-600 mb-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Registration Successful!
            </h3>
            <p className="text-green-700">
              Thank you for registering for the event. We'll contact you with
              further details soon.
            </p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl border border-red-300 flex flex-col items-center max-w-md w-full text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-600 mb-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm-1 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Registration Failed
            </h3>
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
