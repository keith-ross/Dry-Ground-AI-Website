import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import pg from "pg";

dotenv.config();

// Verify critical environment variables
if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL environment variable is not set!");
  console.error("Please make sure your .env file is properly configured.");
  process.exit(1);
}

// Setup database connection
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Test database connection (from original code)
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected successfully");
    client.release();
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
})();


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Request logging middleware (modified from original)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required"
      });
    }

    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, phone || null, message]
    );

    return res.status(200).json({
      success: true,
      message: "Your message has been received. Thank you for contacting us!"
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to save your message"
    });
  }
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", environment: process.env.NODE_ENV || "development" });
});

app.get("/api/db-health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "ok",
      db_connected: true,
      server_time: result.rows[0].now,
    });
  } catch (err) {
    console.error("Database health check failed:", err);
    res.status(500).json({
      status: "error",
      db_connected: false,
      message: err instanceof Error ? err.message : "Unknown database error",
    });
  }
});


// Static file serving for production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// Global error handler (from original code)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  if (!res.headersSent) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "production"
          ? "An unexpected error occurred"
          : err?.message || "Unknown error",
    });
  }
  next(err);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://0.0.0.0:${PORT}/api/health`);
  console.log(`📑 API endpoints: http://0.0.0.0:${PORT}/api/contact`);
  console.log(`💻 Server address: 0.0.0.0:${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);

  // Log DATABASE_URL presence (not the actual value for security)
  console.log(
    `💾 Database URL configured: ${process.env.DATABASE_URL ? "Yes" : "No"}`,
  );
});

// Handle process termination (from original code)
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

export { pool };