import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import storyRoutes from "./routes/story.routes.js";

const app = express();

// ✅ CORS CONFIG
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://hacker-stories-mu.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;