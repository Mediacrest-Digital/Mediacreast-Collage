import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleContactForm } from "./routes/contact";
import { handleApplicationEmail } from "./routes/application";
import { handleMasterclassApplication } from "./routes/masterclass";
import { handleScholarshipEmail } from "./routes/scholarship";
import { handleEventRegistration as handleLocalEventRegistration, getEventRegistrations } from "./routes/event-registration";
import { handleGetEvents, handleEventRegistration } from "./routes/event";
import { testEmail } from "./routes/email-test";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleContactForm);
  app.post("/api/application", handleApplicationEmail);
  app.post("/api/masterclass", handleMasterclassApplication);
  app.post("/api/scholarship", handleScholarshipEmail);
  app.post("/api/event-registration", handleLocalEventRegistration);
  app.get("/api/event-registrations", getEventRegistrations);
  app.get("/api/events", handleGetEvents);
  app.post("/api/events/register", handleEventRegistration);
  app.get("/api/test-email", testEmail);

  return app;
}

export default createServer;
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createServer();
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`🚀 Express server running on http://localhost:${PORT}`);
    console.log(`📡 Event registration proxy available at http://localhost:${PORT}/api/events/register`);
  });
}
