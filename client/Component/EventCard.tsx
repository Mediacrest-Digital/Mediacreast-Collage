import { Clock, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../Events.css";
import "../global.css";

interface EventCardProps {
  eventId?: string;
  month: string;
  day: string;
  title: string;
  time: string;
  location: string;
  description: string;
  showRegisterButton?: boolean;
  imageUrl?: string;
  link?: string;
}

export default function EventCard({
  eventId,
  month,
  day,
  title,
  time,
  location,
  description,
  showRegisterButton = false,
  imageUrl = "https://cdn.builder.io/api/v1/image/assets/TEMP/573fd834a6c44528728fc81e951ce411a622e1fa?width=758",
  link = "/registration",
}: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group">
      <div className="aspect-video overflow-hidden relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Date Badge - positioned over the image */}

        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md px-3 py-2 text-center">
          <div className="text-mediacrest-orange font-semibold text-xs uppercase">
            {month}
          </div>
          <div className="text-gray-900 font-bold text-lg leading-none">
            
            {day}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-mediacrest-orange transition-colors">
          {title.length > 60 ? `${title.substring(0, 60)}...` : title}
          {/* If you want to show the full title on hover, you can add a tooltip or similar */}
          {/* <span className="text-sm text-gray-500">{title}</span> */}
        </h3>

        {/* Time and Location */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-mediacrest-light-beige rounded-full px-3 py-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-mediacrest-orange" />
              <span className="text-mediacrest-orange text-xs font-semibold">
                {time}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-600 text-sm font-medium">
              {location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description.length > 120
            ? `${description.substring(0, 120)}...`
            : description}
        </p>

        {/* Action Button or Link */}
        {showRegisterButton ? (
          <Link
            to={`/events-registration?${eventId ? `eventId=${encodeURIComponent(eventId)}&` : ""}title=${encodeURIComponent(title)}&date=${encodeURIComponent(month + " " + day)}&time=${encodeURIComponent(time)}&location=${encodeURIComponent(location)}&description=${encodeURIComponent(description)}`}
            className="w-full bg-mediacrest-orange hover:bg-mediacrest-orange/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Register for Event</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="flex items-center gap-1 text-mediacrest-orange font-semibold cursor-pointer hover:gap-2 transition-all">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}
