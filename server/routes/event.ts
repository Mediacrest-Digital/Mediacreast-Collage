import { RequestHandler } from "express";
import fs from "fs";
import path from "path";

const PHONE_FILE = path.join(__dirname, "../../data/phone-numbers.json");

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  start_time: string;
  end_time?: string;
  location: string;
  host: string;
  poster?: string;
}

interface EventRegistrationData {
  event: number;
  name: string;
  email: string;
  phone: string;
  expectations?: string;
}

export const handleGetEvents: RequestHandler = async (req, res) => {
  try {
    console.log("Fetching events from external API: https://admin.mediacrestcollege.com/events/api/");
    
    const response = await fetch("https://admin.mediacrestcollege.com/events/api/", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`External API error: ${response.status} ${response.statusText}`);
      throw new Error(`External API returned ${response.status}: ${response.statusText}`);
    }

    const events: Event[] = await response.json();
    console.log(`Successfully fetched ${events.length} events from external API`);
    
    // Return the events data from external API
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events from external API:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events from external API. Please try again later."
    });
  }
};

export const handleEventRegistration: RequestHandler = async (req, res) => {
  try {
    console.log("=== EVENT REGISTRATION REQUEST ===");
    console.log("Processing event registration locally (fallback mode)");
    console.log("Registration data received:", req.body);
    
    // Extract and validate fields
    const { event, name, email, phone, expectations } = req.body;
    
    console.log("Extracted fields:", { event, name, email, phone, expectations });
    
    // Validate required fields
    if (!event || !name || !email || !phone) {
      console.log("Missing required fields validation failed");
      return res.status(400).json({
        error: "Missing required fields: event, name, email, and phone are required."
      });
    }
    
    // Create registration record
    const registration = {
      id: Date.now(),
      event: parseInt(event),
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      expectations: expectations ? String(expectations).trim() : "",
      registeredAt: new Date().toISOString(),
      status: "confirmed"
    };
    
    console.log("Registration created locally:", registration);

    // Save phone number as object with metadata in an array (not as string)
    let phoneRecords: any[] = [];
    if (fs.existsSync(PHONE_FILE)) {
      try {
        const raw = JSON.parse(fs.readFileSync(PHONE_FILE, "utf8"));
        // If legacy format (array of strings), ignore those and only keep objects
        if (Array.isArray(raw)) {
          phoneRecords = raw.filter(r => typeof r === "object" && r !== null);
        } else if (Array.isArray(raw.event_registrations)) {
          phoneRecords = raw.event_registrations;
        }
      } catch {
        phoneRecords = [];
      }
    }
    // Only add if not already present for this event/email/phone
    const alreadyExists = phoneRecords.some(
      r => r.phone === registration.phone && r.email === registration.email && r.event === registration.event
    );
    if (!alreadyExists) {
      phoneRecords.push({
        id: registration.id,
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        event: registration.event,
        eventTitle: registration.event,
        status: registration.status,
        registeredAt: registration.registeredAt,
        expectations: registration.expectations
      });
      fs.writeFileSync(PHONE_FILE, JSON.stringify(phoneRecords, null, 2));
    }
    
    // Try to contact external API but don't fail if it's down
    try {
      console.log("Attempting to sync with external API...");
      
      const cleanPayload = {
        event: registration.event,
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        ...(registration.expectations && { expectations: registration.expectations })
      };
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); 
      
      const response = await fetch("https://admin.mediacrestcollege.com/events/api/register-event/", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanPayload),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        console.log("Successfully synced with external API");
      } else {
        console.log(" External API returned error, but registration saved locally");
      }
    } catch (syncError) {
      console.log(" External API unavailable, registration saved locally only");
    }
    
    // Always return success since we saved locally
    console.log("Registration completed successfully!");
    res.status(200).json({
      success: true,
      message: "Registration successful! We'll contact you with event details soon.",
      registration_id: registration.id
    });
  } catch (error) {
    console.error("Error during event registration:", error);
    res.status(500).json({
      error: "Failed to process registration. Please try again later."
    });
  }
};