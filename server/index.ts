import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleContactForm } from "./routes/contact";
import { handleApplicationEmail } from "./routes/application";
import { handleMasterclassApplication } from "./routes/masterclass";
import { handleEventRegistration as handleLocalEventRegistration, getEventRegistrations } from "./routes/event-registration";
import { handleGetEvents, handleEventRegistration } from "./routes/event";
import { testEmail } from "./routes/email-test";
import { handleSavePhone } from "./routes/savePhone";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleContactForm);
  app.post("/api/application", handleApplicationEmail);
  app.post("/api/masterclass", handleMasterclassApplication);
  app.post("/api/event-registration", handleLocalEventRegistration);
  app.get("/api/event-registrations", getEventRegistrations);
  app.get("/api/events", handleGetEvents);
  app.post("/api/events/register", handleEventRegistration); // New route for external API proxy
  app.get("/api/test-email", testEmail);
  app.post("/api/save-phone", handleSavePhone);

  return app;
}

// Start server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createServer();
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
    console.log(`Event registration proxy available at http://localhost:${PORT}/api/events/register`);
  });
}
