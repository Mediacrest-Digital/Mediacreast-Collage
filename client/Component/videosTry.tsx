import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Video {
  id: string;
  youtubeId: string;
  thumbnail: string;
  title: string;
}

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const videos: Video[] = [

    { 
      id: '1', 
      youtubeId: 'bmyWtLa-d50',
      thumbnail: 'https://img.youtube.com/vi/bmyWtLa-d50/maxresdefault.jpg',
      title: 'Digital Marketing Course'
    },
    { 
      id: '2', 
      youtubeId: 'UvT6V18PCwg',
      thumbnail: 'https://img.youtube.com/vi/UvT6V18PCwg/maxresdefault.jpg',
      title: 'Graphic Design Fundamentals'
    },
    { 
      id: '3', 
      youtubeId: 'OsVZ7Jkczq4',
      thumbnail: 'https://img.youtube.com/vi/OsVZ7Jkczq4/maxresdefault.jpg',
      title: 'Photography Masterclass'
    },
        { 
      id: '4', 
      youtubeId: 'bBpAHXC3h1E',
      thumbnail: 'https://youtu.be/bBpAHXC3h1E?si=WcpFYx5e7f05v1BE',
      title: 'Photography Masterclass'
    {
      id: "1",
      youtubeId: "bmyWtLa-d50",
      thumbnail: "https://img.youtube.com/vi/bmyWtLa-d50/maxresdefault.jpg",
      title: "Digital Marketing Course",
    },
    {
      id: "2",
      youtubeId: "UvT6V18PCwg",
      thumbnail: "https://img.youtube.com/vi/UvT6V18PCwg/maxresdefault.jpg",
      title: "Graphic Design Fundamentals",
    },
    {
      id: "3",
      youtubeId: "OsVZ7Jkczq4",
      thumbnail: "https://img.youtube.com/vi/OsVZ7Jkczq4/maxresdefault.jpg",
      title: "Photography Masterclass",
    },
  ];

  // Detect screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);

    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);

  }, []);

  // Preload all video thumbnails immediately
  useEffect(() => {

    videos.forEach(video => {

    videos.forEach((video) => {

      const img = new Image();
      img.src = video.thumbnail;
      // Also preload YouTube thumbnails for faster display
      const hqImg = new Image();
      hqImg.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
    });
  }, []);

  const videosPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(videos.length / videosPerPage);

  const nextSlide = useCallback(() => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }
  }, [isMobile, videos.length, totalPages]);

  const prevSlide = useCallback(() => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    }
  }, [isMobile, videos.length, totalPages]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          prevSlide();
          break;
        case "ArrowRight":
          event.preventDefault();
          nextSlide();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Get current videos to display
  const getCurrentVideos = () => {
    if (isMobile) {
      return [videos[currentIndex]];
    } else {
      const startIndex = currentIndex * videosPerPage;
      const endIndex = startIndex + videosPerPage;
      return videos.slice(startIndex, endIndex);
    }
  };

  // Simple VideoFrame component - loads immediately
  const VideoFrame = ({ video }: { video: Video }) => {
    return (

      <div className="relative bg-gray-900" style={{ aspectRatio: '16/9', minHeight: isMobile ? '400px' : '320px' }}>

      <div
        className={`relative bg-gray-900 w-full ${isMobile ? "aspect-video" : ""}`}
        style={!isMobile ? { aspectRatio: "16/9", minHeight: "320px" } : {}}
      >

        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}?controls=1&modestbranding=1&rel=0&enablejsapi=1`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  // Mobile UI
  if (isMobile) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Alumni Success Stories
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from our graduates who transformed their careers
          </p>
        </div>


        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="hidden min-[450px]:flex bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-4 sm:p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
            aria-label="Previous video"
            disabled={videos.length <= 1}
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
          </button>

          {/* Main Video Container */}
          <div className="flex-1 relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative overflow-hidden bg-gray-900">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"

                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {videos.map((video, index) => (
                  <div key={video.id} className="min-w-full h-full relative">
                    <VideoFrame video={video} />

                    {/* Mobile Navigation */}
                    <div className="block min-[450px]:hidden">
                      {videos.length > 1 && (
                        <>
                          <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 z-30 transition-all duration-200"
                            aria-label="Previous video"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 z-30 transition-all duration-200"
                            aria-label="Next video"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            {videos.length > 1 && (

              <div className="bg-white p-4 sm:p-6">
                <div className="flex justify-center space-x-2 sm:space-x-3">

                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}

                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                        index === currentIndex 
                          ? 'bg-red-600 scale-125 shadow-lg' 
                          : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'

                      }`}
                      aria-label={`Go to video ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}

            className="hidden min-[450px]:flex bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-4 sm:p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
            aria-label="Next video"
            disabled={videos.length <= 1}
          >

          </button>
        </div>
      </div>
    );
  }

  // Desktop UI
  return (
    <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Alumni Success Stories
        </h2>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto">

          Hear from our graduates who transformed their careers and achieved their dreams through our programs

          Hear from our graduates who transformed their careers and achieved
          their dreams through our programs

        </p>
      </div>

      <div className="flex items-center gap-6 lg:gap-8">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-4 lg:p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 flex-shrink-0"
          aria-label="Previous videos"
          disabled={totalPages <= 1}
        >
          <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 text-gray-700" />
        </button>

        {/* Main Videos Container */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-2 gap-8 lg:gap-10">
            {getCurrentVideos().map((video) => (

              <div 
                key={video.id} 

              <div
                key={video.id}

                className="bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl"
              >
                <VideoFrame video={video} />
              </div>
            ))}

            
            {/* Fill empty slot if odd number of videos on last page */}
            {getCurrentVideos().length === 1 && (
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-xl" style={{ aspectRatio: '16/9', minHeight: '320px' }}>
                <div className="text-center p-8">
                  <div className="text-5xl mb-4">🎓</div>
                  <p className="text-gray-600 font-medium text-xl mb-3">More Success Stories</p>


            {/* Fill empty slot if odd number of videos on last page */}
            {getCurrentVideos().length === 1 && (
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-xl aspect-video">
                <div className="text-center p-8">
                  <div className="text-5xl mb-4">🎓</div>
                  <p className="text-gray-600 font-medium text-xl mb-3">
                    More Success Stories
                  </p>

                  <p className="text-gray-500 text-lg">Coming Soon!</p>
                </div>
              </div>
            )}
          </div>

          {/* Dots Navigation */}
          {totalPages > 1 && (
            <div className="mt-10">
              <div className="flex justify-center space-x-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${

                        ? 'bg-red-600 scale-125 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'

                        ? "bg-red-600 scale-125 shadow-lg"
                        : "bg-gray-300 hover:bg-gray-400 hover:scale-110"

                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>


              {/* Page indicator */}
              <div className="text-center mt-4 text-sm text-gray-600">
                Page {currentIndex + 1} of {totalPages}
              </div>

            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-4 lg:p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 flex-shrink-0"
          aria-label="Next videos"
          disabled={totalPages <= 1}
        >
          <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
