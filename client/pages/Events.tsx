import React, { useEffect, useState } from "react";
import "./images.css";
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

  useEffect(() => {
    const fetchEvents = async (retryCount = 0) => {
      const maxRetries = 3;

      try {
        console.log(
          `Fetching events from: "/api/events" (attempt ${retryCount + 1})`,
        );
        const response = await fetch("/api/events", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch events. Response:", errorText);
          throw new Error(
            `Failed to fetch events: ${response.status} ${response.statusText}`,
          );
        }

        const data: Event[] = await response.json();
        console.log("Fetched events data:", data);

        if (!Array.isArray(data)) {
          console.error("Expected array but got:", typeof data, data);
          throw new Error("Invalid data format received from server");
        }

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

        const upcoming: EventCardProps[] = [];
        const past: EventCardProps[] = [];

        data.forEach((event) => {
          const eventDate = new Date(event.date);
          const eventMonth = eventDate
            .toLocaleDateString("en-US", { month: "short" })
            .toUpperCase();
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
            imageUrl:
              event.poster ||
              "https://cdn.builder.io/api/v1/image/assets/TEMP/573fd834a6c44528728fc81e951ce411a622e1fa?width=758",
          };

          if (eventDate >= currentDate) {
            upcoming.push(eventCardData);
          } else {
            past.push(eventCardData);
          }
        });

        // Sort upcoming events by date (earliest first)
        upcoming.sort((a, b) => {
          const dateA = new Date(
            `${a.month} ${a.day}, ${new Date().getFullYear()}`,
          );
          const dateB = new Date(
            `${b.month} ${b.day}, ${new Date().getFullYear()}`,
          );
          return dateA.getTime() - dateB.getTime();
        });

        // Sort past events by date (most recent first)
        past.sort((a, b) => {
          const dateA = new Date(
            `${a.month} ${a.day}, ${new Date().getFullYear()}`,
          );
          const dateB = new Date(
            `${b.month} ${b.day}, ${new Date().getFullYear()}`,
          );
          return dateB.getTime() - dateA.getTime();
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
        console.log("Successfully processed events:", {
          upcoming: upcoming.length,
          past: past.length,
        });
      } catch (err) {
        console.error("Error fetching events:", err);
        if (err instanceof Error) {
          setError(`Failed to fetch events: ${err.message}`);
        } else {
          setError("Failed to fetch events: Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
            <h1 className="text-white font-bold text-5xl leading-[72px]">
              Events
            </h1>
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
            <div
              className="w-4 h-4 bg-mediacrest-orange rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-4 h-4 bg-mediacrest-orange rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <p className="text-gray-500 mt-4 animate-pulse">Loading events...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="text-red-600 text-xl mb-2"></div>
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
          {/* Upcoming Events */}
          <section className="py-12 sm:py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-20">
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Upcoming Events
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                  Join us for exciting upcoming events designed to enhance your
                  learning experience and connect you with industry
                  professionals.
                </p>
              </div>

              {upcomingEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                    <div className="text-6xl mb-4"></div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No Upcoming Events
                    </h3>
                    <p className="text-gray-500">
                      Check back later for exciting new events!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                  {upcomingEvents.map((event, index) => (
                    <EventCard
                      key={index}
                      {...event}
                      showRegisterButton={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Past Events */}
          <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-20">
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Past Events
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                  Take a look at our previous successful events and see what you
                  missed.
                </p>
              </div>

              {pastEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-sm">
                    <div className="text-6xl mb-4">🏛️</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No Past Events
                    </h3>
                    <p className="text-gray-500">
                      Past events will appear here once we have some history.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                  {pastEvents.map((event, index) => (
                    <EventCard
                      key={index}
                      {...event}
                      showRegisterButton={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Events;
