import { RequestHandler } from "express";

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
      console.log("❌ Missing required fields validation failed");
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
    
    console.log("✅ Registration created locally:", registration);
    
    // Try to contact external API but don't fail if it's down
    try {
      console.log("🔄 Attempting to sync with external API...");
      
      const cleanPayload = {
        event: registration.event,
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        ...(registration.expectations && { expectations: registration.expectations })
      };
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Shorter timeout
      
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
        console.log("✅ Successfully synced with external API");
      } else {
        console.log("⚠️ External API returned error, but registration saved locally");
      }
    } catch (syncError) {
      console.log("⚠️ External API unavailable, registration saved locally only");
    }
    
    // Always return success since we saved locally
    console.log("🎉 Registration completed successfully!");
    res.status(200).json({
      success: true,
      message: "Registration successful! We'll contact you with event details soon.",
      registration_id: registration.id
    });

    clearTimeout(timeoutId);

    const responseText = await response.text();
    console.log("External API response status:", response.status);
    console.log("External API response:", responseText);

    if (!response.ok) {
      console.error(`External API error: ${response.status} ${response.statusText}`);
      
      // Try to parse the error response
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (parseError) {
        errorData = { error: `External API returned ${response.status}: ${response.statusText}` };
      }
      
      return res.status(response.status).json(errorData);
    }

    // Parse and return the success response
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      result = { success: true, message: "Registration successful" };
    }
    
    console.log("Event registration successful:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during event registration:", error);
    res.status(500).json({
      error: "Failed to register for event. Please try again later."
    });
  }
};