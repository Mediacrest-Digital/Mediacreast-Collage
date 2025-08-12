import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleContactForm } from "./routes/contact";
import { handleApplicationEmail } from "./routes/application";
// import { handleMasterclassApplication } from "./routes/masterclass";
import { testEmail } from "./routes/email-test";

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
  // app.post("/api/masterclass", handleMasterclassApplication);
  app.get("/api/test-email", testEmail);

  return app;
}
