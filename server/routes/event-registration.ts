import { Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// Create data directory if it doesn't exist
const dataDir = path.join(process.cwd(), 'data');
const registrationsFile = path.join(dataDir, 'event-registrations.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper function to save registration to JSON file
function saveRegistrationToFile(registration: any) {
  try {
    let registrations = [];
    
    // Read existing registrations if file exists
    if (fs.existsSync(registrationsFile)) {
      const fileContent = fs.readFileSync(registrationsFile, 'utf8');
      registrations = JSON.parse(fileContent);
    }
    
    // Add new registration with timestamp and ID
    const newRegistration = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...registration
    };
    
    registrations.push(newRegistration);
    
    // Save back to file
    fs.writeFileSync(registrationsFile, JSON.stringify(registrations, null, 2));
    
    console.log(`Registration saved to file: ${registrationsFile}`);
    return newRegistration.id;
  } catch (error) {
    console.error(' Error saving registration to file:', error);
    return null;
  }
}

// Helper function to get all registrations
export const getEventRegistrations = (req: Request, res: Response) => {
  try {
    if (!fs.existsSync(registrationsFile)) {
      return res.json({ registrations: [] });
    }
    
    const fileContent = fs.readFileSync(registrationsFile, 'utf8');
    const registrations = JSON.parse(fileContent);
    
    res.json({ 
      registrations: registrations.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) 
    });
  } catch (error) {
    console.error('Error reading registrations:', error);
    res.status(500).json({ 
      error: "Failed to retrieve registrations" 
    });
  }
};

export const handleEventRegistration = async (req: Request, res: Response) => {
  try {
    const { 
      eventId, 
      eventTitle, 
      firstName, 
      lastName, 
      email, 
      phone, 
      expectations,
      eventDate,
      eventTime,
      eventLocation,
      eventDescription 
    } = req.body;

    // Validate required fields
    if (!eventTitle || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // Save registration data to JSON file for reference
    const registrationData = {
      eventId,
      eventTitle,
      firstName,
      lastName,
      email,
      phone,
      expectations,
      eventDate,
      eventTime,
      eventLocation,
      eventDescription
    };
    
    // Save to file and get the registration ID
    const registrationId = saveRegistrationToFile(registrationData);

    // For now, we'll just simulate a successful registration
    console.log("Event registration received:", registrationData);

    // Check if we're in test mode
    if (process.env.TEST_MODE === 'true') {
      console.log(" TEST MODE ENABLED: No event registration email will be sent!");
      
      return res.status(200).json({
        success: true,
        message: " TEST MODE: Event registration received but NO EMAIL was sent.",
        attendee_id: Math.floor(Math.random() * 1000),
      });
    }

    // Return success for now (you can add email functionality later)
    res.status(200).json({
      success: true,
      message: "Registration successful",
      attendee_id: registrationId || Math.floor(Math.random() * 1000),
    });

  } catch (error) {
    console.error("Event registration error:", error);
    
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred",
    });
  }
};