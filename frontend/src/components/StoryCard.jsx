import API from "../api/axios";
import { useState } from "react";

const StoryCard = ({ story, refresh, isBookmarkedPage }) => {
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    setLoading(true);
    await API.post(`/stories/${story._id}/bookmark`);
    setLoading(false);

    // refresh parent (important)
    if (refresh) refresh();
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition">
      
      <a
        href={story.url}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-lg text-blue-600 hover:underline"
      >
        {story.title}
      </a>

      <p className="text-sm text-gray-500 mt-1">
        {story.points} points • {story.author}
      </p>

      <p className="text-xs text-gray-400 mt-1">
        {new Date(story.postedAt).toLocaleString()}
      </p>

      <button
        onClick={handleBookmark}
        disabled={loading}
        className={`mt-3 px-3 py-1 rounded text-white ${
          isBookmarkedPage ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading
          ? "Processing..."
          : isBookmarkedPage
          ? "Remove Bookmark ❌"
          : "Bookmark ⭐"}
      </button>
    </div>
  );
};

export default StoryCard;