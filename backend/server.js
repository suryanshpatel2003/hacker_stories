import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";
import { scrapeStories } from "./src/services/scraper.service.js";
import cron from "node-cron";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);

    // ✅ Run scraper on server start
    console.log("🔄 Initial scraping...");
    await scrapeStories();
  });
});

// ✅ Auto scrape every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  console.log("⏱ Running scheduled scraper (every 10 min)...");
  await scrapeStories();
});