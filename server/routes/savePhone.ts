import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const PHONE_FILE = path.join(__dirname, "../../data/phone-numbers.json");

export const handleSavePhone = (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone || typeof phone !== "string") {
    return res.status(400).json({ error: "Missing or invalid phone number." });
  }

  let phones: string[] = [];
  if (fs.existsSync(PHONE_FILE)) {
    try {
      phones = JSON.parse(fs.readFileSync(PHONE_FILE, "utf8"));
      if (!Array.isArray(phones)) phones = [];
    } catch {
      phones = [];
    }
  }

  if (!phones.includes(phone)) {
    phones.push(phone);
    fs.writeFileSync(PHONE_FILE, JSON.stringify(phones, null, 2));
  }

  return res.json({ success: true, phone });
};
