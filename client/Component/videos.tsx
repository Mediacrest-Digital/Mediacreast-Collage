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

  const videos: Video[] = [
    { 
      id: '1', 
      youtubeId: 'bmyWtLa-d50',
      thumbnail: 'https://img.youtube.com/vi/bmyWtLa-d50/maxresdefault.jpg',
      title: 'Video 1'
    },
    { 
      id: '2', 
      youtubeId: 'UvT6V18PCwg',
      thumbnail: 'https://img.youtube.com/vi/UvT6V18PCwg/maxresdefault.jpg',
      title: 'Video 2'
    },
    { 
      id: '3', 
      youtubeId: 'OsVZ7Jkczq4',
      thumbnail: 'https://img.youtube.com/vi/OsVZ7Jkczq4/maxresdefault.jpg',
      title: 'Video 3'
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        {/* Desktop Previous Button */}
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
          <div className="relative aspect-video overflow-hidden bg-gray-900">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {videos.map((video, index) => (
                <div key={video.id} className="min-w-full h-full relative">
                  {/* YouTube Iframe */}
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?controls=1&modestbranding=1&rel=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

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

        {/* Desktop Next Button */}
        <button
          onClick={nextSlide}
          className="hidden min-[450px]:flex bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-4 sm:p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
          aria-label="Next video"
          disabled={videos.length <= 1}
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
        </button>
      </div>

   
    </div>
  );
};

export default VideoCarousel;