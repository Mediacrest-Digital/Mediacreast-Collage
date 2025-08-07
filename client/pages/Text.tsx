import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const fullText = "Empowering Growth, Shaping Futures";

const AnimatedText = () => {
  const [visibleText, setVisibleText] = useState("");
  const [index, setIndex] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRemoving) {
        // Typing
        if (index < fullText.length) {
          setVisibleText((prev) => prev + fullText.charAt(index));
          setIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsRemoving(true), 1000); // Delay before deleting
        }
      } else {
        // Deleting
        if (index > 0) {
          setVisibleText((prev) => prev.slice(1));
          setIndex((prev) => prev - 1);
        } else {
          setIsRemoving(false);
        }
      }
    }, 80);

    return () => clearInterval(interval);
  }, [index, isRemoving]);

  return (
    <div className="relative mb-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight whitespace-nowrap">
        {visibleText.includes("Growth") ? (
          <>
            {visibleText.replace("Growth,", "")}
            <span className="relative inline-block">
              Growth,
              <svg
                className="hidden [@media(min-width:380px)]:[@media(max-width:440px)]:block absolute left-0 top-full mt-2 w-20 sm:w-24 lg:w-32 h-2"
                viewBox="0 0 190 13"
                fill="none"
              >
                <path
                  d="M2 5.29882C33.0528 2.116 113.664 -1.36098 187.684 10.1936"
                  stroke="#EB4823"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {visibleText.split("Growth,")[1] || ""}
          </>
        ) : (
          visibleText
        )}
      </h1>
    </div>
  );
};

export default AnimatedText;
