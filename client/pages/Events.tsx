import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/Component/Footer";
import EventCard from "@/Component/EventCard";
import Navbar from "../Component/Navbar";
import Img1 from "../images/langatpic.jpg";
import consumerpic from "../images/consumerpic.jpeg";
import branding from "../images/Branding.jpeg";
import experience from "../images/experienceTr.jpeg";
import masterclass from "../images/Masterclass.jpeg";
import Kisiipic from "../images/Kisiipic.jpeg";
import { b } from "vitest/dist/chunks/suite.d.FvehnV49.js";

// Using the images that were already imported above

interface EventCardProps {
  eventId?: string;
  month: string;
  day: string;
  title: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

// Hard coded events data using existing imported images
const HARDCODED_EVENTS: EventCardProps[] = [
  // Upcoming Events
  {
    eventId: "1",
    month: "SEP",
    day: "19",
    title: "Kisii County Digital Skills & AI Program Launch",
    time: "9:00am - 1:00pm",
    location: "Gusii Stadium, Kisii",
    description: "Get ready for the launch of the Kisii County Digital Skills & AI Program, proudly partnered with Mediacrest Training College. We are honored to have Kisii County Governor, HE Hon. Paul Simba Arati, as the chief guest for this exciting event",
    imageUrl: Kisiipic,
    link: "/events/digital-marketing-workshop"
  },
  // {
  //   eventId: "2",
  //   month: "SEP",
  //   day: "22",
  //   title: "Career Fair 2025",
  //   time: "9:00 AM - 5:00 PM",
  //   location: "Student Center",
  //   description: "Connect with top employers and explore exciting career opportunities in various industries.",
  //   imageUrl: branding,
  //   link: "/events/career-fair-2025"
  // },
  // {
  //   eventId: "3",
  //   month: "OCT",
  //   day: "5",
  //   title: "Web Development Bootcamp",
  //   time: "2:00 PM - 6:00 PM",
  //   location: "Computer Lab 1",
  //   description: "Intensive hands-on bootcamp covering modern web development technologies and best practices.",
  //   imageUrl: experience,
  //   link: "/events/web-development-bootcamp"
  // },
  // {
  //   eventId: "4",
  //   month: "OCT",
  //   day: "18",
  //   title: "Entrepreneurship Summit",
  //   time: "1:00 PM - 7:00 PM",
  //   location: "Conference Hall",
  //   description: "Meet successful entrepreneurs and learn about starting your own business venture.",
  //   imageUrl: masterclass,
  //   link: "/events/entrepreneurship-summit"
  // },
  
  // Past Events
  {
    eventId: "5",
    month: "Jul",
    day: "26",
    title: "Digital Marketing Masterclass",
    time: " 10:00am - 1:00pm",
    location: "Mediacrest College, Parklands",
    description: "From business owners to brand builders, everyone was fully engaged, making digital strategy real.",
    imageUrl: masterclass,
    link: "/events/alumni-networking-event"
  },
  {
    eventId: "5",
    month: "Apr",
    day: "12",
    title: "Branding & Identity Workshop",
    time: "12:00pm - 4:00pm",
    location: "HH Towers, Nairobi ",
    description: "From practical strategies to personal branding, participants gained real skills to grow their digital presence.",
    imageUrl: branding,
    link: "/events/alumni-networking-event"
  },
  {
    eventId: "6",
    month: "Apr",
    day: "22",
    title: "Digital Marketing Training",
    time: "10:00am - 1:00pm",
    location: "Transnational Plaza, Nairobi ",
    description: "Our session explored how people interact online, emerging digital trends, and strategies to handle challenges.",
    imageUrl: experience,
    link: "/events/tech-innovation-conference"
  },
  {
    eventId: "7",
    month: "Mar",
    day: "28",
    title: "Consumer Choice Awards Kenya",
    time: "6:00pm - 11:00pm",
    location: "Argyle Grand Hotel, Nairobi ",
    description: "From media production to public relations, Mediacrest ensured strong coverage and lasting event visibility.",
    imageUrl: consumerpic,
    link: "/events/creative-design-workshop"
  }
];

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventCardProps[]>([]);
  const [pastEvents, setPastEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [upcomingCurrentIndex, setUpcomingCurrentIndex] = useState(0);
  const [pastCurrentIndex, setPastCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Process hard coded events
  useEffect(() => {
    const processEvents = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      const upcoming: EventCardProps[] = [];
      const past: EventCardProps[] = [];

      HARDCODED_EVENTS.forEach((event) => {
        // Simple date comparison based on month and day
        // This is a simplified approach - in real app you'd want proper date handling
        const eventMonthMap: { [key: string]: number } = {
          'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
          'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
        };

        const eventMonth = eventMonthMap[event.month];
        const eventDay = parseInt(event.day);

        // Simple logic: if event month is after current month, or same month but later day, it's upcoming
        const isUpcoming = eventMonth > currentMonth || 
          (eventMonth === currentMonth && eventDay > currentDay);

        if (isUpcoming) {
          upcoming.push(event);
        } else {
          past.push(event);
        }
      });

      // Sort upcoming events by date (earliest first)
      upcoming.sort((a, b) => {
        const eventMonthMap: { [key: string]: number } = {
          'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
          'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
        };
        
        const aMonth = eventMonthMap[a.month];
        const bMonth = eventMonthMap[b.month];
        const aDay = parseInt(a.day);
        const bDay = parseInt(b.day);

        if (aMonth !== bMonth) return aMonth - bMonth;
        return aDay - bDay;
      });

      // Sort past events by date (most recent first)
      past.sort((a, b) => {
        const eventMonthMap: { [key: string]: number } = {
          'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
          'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
        };
        
        const aMonth = eventMonthMap[a.month];
        const bMonth = eventMonthMap[b.month];
        const aDay = parseInt(a.day);
        const bDay = parseInt(b.day);

        if (bMonth !== aMonth) return bMonth - aMonth;
        return bDay - aDay;
      });

      setUpcomingEvents(upcoming);
      setPastEvents(past);
      setLoading(false);
    };

    // Simulate loading delay
    setTimeout(() => {
      processEvents();
    }, 1000);
  }, []);

  // Navigation functions
  const getEventsPerPage = () => (isMobile ? 1 : 3);
  const getTotalPages = (events: EventCardProps[]) => Math.ceil(events.length / getEventsPerPage());

  const nextSlide = useCallback((type: 'upcoming' | 'past') => {
    const events = type === 'upcoming' ? upcomingEvents : pastEvents;
    const setCurrentIndex = type === 'upcoming' ? setUpcomingCurrentIndex : setPastCurrentIndex;
    
    if (isMobile) {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    } else {
      const totalPages = getTotalPages(events);
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }
  }, [isMobile, upcomingEvents, pastEvents]);

  const prevSlide = useCallback((type: 'upcoming' | 'past') => {
    const events = type === 'upcoming' ? upcomingEvents : pastEvents;
    const setCurrentIndex = type === 'upcoming' ? setUpcomingCurrentIndex : setPastCurrentIndex;
    
    if (isMobile) {
      setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    } else {
      const totalPages = getTotalPages(events);
      setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    }
  }, [isMobile, upcomingEvents, pastEvents]);

  const goToSlide = useCallback((index: number, type: 'upcoming' | 'past') => {
    const setCurrentIndex = type === 'upcoming' ? setUpcomingCurrentIndex : setPastCurrentIndex;
    setCurrentIndex(index);
  }, []);

  // Get current events to display
  const getCurrentEvents = (events: EventCardProps[], currentIndex: number) => {
    if (isMobile) {
      return [events[currentIndex]];
    } else {
      const startIndex = currentIndex * 3;
      return events.slice(startIndex, startIndex + 3);
    }
  };

  // Event Carousel Component
  const EventCarousel = ({ 
    events, 
    currentIndex, 
    type,
    title,
    description,
    bgColor = "bg-white",
    showRegisterButton = false
  }: {
    events: EventCardProps[];
    currentIndex: number;
    type: 'upcoming' | 'past';
    title: string;
    description: string;
    bgColor?: string;
    showRegisterButton?: boolean;
  }) => {
    if (events.length === 0) {
      return (
        <section className={`py-12 sm:py-16 lg:py-20 ${bgColor}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">{description}</p>
            </div>
            <div className="text-center py-12">
              <div className={`${bgColor === "bg-white" ? "bg-gray-50" : "bg-white"} rounded-lg p-8 max-w-md mx-auto shadow-sm`}>
                <div className="text-6xl mb-4">{type === 'upcoming' ? '📅' : '🏛️'}</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {type === 'upcoming' ? 'No Upcoming Events' : 'No Past Events'}
                </h3>
                <p className="text-gray-500">
                  {type === 'upcoming' 
                    ? 'Check back later for exciting new events!' 
                    : 'Past events will appear here once we have some history.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    const totalPages = getTotalPages(events);
    const currentEvents = getCurrentEvents(events, currentIndex);

    // Mobile UI
    if (isMobile) {
      return (
        <section className={`py-12 sm:py-16 lg:py-20 ${bgColor}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">{description}</p>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-xl overflow-hidden shadow-xl">
                <div className="relative overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {events.map((event, index) => (
                      <div key={index} className="min-w-full">
                        <EventCard {...event} showRegisterButton={showRegisterButton} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                {events.length > 1 && (
                  <>
                    <button
                      onClick={() => prevSlide(type)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-30 transition-all duration-200"
                      aria-label="Previous event"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => nextSlide(type)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-30 transition-all duration-200"
                      aria-label="Next event"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Dots Navigation */}
              {events.length > 1 && (
                <div className="mt-4 flex justify-center space-x-2">
                  {events.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index, type)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentIndex 
                          ? 'bg-red-600 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to event ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }

    // Desktop UI
    return (
      <section className={`py-12 sm:py-16 lg:py-20 ${bgColor}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">{description}</p>
          </div>

          {events.length > 3 ? (
            <div className="flex items-center gap-6 lg:gap-8">
              <button
                onClick={() => prevSlide(type)}
                className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-4 lg:p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 flex-shrink-0"
                aria-label="Previous events"
              >
                <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 text-gray-700" />
              </button>

              <div className="flex-1 relative">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {currentEvents.map((event, index) => (
                    <div key={`${currentIndex}-${index}`} className="transition-all duration-500 hover:scale-105">
                      <EventCard {...event} showRegisterButton={showRegisterButton} />
                    </div>
                  ))}
                </div>

                {/* Dots Navigation */}
                <div className="mt-8 lg:mt-10 flex justify-center space-x-3">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index, type)}
                      className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-red-600 scale-125 shadow-lg' 
                          : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => nextSlide(type)}
                className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-4 lg:p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 flex-shrink-0"
                aria-label="Next events"
              >
                <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-gray-700" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {events.map((event, index) => (
                <div key={index} className="transition-all duration-300 hover:scale-105">
                  <EventCard {...event} showRegisterButton={showRegisterButton} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

{/* Hero Section */}
{/* Hero Section */}
<div className="relative homeImg3 h-[250px] sm:h-[300px] lg:h-[400px] bg-cover bg-center flex items-center mt-0">
  {/* Responsive Image */}
  <img className="imgt w-full h-full object-cover" src={Img1} alt="Events Banner" />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-40" />

  {/* Text Section */}
  <div className="eventsText absolute inset-0 flex flex-col items-start justify-center pl-6 sm:pl-12 lg:pl-24 text-left">
    <div className="flex flex-col gap-[9px] max-w-[360px]">
      <h1 className="text-white font-bold text-3xl lg:text-5xl leading-[40px] lg:leading-[60px]">
        Events
      </h1>
      <nav className="txtReg text-text-muted font-normal text-base leading-7">
        {/* Add breadcrumb or description here if needed */}
      </nav>
    </div>
  </div>
</div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 bg-mediacrest-orange rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-mediacrest-orange rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-4 h-4 bg-mediacrest-orange rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
          <p className="text-gray-500 mt-4 animate-pulse">Loading events...</p>
        </div>
      ) : (
        <>
          <EventCarousel
            events={upcomingEvents}
            currentIndex={upcomingCurrentIndex}
            type="upcoming"
            title="Upcoming Events"
            description="Join us for exciting upcoming events designed to enhance your learning experience and connect you with industry professionals."
            bgColor="bg-white"
            showRegisterButton={true}
          />

          <EventCarousel
            events={pastEvents}
            currentIndex={pastCurrentIndex}
            type="past"
            title="Past Events"
            description="Take a look at our previous successful events"
            bgColor="bg-gray-50"
            showRegisterButton={false}
          />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Events;