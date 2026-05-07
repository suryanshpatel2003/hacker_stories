import axios from "axios";
import Story from "../models/Story.model.js";

export const scrapeStories = async () => {
  try {
    const { data: ids } = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const top10 = ids.slice(0, 10);

    for (let id of top10) {
      const { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );

      if (!data.title) continue;

      await Story.findOneAndUpdate(
        { title: data.title },
        {
          title: data.title,
          url: data.url,
          points: data.score,
          author: data.by,
          postedAt: new Date(data.time * 1000),
        },
        { upsert: true }
      );
    }

    console.log("Stories scraped successfully");
  } catch (error) {
    console.error("Scraper error:", error.message);
  }
};