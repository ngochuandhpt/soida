import express from "express";
import { createServer as createViteServer } from "vite";
import db from "./src/services/db.js"; // Note: using .js for ESM compatibility in some environments, but tsx handles .ts
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Routes
  
  // Save scan result
  app.post("/api/scans", (req, res) => {
    const { id, phoneNumber, timestamp, imageUrl, result, consultationRequested } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO scans (id, phoneNumber, timestamp, imageUrl, result, consultationRequested)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      stmt.run(id, phoneNumber, timestamp, imageUrl, JSON.stringify(result), consultationRequested ? 1 : 0);
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving scan:", error);
      res.status(500).json({ error: "Failed to save scan" });
    }
  });

  // Update consultation status
  app.post("/api/scans/consultation", (req, res) => {
    const { timestamp, phoneNumber, requested } = req.body;
    try {
      const stmt = db.prepare(`
        UPDATE scans SET consultationRequested = ? 
        WHERE phoneNumber = ? AND timestamp = ?
      `);
      stmt.run(requested ? 1 : 0, phoneNumber, timestamp);
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
