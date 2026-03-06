import express from "express";
import { createServer as createViteServer } from "vite";
import db from "./src/services/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Google Sheets Helper
async function appendToSheet(data: any[]) {
  const authEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const authKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = process.env.GOOGLE_SHEET_NAME || 'Sheet1';

  if (!authEmail || !authKey || !spreadsheetId) {
    console.warn("Google Sheets credentials not fully configured. Skipping sheet update.");
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: authEmail,
        private_key: authKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [data],
      },
    });
    console.log("Successfully appended to Google Sheet");
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Routes
  
  // Login/Lead capture
  app.post("/api/login", async (req, res) => {
    const { phoneNumber } = req.body;
    const timestamp = new Date().toISOString();
    console.log(`User logged in: ${phoneNumber}`);
    
    // Push to Google Sheets immediately as a lead
    await appendToSheet([
      timestamp,
      phoneNumber,
      'Login Only',
      '', // Score
      '', // Skin Type
      '', // Primary Concern
      'No' // Consultation
    ]);
    
    res.json({ success: true });
  });

  // Save scan result
  app.post("/api/scans", async (req, res) => {
    const { id, phoneNumber, timestamp, imageUrl, result, consultationRequested } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO scans (id, phoneNumber, timestamp, imageUrl, result, consultationRequested)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      stmt.run(id, phoneNumber, timestamp, imageUrl, JSON.stringify(result), consultationRequested ? 1 : 0);
      
      // Push to Google Sheets
      await appendToSheet([
        timestamp,
        phoneNumber,
        'Skin Scan',
        result.overallScore,
        result.skinType,
        result.primaryConcern,
        consultationRequested ? 'Yes' : 'No',
        id
      ]);

      res.json({ success: true });
    } catch (error) {
      console.error("Error saving scan:", error);
      res.status(500).json({ error: "Failed to save scan" });
    }
  });

  // Update consultation status
  app.post("/api/scans/consultation", async (req, res) => {
    const { timestamp, phoneNumber, requested } = req.body;
    try {
      const stmt = db.prepare(`
        UPDATE scans SET consultationRequested = ? 
        WHERE phoneNumber = ? AND timestamp = ?
      `);
      stmt.run(requested ? 1 : 0, phoneNumber, timestamp);
      
      if (requested) {
        // Push to Google Sheets as a consultation request
        await appendToSheet([
          new Date().toISOString(),
          phoneNumber,
          'Consultation Requested',
          '', // Score
          '', // Skin Type
          '', // Primary Concern
          'Yes',
          `Update for scan at ${timestamp}`
        ]);
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error updating consultation:", error);
      res.status(500).json({ error: "Failed to update consultation" });
    }
  });

  // Update consulted status
  app.post("/api/admin/scans/consulted", (req, res) => {
    const { id, isConsulted } = req.body;
    console.log(`Updating consulted status for scan ${id} to ${isConsulted}`);
    try {
      const stmt = db.prepare(`
        UPDATE scans SET isConsulted = ? 
        WHERE id = ?
      `);
      const result = stmt.run(isConsulted ? 1 : 0, id);
      console.log(`Update result:`, result);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating consulted status:", error);
      res.status(500).json({ error: "Failed to update consulted status" });
    }
  });

  // Delete scan
  app.delete("/api/admin/scans/:id", (req, res) => {
    const { id } = req.params;
    console.log(`Deleting scan ${id}`);
    try {
      const stmt = db.prepare('DELETE FROM scans WHERE id = ?');
      const result = stmt.run(id);
      console.log(`Delete result:`, result);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting scan:", error);
      res.status(500).json({ error: "Failed to delete scan" });
    }
  });

  // Admin Login
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    const admin = db.prepare('SELECT * FROM admins WHERE username = ? AND password = ?').get(username, password);
    if (admin) {
      res.json({ success: true, token: "mock-admin-token" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Get all scans for admin
  app.get("/api/admin/scans", (req, res) => {
    // In a real app, verify token here
    try {
      const scans = db.prepare('SELECT * FROM scans ORDER BY timestamp DESC').all();
      const formattedScans = scans.map((s: any) => ({
        ...s,
        result: JSON.parse(s.result),
        consultationRequested: s.consultationRequested === 1,
        isConsulted: s.isConsulted === 1
      }));
      res.json(formattedScans);
    } catch (error) {
      console.error("Error fetching scans:", error);
      res.status(500).json({ error: "Failed to fetch scans" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
