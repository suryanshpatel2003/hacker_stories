import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import storyRoutes from "./routes/story.routes.js";

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
  origin: ["https://hacker-stories-mu.vercel.app"], // abhi local ke liye
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// fallback (extra safe)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;