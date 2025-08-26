import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/Component/Footer";
import EventCard from "@/Component/EventCard";
import Navbar from "../Component/Navbar";
import AnnouncementBanner from "../Component/AnnouncementBanner";
import Img1 from "../images/events.png";

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  start_time: string;
  end_time?: string;
  location: string;
  host: string;
  poster?: string;
}

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

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventCardProps[]>([]);
  const [pastEvents, setPastEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upcomingCurrentIndex, setUpcomingCurrentIndex] = useState(0);
  const [pastCurrentIndex, setPastCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const fetchEvents = async (retryCount = 0) => {
      const maxRetries = 3;

      try {
        console.log(
          `Fetching events from: "/api/events" (attempt ${retryCount + 1})`,
        );
        const response = await fetch(
          "/api/events",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        );

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
        }

        const data: Event[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from server");
        }

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const upcoming: EventCardProps[] = [];
        const past: EventCardProps[] = [];

        data.forEach((event) => {
          const eventDate = new Date(event.date);
          const eventMonth = eventDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
          const eventDay = eventDate.getDate().toString();

          // Format time
          let timeString = "";
          if (event.start_time) {
            const startTime = new Date(`2000-01-01T${event.start_time}`);
            const formattedStart = startTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });

            if (event.end_time) {
              const endTime = new Date(`2000-01-01T${event.end_time}`);
              const formattedEnd = endTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              });
              timeString = `${formattedStart} - ${formattedEnd}`;
            } else {
              timeString = formattedStart;
            }
          }

          const eventCardData: EventCardProps = {
            eventId: event.id.toString(),
            month: eventMonth,
            day: eventDay,
            title: event.title,
            time: timeString,
            location: event.location,
            description: event.description,
            imageUrl: event.poster || "https://cdn.builder.io/api/v1/image/assets/TEMP/573fd834a6c44528728fc81e951ce411a622e1fa?width=758",
            link: `/events/${event.slug}`,
          };

          if (eventDate >= currentDate) {
            upcoming.push(eventCardData);
          } else {
            past.push(eventCardData);
          }
        });

        // Sort events
        upcoming.sort((a, b) => {
          const dateA = new Date(`${a.month} ${a.day}, ${new Date().getFullYear()}`);
          const dateB = new Date(`${b.month} ${b.day}, ${new Date().getFullYear()}`);
          return dateA.getTime() - dateB.getTime();
        });

        past.sort((a, b) => {
          const dateA = new Date(`${a.month} ${a.day}, ${new Date().getFullYear()}`);
          const dateB = new Date(`${b.month} ${b.day}, ${new Date().getFullYear()}`);
          return dateB.getTime() - dateA.getTime();
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (err) {
        setError(err instanceof Error ? `Failed to fetch events: ${err.message}` : "Failed to fetch events: Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
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
    <div className="min-h-screen bg-white pt-12">
      <AnnouncementBanner />
      <Navbar />

      {/* Hero Section */}
      <div className="relative homeImg3 h-[300px] lg:h-[600px] bg-cover bg-center flex items-center justify-center mt-0">
        <img className="imgt" src={Img1} alt="#" />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="eventsText relative flex flex-col items-center justify-center h-full text-center">
          <div className="flex flex-col items-center gap-[9px] w-[360px]">
            <h1 className="text-white font-bold text-5xl leading-[72px]">Events</h1>
            <nav className="txtReg text-text-muted font-normal text-base leading-7">
              Home / About Us / Events
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
      ) : error ? (
        <div className="py-20 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-700 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
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