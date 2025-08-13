import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import Logo from "../images/MEDIACREST COLLEGE LOGO.png";
import "../global.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
<img
              src={Logo}
              alt="Mediacrest Training College"
              className="h-14 lg:h-18 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
            >
              Home
            </Link>

            {/* About Us Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
                onMouseEnter={() => setActiveDropdown('about')}
              >
                About Us
                <ChevronDown className="w-4 h-4" />
              </button>
              <div 
                className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border py-2 transition-all duration-200 ${
                  activeDropdown === 'about' ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to="/weare" 
                  className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors"
                >
                  Who We Are
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
                <Link 
                  to="/events" 
                  className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors"
                >
                  Events
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
              </div>
            </div>

            {/* Courses Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
                onMouseEnter={() => setActiveDropdown('courses')}
              >
                Courses
                <ChevronDown className="w-4 h-4" />
              </button>
              <div 
                className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border py-2 transition-all duration-200 ${
                  activeDropdown === 'courses' ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to="/digital-marketing" 
                  className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors"
                >
                  Digital Marketing
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
                <Link 
                  to="/graphic-design" 
                  className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors"
                >
                  Graphic Design
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
                <Link 
                  to="/photography-videography" 
                  className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors"
                >
                  Photography & Videography
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
                 <Link 
                  to="/CyberSecurity" 
                  className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors"
                >
                  Cyber security
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
                 <Link 
                  to="/DataScience" 
                  className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors"
                >
                  Data Science
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
                 <Link 
                  to="/SoftwareEngineering" 
                  className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-mediacrest-orange transition-colors"
                > 
                Software Engineering 
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
              </div>
            </div>

            <Link 
              to="/CountyModel" 
              className="text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
            >
              County Model
            </Link>


            <Link 
              to="/corporate" 
              className="text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
            >
              Corporate
            </Link>
                        <Link 
              to="/Application" 
              className="text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
            >
              Application Form
            </Link>

            <Link 
              to="/contact" 
              className="ToContact hover:bg-mediacrest-orange/90  px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-4">
            <Link 
              to='/' 
              className="block text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
              onClick={closeMenu}
            >
              Home
            </Link>

            {/* Mobile About Us Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
                onClick={() => toggleDropdown('about')}
              >
                About Us
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  activeDropdown === 'about' ? 'rotate-180' : ''
                }`} />
              </button>
              <div className={`mt-2 space-y-2 transition-all duration-200 ${
                activeDropdown === 'about' ? 'block' : 'hidden'
              }`}>
                <Link 
                  to="/weare" 
                  className="flex justify-between items-center pl-4 pr-2 py-2 text-gray-600 hover:text-mediacrest-orange transition-colors"
                  onClick={closeMenu}
                >
                  Who We Are
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
                <Link 
                  to="/events" 
                  className="flex justify-between items-center pl-4 pr-2 py-2 text-gray-600 hover:text-mediacrest-orange transition-colors"
                  onClick={closeMenu}
                >
                  Events
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
              </div>
            </div>

            {/* Mobile Courses Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
                onClick={() => toggleDropdown('courses')}
              >
                Courses
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  activeDropdown === 'courses' ? 'rotate-180' : ''
                }`} />
              </button>
              <div className={`mt-2 space-y-2 transition-all duration-200 ${
                activeDropdown === 'courses' ? 'block' : 'hidden'
              }`}>
                <Link 
                  to="/digital-marketing" 
                  className="flex justify-between items-center pl-4 pr-2 py-2 text-gray-600 hover:text-mediacrest-orange transition-colors"
                  onClick={closeMenu}
                >
                  Digital Marketing
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
                <Link 
                  to="/graphic-design" 
                  className="flex justify-between items-center pl-4 pr-2 py-2 text-gray-600 hover:text-mediacrest-orange transition-colors"
                  onClick={closeMenu}
                >
                  Graphic Design
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
                <Link 
                  to="/photography-videography" 
                  className="flex justify-between items-center pl-4 pr-2 py-2 text-gray-600 hover:text-mediacrest-orange transition-colors"
                  onClick={closeMenu}
                >
                  Photography & Videography
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>

                                <Link 
                  to="/CyberSecurity" 
                  className="flex justify-between items-center pl-4 pr-2 py-2 text-gray-600 hover:text-mediacrest-orange transition-colors"
                  onClick={closeMenu}
                >
                  Cyber Security
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>

                                <Link 
                  to="/DataScience" 
                  className="flex justify-between items-center pl-4 pr-2 py-2 text-gray-600 hover:text-mediacrest-orange transition-colors"
                  onClick={closeMenu}
                >
                  Data Science
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>

                                <Link 
                  to="/SoftwareEngineering" 
                  className="flex justify-between items-center pl-4 pr-2 py-2 text-gray-600 hover:text-mediacrest-orange transition-colors"
                  onClick={closeMenu}
                >
                  Software Engineering
                  <ChevronRight className="w-4 h-4 text-mediacrest-orange" />
                </Link>
              </div>
            </div>
                          <Link 
              to="/CountyModel" 
              className="block text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
              onClick={closeMenu}
            >
              County Model
            </Link>

            
            

            <Link 
              to="/corporate" 
              className="block text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
              onClick={closeMenu}
            >
              Corporate
            </Link>

                        <Link 
              to="/Application" 
              className="block text-gray-700 hover:text-mediacrest-orange font-medium transition-colors"
              onClick={closeMenu}
            >
              Application Form
            </Link>



            <Link 
              to="/contact" 
              className="inline-block bg-mediacrest-orange hover:bg-mediacrest-orange/90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;