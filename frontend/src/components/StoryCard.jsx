import API from "../api/axios";
import { useState } from "react";
import { Bookmark, Trash2, ExternalLink, Loader2 } from "lucide-react";

const StoryCard = ({ story, refresh, isBookmarkedPage }) => {
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    setLoading(true);
    try {
      await API.post(`/stories/${story._id}/bookmark`);
      if (refresh) refresh();
    } catch (error) {
      console.error("Error updating bookmark");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-900 transition-all duration-300 flex flex-col h-full group">
      
      {/* 📎 TITLE & EXTERNAL LINK */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <a
          href={story.url}
          target="_blank"
          rel="noreferrer"
          className="font-bold text-lg text-slate-900 leading-tight hover:text-indigo-600 transition-colors"
        >
          {story.title}
        </a>
        <ExternalLink size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors flex-shrink-0 mt-1" />
      </div>

      {/* 📝 METADATA (Wahi text jo tumne diya tha) */}
      <div className="flex-grow">
        <p className="text-sm text-gray-500 font-medium">
          {story.points} points • {story.author}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {new Date(story.postedAt).toLocaleString()}
        </p>
      </div>

      {/* 🔘 ACTION BUTTON */}
      <div className="mt-5 pt-4 border-t border-slate-50">
        <button
          onClick={handleBookmark}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
            isBookmarkedPage 
              ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white" 
              : "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200"
          }`}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : isBookmarkedPage ? (
            <>
              <Trash2 size={16} />
              Remove Bookmark ❌
            </>
          ) : (
            <>
              <Bookmark size={16} />
              Bookmark ⭐
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StoryCard;