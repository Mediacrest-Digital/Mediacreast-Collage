import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import "../footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-8 lg:py-12 px-4 lg:px-16 mt-footer-adjust">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-16">
            {/* Company Info */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdd9c94655dd038441892e477869a7efc42514a2?width=300"
                alt="Mediacrest Training College"
                className="h-16 lg:h-20 w-auto"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Mediacrest Training College is a premier private learning
                institution located at Office Suites Block B, along Parklands
                Road – Nairobi, Kenya.
              </p>
            </div>

            {/* Courses */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm uppercase">COURSES</h3>
              <div className="space-y-3">
                <Link to="/digital" className="block text-gray-400 text-sm hover:text-white">
                  Digital Marketing
                </Link>
                <Link to="/graphic-design" className="block text-gray-400 text-sm hover:text-white">
                  Graphic Design
                </Link>
                <Link to="/photography-videography" className="block text-gray-400 text-sm hover:text-white">
                  Photography & Videography
                </Link>

                <Link to="/cyberSecurity" className="block text-gray-400 text-sm hover:text-white">
                  Cyber Security
                </Link>
                <Link to="/dataScience" className="block text-gray-400 text-sm hover:text-white">
                  Data Science
                </Link>
                <Link to="/softwareEngineering" className="block text-gray-400 text-sm hover:text-white">
                  Software Development
                </Link>
              </div>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm uppercase">COMPANY</h3>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 text-sm hover:text-white">
                  Who We Are
                </a>
                <a href="#" className="block text-gray-400 text-sm hover:text-white">
                  Events
                </a>
                <div className="flex items-center space-x-3 bg-gray-800 py-2 border-b-2 border-mediacrest-primary">
                  <span className="text-white text-sm">
                    <Link to="/application" >
                      Application Form
                    </Link>
                  </span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm uppercase">Contact us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">+254 725 223 669</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">info@mediacrestcollege.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <span className="text-gray-400 text-sm">
                    Office Suites, Block B - 3rd Floor Parklands Road - Nairobi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-8 pb-20 md:pb-8 flex flex-col md:flex-row justify-between items-center relative">
            <p className="text-gray-400 text-sm mb-6 md:mb-0">
              © 2025 | MEDIACREST TRAINING COLLEGE | All Rights Reserved
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/Mediacrest-Training-College/61562286963550/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              
              {/* Instagram */}
              <a
                href="https://www.instagram.com/mediacrest_college/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              
              {/* X (Twitter) */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/obuya-blogs/?originalSubdomain=ke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn"
                  className="w-6 h-6 object-contain"
                />
              </a>
              
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@mediacrestcollege?_t=ZM-8ynNJL6aICe&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.39a4.85 4.85 0 0 1-1-.05z"/>
                </svg>
              </a>
              
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@MediacrestTrainingCollege"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}