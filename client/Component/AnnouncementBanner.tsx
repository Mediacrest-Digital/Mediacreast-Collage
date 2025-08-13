import React, { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#EB4823] to-[#d93f1f] text-white py-2 px-4 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <Link
            to="/masterclass-application"
            className="hover:underline flex items-center justify-center gap-2 text-sm md:text-base font-medium"
          >
            <span>
              <strong>Digital Marketing Masterclass</strong> - Aug 23, 2025 |
              10AM-1PM |<span className="underline ml-1">Register Now!</span>
            </span>
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
