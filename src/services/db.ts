import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database('soida.db');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS scans (
    id TEXT PRIMARY KEY,
    phoneNumber TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    imageUrl TEXT,
    result TEXT NOT NULL,
    consultationRequested BOOLEAN DEFAULT 0,
    isConsulted BOOLEAN DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS admins (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL
  );
`);

// Insert default admin if not exists (admin / admin123)
const adminExists = db.prepare('SELECT * FROM admins WHERE username = ?').get('admin');
if (!adminExists) {
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', 'admin123');
}

// Migration: Add isConsulted column if it doesn't exist
try {
  db.prepare('ALTER TABLE scans ADD COLUMN isConsulted BOOLEAN DEFAULT 0').run();
} catch (e) {
  // Column already exists or other error we can ignore for now
}

export default db;
