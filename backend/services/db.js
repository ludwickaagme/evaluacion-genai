const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const DB_DIR = path.join(__dirname, '..', 'db');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const DB_PATH = path.join(DB_DIR, 'contacts.db');
const db = new Database(DB_PATH);

db.prepare(`CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  organizacion TEXT NOT NULL,
  correo TEXT NOT NULL,
  correo_hash TEXT NOT NULL UNIQUE,
  telefono TEXT NOT NULL,
  rol TEXT NOT NULL,
  pais TEXT NOT NULL,
  fecha TEXT NOT NULL,
  resultados TEXT NOT NULL
)`).run();

function openDB() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  return db;
}

function hashEmail(email) {
  return crypto.createHash('sha256').update(String(email).trim().toLowerCase()).digest('hex');
}

module.exports = { hashEmail, openDB };
