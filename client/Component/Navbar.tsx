import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import Logo from "../images/MEDIACREST COLLEGE LOGO.png";
import "../global.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Close mobile menu if switching to desktop
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the navbar
      const navbar = event.target.closest('nav');
      const isMenuButton = event.target.closest('[data-menu-button]');
      
      if (isMenuOpen && !navbar && !isMenuButton) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (dropdown, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50 relative">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-20">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 z-50" onClick={closeMenu}>
              <img
                src={Logo}
                alt="Mediacrest Training College"
                className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center xl:space-x-8 lg:space-x-6">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-mediacrest-orange font-medium transition-colors text-sm xl:text-base whitespace-nowrap"
              >
                Home
              </Link>

              {/* About Us Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center gap-1 text-gray-700 hover:text-mediacrest-orange font-medium transition-colors text-sm xl:text-base whitespace-nowrap"
                  onMouseEnter={() => setActiveDropdown('about')}
                >
                  About Us
                  <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4" />
                </button>
                <div 
                  className={`absolute top-full left-0 mt-2 w-64 xl:w-72 bg-white rounded-lg shadow-lg border py-2 transition-all duration-200 ${
                    activeDropdown === 'about' ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    to="/who_we_are" 
                    className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors text-sm xl:text-base"
                  >
                    Who We Are
                    <ChevronRight className="w-3 h-3 xl:w-4 xl:h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/events" 
                    className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors text-sm xl:text-base"
                  >
                    Events
                    <ChevronRight className="w-3 h-3 xl:w-4 xl:h-4 text-mediacrest-orange" />
                  </Link>
                </div>
              </div>

              {/* Courses Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center gap-1 text-gray-700 hover:text-mediacrest-orange font-medium transition-colors text-sm xl:text-base whitespace-nowrap"
                  onMouseEnter={() => setActiveDropdown('courses')}
                >
                  Courses
                  <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4" />
                </button>
                <div 
                  className={`absolute top-full left-0 mt-2 w-64 xl:w-72 bg-white rounded-lg shadow-lg border py-2 transition-all duration-200 max-h-96 overflow-y-auto ${
                    activeDropdown === 'courses' ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    to="/digital-marketing" 
                    className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors text-sm xl:text-base"
                  >
                    Digital Marketing
                    <ChevronRight className="w-3 h-3 xl:w-4 xl:h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/graphic-design" 
                    className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors text-sm xl:text-base"
                  >
                    Graphic Design
                    <ChevronRight className="w-3 h-3 xl:w-4 xl:h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/photography-videography" 
                    className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors text-sm xl:text-base"
                  >
                    Photography & Videography
                    <ChevronRight className="w-3 h-3 xl:w-4 xl:h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/CyberSecurity" 
                    className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors text-sm xl:text-base"
                  >
                    Cybersecurity
                    <ChevronRight className="w-3 h-3 xl:w-4 xl:h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/DataScience" 
                    className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors text-sm xl:text-base"
                  >
                    Data Science
                    <ChevronRight className="w-3 h-3 xl:w-4 xl:h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/SoftwareEngineering" 
                    className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors text-sm xl:text-base"
                  > 
                    Software Engineering 
                    <ChevronRight className="w-3 h-3 xl:w-4 xl:h-4 text-mediacrest-orange" />
                  </Link>
                </div>
              </div>

              <Link 
                to="/CountyModel" 
                className="text-gray-700 hover:text-mediacrest-orange font-medium transition-colors text-sm xl:text-base whitespace-nowrap"
              >
                County Model
              </Link>

              <Link 
                to="/corporate" 
                className="text-gray-700 hover:text-mediacrest-orange font-medium transition-colors text-sm xl:text-base whitespace-nowrap"
              >
                Corporate
              </Link>

              <Link 
                to="/scholarships" 
                className="text-gray-700 hover:text-mediacrest-orange font-medium transition-colors text-sm xl:text-base whitespace-nowrap"
              >
                Scholarships
              </Link>

              <Link 
                to="/Application" 
                className="text-gray-700 hover:text-mediacrest-orange font-medium transition-colors text-sm xl:text-base whitespace-nowrap"
              >
                Application Form
              </Link>

              <Link 
                to="/contact" 
                className="ToContact hover:bg-mediacrest-orange/90 px-4 xl:px-6 py-2 rounded-lg font-medium transition-colors text-sm xl:text-base whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 relative"
              aria-label="Toggle navigation menu"
              data-menu-button="true"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={handleOverlayClick}
        />
      )}

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-14 sm:top-16 left-0 right-0 bg-white shadow-lg z-40 transform transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-3 sm:px-4 md:px-6 py-4 space-y-3">
            <Link 
              to='/' 
              className="block text-gray-700 hover:text-mediacrest-orange font-medium transition-colors py-2 text-base"
              onClick={closeMenu}
            >
              Home
            </Link>

            {/* Mobile About Us Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-gray-700 hover:text-mediacrest-orange font-medium transition-colors py-2 text-base"
                onClick={(e) => toggleDropdown('about', e)}
              >
                About Us
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'about' ? 'rotate-180' : ''
                }`} />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${
                activeDropdown === 'about' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="mt-2 space-y-1 ml-4">
                  <Link 
                    to="/who_we_are" 
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-mediacrest-orange transition-colors text-sm"
                    onClick={closeMenu}
                  >
                    Who We Are
                    <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/events" 
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-mediacrest-orange transition-colors text-sm"
                    onClick={closeMenu}
                  >
                    Events
                    <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Courses Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-gray-700 hover:text-mediacrest-orange font-medium transition-colors py-2 text-base"
                onClick={(e) => toggleDropdown('courses', e)}
              >
                Courses
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'courses' ? 'rotate-180' : ''
                }`} />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${
                activeDropdown === 'courses' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="mt-2 space-y-1 ml-4 max-h-64 overflow-y-auto">
                  <Link 
                    to="/digital-marketing" 
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-mediacrest-orange transition-colors text-sm"
                    onClick={closeMenu}
                  >
                    Digital Marketing
                    <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/graphic-design" 
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-mediacrest-orange transition-colors text-sm"
                    onClick={closeMenu}
                  >
                    Graphic Design
                    <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/photography-videography" 
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-mediacrest-orange transition-colors text-sm"
                    onClick={closeMenu}
                  >
                    Photography & Videography
                    <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/CyberSecurity" 
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-mediacrest-orange transition-colors text-sm"
                    onClick={closeMenu}
                  >
                    Cybersecurity
                    <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/DataScience" 
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-mediacrest-orange transition-colors text-sm"
                    onClick={closeMenu}
                  >
                    Data Science
                    <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                  </Link>
                  <Link 
                    to="/SoftwareEngineering" 
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-mediacrest-orange transition-colors text-sm"
                    onClick={closeMenu}
                  >
                    Software Engineering
                    <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              to="/CountyModel" 
              className="block text-gray-700 hover:text-mediacrest-orange font-medium transition-colors py-2 text-base"
              onClick={closeMenu}
            >
              County Model
            </Link>

            <Link 
              to="/corporate" 
              className="block text-gray-700 hover:text-mediacrest-orange font-medium transition-colors py-2 text-base"
              onClick={closeMenu}
            >
              Corporate
            </Link>

            <Link 
              to="/scholarships" 
              className="block text-gray-700 hover:text-mediacrest-orange font-medium transition-colors py-2 text-base"
              onClick={closeMenu}
            >
              Scholarships
            </Link>

            <Link 
              to="/Application" 
              className="block text-gray-700 hover:text-mediacrest-orange font-medium transition-colors py-2 text-base"
              onClick={closeMenu}
            >
              Application Form
            </Link>

            <Link 
              to="/contact" 
              className="inline-block bg-mediacrest-orange hover:bg-mediacrest-orange/90 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4 text-base w-full text-center"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;