import Story from "../models/Story.model.js";
import User from "../models/User.model.js";

// GET all stories
export const getStories = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const stories = await Story.find()
    .sort({ points: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(stories);
};

// GET single storyy
export const getStoryById = async (req, res) => {
  const story = await Story.findById(req.params.id);
  res.json(story);
};

export const getBookmarkedStories = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("bookmarks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.bookmarks);
  } catch (error) {
    console.error("Bookmark fetch error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
// Toggle bookmark
export const toggleBookmark = async (req, res) => {
  const user = await User.findById(req.user._id);
  const storyId = req.params.id;

  const exists = user.bookmarks.includes(storyId);

  if (exists) {
    user.bookmarks = user.bookmarks.filter(
      (id) => id.toString() !== storyId
    );
  } else {
    user.bookmarks.push(storyId);
  }

  await user.save();

  res.json({ bookmarks: user.bookmarks });
};