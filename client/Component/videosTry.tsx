import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      title: 'Photography & Videography Course'
    },
    { 
      id: '2', 
      youtubeId: 'UvT6V18PCwg',
      thumbnail: 'https://img.youtube.com/vi/UvT6V18PCwg/maxresdefault.jpg',
      title: 'Digital Marketing Certification Course'
    },
    { 
      id: '3', 
      youtubeId: 'OsVZ7Jkczq4',
      thumbnail: 'https://img.youtube.com/vi/OsVZ7Jkczq4/maxresdefault.jpg',
      title: 'Graphic Design Certification Course'
    },
    { 
      id: '4', 
      youtubeId: 'bBpAHXC3h1E',
      thumbnail: 'https://img.youtube.com/vi/bBpAHXC3h1E/maxresdefault.jpg',
      title: 'Integrated Digital Media Course'
    },
  ];

  // Detect screen size with more granular breakpoints
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Preload all video thumbnails immediately
  useEffect(() => {
    videos.forEach(video => {
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
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  // Responsive VideoFrame component
  const VideoFrame = ({ video }: { video: Video }) => {
    return (
      <div className="relative bg-gray-900 w-full">
        {/* Responsive aspect ratio container */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?controls=1&modestbranding=1&rel=0&enablejsapi=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        {/* Video title overlay for mobile */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="text-white text-sm font-medium truncate">{video.title}</h3>
        </div>
      </div>
    );
  };

  // Mobile UI
  if (isMobile) {
    return (
      <div className="w-full mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header - More compact on mobile */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 px-2">
            Alumni Success Stories
          </h2>
          <p className="text-gray-600 text-base sm:text-lg px-4">
            Hear from our graduates who transformed their careers
          </p>
        </div>

        {/* Mobile carousel container */}
        <div className="relative">
          {/* Main Video Container - Full width on mobile */}
          <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
            <div className="relative overflow-hidden bg-gray-900">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {videos.map((video) => (
                  <div key={video.id} className="min-w-full relative">
                    <VideoFrame video={video} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Arrows */}
            {videos.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 sm:p-2.5 z-30 transition-all duration-200 backdrop-blur-sm"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 sm:p-2.5 z-30 transition-all duration-200 backdrop-blur-sm"
                  aria-label="Next video"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}

            {/* Video counter and title for mobile */}
            <div className="bg-white p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900 font-medium text-sm sm:text-base truncate flex-1 mr-3">
                  {videos[currentIndex].title}
                </h3>
                <span className="text-gray-500 text-xs sm:text-sm font-medium whitespace-nowrap">
                  {currentIndex + 1} / {videos.length}
                </span>
              </div>
            </div>

            {/* Dots Navigation */}
            {videos.length > 1 && (
              <div className="bg-white px-3 pb-3 sm:px-4 sm:pb-4">
                <div className="flex justify-center space-x-1.5 sm:space-x-2">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 ${
                        index === currentIndex 
                          ? 'bg-red-600 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to video ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* External navigation buttons for larger mobile screens */}
          <div className="hidden min-[500px]:flex items-center justify-between absolute top-1/2 transform -translate-y-1/2 w-full px-4 pointer-events-none">
            <button
              onClick={prevSlide}
              className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 shadow-lg hover:scale-105 transition-all duration-200 pointer-events-auto"
              aria-label="Previous video"
              disabled={videos.length <= 1}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 shadow-lg hover:scale-105 transition-all duration-200 pointer-events-auto"
              aria-label="Next video"
              disabled={videos.length <= 1}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop UI
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Alumni Success Stories
        </h2>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto">
          Hear from our graduates who transformed their careers and achieved their dreams through our programs
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {getCurrentVideos().map((video) => (
              <div 
                key={video.id} 
                className="bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl"
              >
                <VideoFrame video={video} />
                <div className="p-4 lg:p-6">
                  <h3 className="text-gray-900 font-semibold text-lg lg:text-xl">{video.title}</h3>
                </div>
              </div>
            ))}
            
            {/* Fill empty slot if odd number of videos on last page */}
            {getCurrentVideos().length === 1 && (
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-xl">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-4xl lg:text-5xl mb-4">🎓</div>
                      <p className="text-gray-600 font-medium text-lg lg:text-xl mb-3">More Success Stories</p>
                      <p className="text-gray-500 text-base lg:text-lg">Coming Soon!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          

          {/* Dots Navigation */}
          {totalPages > 1 && (
            <div className="mt-8 lg:mt-10">
              <div className="flex justify-center space-x-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-200 ${
                      index === currentIndex 
                        ? 'bg-red-600 scale-125 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
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