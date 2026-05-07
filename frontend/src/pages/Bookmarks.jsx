import { useEffect, useState } from "react";
import API from "../api/axios";
import StoryCard from "../components/StoryCard";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  BookmarkCheck, 
  Search, 
  Ghost,
  Loader2
} from "lucide-react";

const Bookmarks = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/stories/bookmarks");
      setStories(data);
    } catch (error) {
      console.error("Error fetching bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      
      {/* 🏙️ GLASS NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="p-2 -ml-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                title="Go Back"
              >
                <ArrowLeft size={22} />
              </Link>
              <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <BookmarkCheck className="text-indigo-600" size={24} />
                My Collection
              </h1>
            </div>

            <div className="hidden sm:block">
               <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">
                 {stories.length} SAVED STORIES
               </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* ✨ TITLE SECTION */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Saved for Later
          </h2>
          <p className="text-slate-500 mt-1">
            Access all your hand-picked hacker news stories in one place.
          </p>
        </div>

        {/* 🔄 LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-500 font-medium animate-pulse">Syncing your bookmarks...</p>
          </div>
        ) : stories.length === 0 ? (
          
          /* 👻 EMPTY STATE - Jab koi bookmark na ho */
          <div className="flex flex-col items-center justify-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-3xl">
            <div className="bg-slate-50 p-6 rounded-full mb-6">
              <Ghost size={60} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">It's quiet in here...</h3>
            <p className="text-slate-500 mt-2 mb-8 text-center max-w-xs">
              Looks like you haven't saved any interesting stories yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
            >
              <Search size={18} />
              Explore Stories
            </Link>
          </div>

        ) : (
          
          /* 📱 GRID CONTENT */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story._id}
                className="group relative transform transition-all duration-300 hover:-translate-y-1"
              >
                {/* StoryCard handles the internal design */}
                <StoryCard
                  story={story}
                  refresh={fetchBookmarks}
                  isBookmarkedPage={true}
                />
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* 📢 FOOTER TIP */}
      {!loading && stories.length > 0 && (
        <p className="text-center text-slate-400 text-sm py-10">
          Tip: You can un-bookmark stories by clicking the star icon again.
        </p>
      )}
    </div>
  );
};

export default Bookmarks;