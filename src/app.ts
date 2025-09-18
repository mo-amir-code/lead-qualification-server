/**
 * app.ts
 * -----------------------------
 * Main Express application setup.
 * - Loads environment variables
 * - Configures middleware (CORS, JSON parsing, URL parsing)
 * - Registers API routes
 * - Attaches global error handler
 */

import express from "express";
import "dotenv/config";
import cors from "cors";

import { errorHandler } from "./middlewares/errorHandling/index.js";
import apiRoutes from "./routes/index.js";

const app = express();

/**
 * CORS Middleware
 * -----------------------------
 * Enables cross-origin requests.
 * - Allows all origins (*) for testing/demo purposes.
 * - Supports common HTTP methods.
 * - Allows sending credentials (cookies/headers).
 */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * Body Parsers
 * -----------------------------
 * - Parses incoming JSON payloads (limit: 16kb).
 * - Parses URL-encoded form data.
 */
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * API Routes
 * -----------------------------
 * All application routes are defined under /routes.
 * Example: /offer, /leads/upload, /score, /results
 */
app.use(apiRoutes);

/**
 * Global Error Handler
 * -----------------------------
 * Catches errors thrown in routes/middlewares
 * and returns consistent error responses.
 */
app.use(errorHandler);

export { app };
