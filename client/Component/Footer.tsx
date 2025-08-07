import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
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
{/* Bottom Footer */}
<div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center relative">
  <p className="text-gray-400 text-sm">
    © 2025 | MEDIACREST TRAINING COLLEGE | All Rights Reserved
  </p>
<div className="flex space-x-6 mt-4 md:mt-0 justify-start w-full md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2">
  <a
    href="https://www.facebook.com/people/Mediacrest-Training-College/61562286963550/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white"
  >
    <Facebook className="w-6 h-6" />
  </a>
  <a
    href="https://www.instagram.com/mediacrest_college/?hl=en"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white"
  >
    <Instagram className="w-6 h-6" />
  </a>
  <a
    href="https://www.linkedin.com/company/obuya-blogs/?originalSubdomain=ke"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white"
  >
    <img
      src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
      alt="LinkedIn"
      className="w-6 h-6 object-contain"
    />
  </a>
</div>

</div>


        </div>
      </footer>
    </>
  );
}