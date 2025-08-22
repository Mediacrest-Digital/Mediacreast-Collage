import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import ScrollRestoration from "./pages/Scroll";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Corporate from "./pages/Corporate";
import Contact from "./pages/Contact";
import Weare from "./pages/Weare";
import Digital from "./pages/Digital";
import Graphic from "./pages/Graphic";
import Photography from "./pages/Photograpy";
import Events from "./pages/Events";
import EventRegistration from "./pages/EventRegistration";
import Registration from "./pages/Registration";
import Application from "./pages/Application";
import DigitalApplication from "./pages/digitalApplication";
import GraphicApplication from "./pages/GraphicApplication";
import PhotographyApplication from "./pages/PhotoApplication";
import CyberSecurityApplication from "./pages/CyberSecurityApplication";
import DataScienceApplication from "./pages/DataScienceApplication";
import SoftwareEngineeringApplication from "./pages/SoftwareEngineeringApplication";
import CourseDropDown from "./Component/courseDropdown";
import ApplicationsFol from "./pages/ApplicationsList";
import CountyModels from "./pages/County";
import MasterclassApplication from "./pages/MasterclassApplication";
// Try the correct casing and path for WhatsAppButton
import WhatsApp from "./pages/WhatsAppButton1";
import CyberSecurity from "./pages/cyberSecurity";
import Software from "./pages/Software";
import DataScience from "./pages/dataScience";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Load gtag.js
    const script1 = document.createElement("script");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-FVEP6C4V66";
    script1.async = true;
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FVEP6C4V66');
    `;
    document.head.appendChild(script2);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollRestoration>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/corporate" element={<Corporate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/who_we_are" element={<Weare />} />
              <Route path="/digital" element={<Digital />} />
              <Route path="/graphic-design" element={<Graphic />} />
              <Route path="/masterclass-application" element={<MasterclassApplication />} />
              <Route
                path="/photography-videography"
                element={<Photography />}
              />
              <Route path="/events-registration" element={<EventRegistration />} />
              <Route path="/events" element={<Events />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/application" element={<Application />} />
              <Route path="/digital-marketing" element={<Digital />} />
              <Route path="/trial" element={<CourseDropDown />} />
              <Route path="/Listapplications" element={<ApplicationsFol />} />
              <Route
                path="/digital-marketing-application"
                element={<DigitalApplication />}
              />
              <Route
                path="/graphic-design-application"
                element={<GraphicApplication />}
              />
              <Route
                path="/photography-videography-application"
                element={<PhotographyApplication />}
              />
              <Route
                path="/cyber-security-application"
                element={<CyberSecurityApplication />}
              />
              <Route
                path="/data-science-application"
                element={<DataScienceApplication />}
              />
              <Route
                path="/software-engineering-application"
                element={<SoftwareEngineeringApplication />}
              />
              <Route path="/countyModel" element={<CountyModels />} />
              <Route path="/cyberSecurity" element={<CyberSecurity />} />
              <Route
                path="/courses/cyber-security"
                element={<CyberSecurity />}
              />
              <Route path="/softwareEngineering" element={<Software />} />
              <Route
                path="/courses/software-engineering"
                element={<Software />}
              />
              <Route path="/dataScience" element={<DataScience />} />
              <Route path="/courses/data-science" element={<DataScience />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ScrollRestoration>
          {/* ✅ Floating WhatsApp button - must be outside Routes */}
          <WhatsApp />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
