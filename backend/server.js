import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";

import productRoute from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Needed for __dirname in ES modules
const __dirname = path.resolve();

// Middleware
app.use(express.json());

// API routes
app.use("/api/products", productRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // ✅ If you are using Vite
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // ✅ Catch-all for SPA routing
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
