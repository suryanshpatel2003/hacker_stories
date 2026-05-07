import API from "../api/axios";
import { useState } from "react";
import { Bookmark, Trash2, ExternalLink, Loader2, Star, Clock, User } from "lucide-react";

const StoryCard = ({ story, refresh, isBookmarkedPage }) => {
  const [loading, setLoading] = useState(false);

  const handleBookmark = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(`/stories/${story._id}/bookmark`);
      if (refresh) refresh();
    } catch (error) {
      console.error("Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group bg-white border border-slate-100 rounded-[24px] p-6 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 flex flex-col h-full overflow-hidden">
      
      {/* 🔮 SUBTLE DECOR (Hover par dikhega) */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-slate-50 rounded-full transition-transform duration-700 group-hover:scale-[3] group-hover:bg-indigo-50/50" />

      <div className="relative z-10 flex flex-col h-full">
        {/* 🔗 TITLE SECTION */}
        <div className="mb-4">
          <a
            href={story.url}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-block"
          >
            <h3 className="font-extrabold text-[1.15rem] text-slate-900 leading-[1.4] transition-colors group-hover/link:text-indigo-600">
              {story.title}
              <ExternalLink size={14} className="inline-block ml-2 opacity-0 -translate-y-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all text-indigo-400" />
            </h3>
          </a>
        </div>

        {/* 📝 METADATA (Vibe check: points, author, date) */}
        <div className="flex-grow space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-4 bg-indigo-500 rounded-full" />
            <p className="text-sm font-semibold text-slate-600 italic">
              {story.points} points • {story.author}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium tracking-wide bg-slate-50 w-fit px-2 py-1 rounded-md">
            <Clock size={12} />
            {new Date(story.postedAt).toLocaleString()}
          </div>
        </div>

        {/* 🔘 ACTION BUTTON */}
        <div className="mt-6">
          <button
            onClick={handleBookmark}
            disabled={loading}
            className={`w-full group/btn relative overflow-hidden flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 ${
              isBookmarkedPage 
                ? "bg-white border-2 border-red-50 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white" 
                : "bg-slate-900 text-white hover:bg-indigo-600 shadow-[0_10px_20px_rgba(15,23,42,0.15)] hover:shadow-indigo-200"
            }`}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : isBookmarkedPage ? (
              <>
                <Trash2 size={16} className="group-hover/btn:animate-bounce" />
                Remove Bookmark ❌
              </>
            ) : (
              <>
                <Star size={16} className="group-hover/btn:rotate-[72deg] transition-transform duration-500 fill-current" />
                Bookmark ⭐
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;