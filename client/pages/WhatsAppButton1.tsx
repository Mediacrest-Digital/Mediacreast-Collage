import React from 'react';
import "../WhatsAppButton.css"
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/254725223669"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        width="30"
        height="30"
      />
      WhatsApp Us
    </a>
  );
};

export default WhatsAppButton;
