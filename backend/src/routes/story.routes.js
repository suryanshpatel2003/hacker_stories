import express from "express";
import {
  getStories,
  getStoryById,
  toggleBookmark,
  getBookmarkedStories
} from "../controllers/story.controller.js";
import protect from "../middleware/auth.middleware.js";
import { scrapeStories } from "../services/scraper.service.js";

const router = express.Router();

// ✅ IMPORTANT: specific routes pehle
router.get("/bookmarks", protect, getBookmarkedStories);

// general routes baad me
router.get("/", getStories);
router.get("/:id", getStoryById);
router.post("/:id/bookmark", protect, toggleBookmark);

// manual scrape
router.post("/scrape", async (req, res) => {
  await scrapeStories();
  res.json({ message: "Scraped manually" });
});

export default router;