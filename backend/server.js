import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import requestsRouter from "./routes/requests.js";
import authRouter from "./routes/authRoutes.js"; // ✅ NEW: Auth routes

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Configuration
const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.ORIGIN || "*";
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

// ✅ Middleware
app.use(morgan("dev"));
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static for uploaded files
const uploadsPath = path.join(__dirname, UPLOAD_DIR);
app.use("/uploads", express.static(uploadsPath));

// ✅ API Routes
app.use("/api/auth", authRouter); // <-- Handles /register and /login
app.use("/api/requests", requestsRouter); // <-- Your existing requests routes

// ✅ Health check route
app.get("/health", (_, res) => res.json({ ok: true }));

// ✅ Database connection & server start
(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  }
})();
