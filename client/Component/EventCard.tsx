import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import "../Events.css";
import "../global.css";

interface EventCardProps {
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
  const cardHeight = showRegisterButton ? "h-[600px]" : "h-[496px]"; //mike changed from 570 to 600

  return (
    <div
      className={`flex flex-col gap-7 bg-white rounded-lg shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] w-[379px] ${cardHeight} max-w-full mx-auto`}
    >
      <img
        src={imageUrl}
        alt="Event"
        className="w-full h-[206px] object-cover rounded-t-lg flex-shrink-0"
      />

      <div className="px-[18px] pb-7 flex flex-col gap-7 flex-1">
        <div className="flex gap-[19px] items-start">
          {/* Date Box */}
          <div className="flex flex-col items-center border border-[rgba(0,0,0,0.17)] rounded-md px-[14px] py-2 flex-shrink-0">
            <span className="text-mediacrest-orange font-semibold text-[11px] leading-normal">
              {month}
            </span>
            <span className="text-black font-semibold text-[28px] leading-normal">
              {day}
            </span>
          </div>

          {/* Event Details */}
          <div className="flex flex-col gap-[34px] flex-1">
            <h3 className="text-text-medium font-semibold text-lg leading-8 max-w-[234px]">
              {title}
            </h3>
          </div>
        </div>

        {/* Time and Location */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-8 flex-wrap">
            <div className="flex items-center gap-[6px] py-3">
              <Clock className="w-4 h-4 text-mediacrest-orange flex-shrink-0" />
              <span className="text-text-light font-medium text-sm leading-[19.6px]">
                {time}
              </span>
            </div>
            <div className="flex items-center gap-[6px] py-3">
              <MapPin className="w-[15px] h-[15px] text-mediacrest-orange flex-shrink-0" />{" "}
              {/*changed */}
              <span className="text-text-light font-medium text-sm leading-[19.6px]">
                {location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-text-light font-normal text-sm leading-6 max-w-[312px]">
            {description}
          </p>
        </div>

        {/* Register Button */}
        {showRegisterButton && (
          <Link
            to={link}
            className="ToReg mediacrest-orange text-orange font-semibold text-[15px] leading-[26px] px-[10px] py-[10px] rounded-lg hover:bg-mediacrest-orange hover:text-white transition-colors text-center capitalize mt-auto block"
          >
            Register for the event
          </Link>
        )}
      </div>
    </div>
  );
}
