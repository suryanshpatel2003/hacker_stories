import { useEffect, useState } from "react";
import API from "../api/axios";
import StoryCard from "../components/StoryCard";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  BookmarkCheck, 
  Search, 
  Inbox,
  Loader2,
  Sparkles
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
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 🏙️ MINIMALIST NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-20 items-center">
            
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all"
              >
                <div className="p-2 rounded-full group-hover:bg-slate-100 transition-colors">
                  <ArrowLeft size={20} />
                </div>
                <span className="text-sm font-bold tracking-tight">Back to Feed</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
               <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                  <Sparkles size={14} className="text-indigo-500" />
                  <span className="text-[11px] font-black uppercase tracking-tighter text-slate-600">
                    {stories.length} Curated Stories
                  </span>
               </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* ✨ PAGE HEADER */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
              <BookmarkCheck size={28} className="text-white" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              My Collection
            </h2>
          </div>
          <p className="text-lg text-slate-500 leading-relaxed">
            Your personal archive of the most interesting tech insights and hacker news. 
            Saved to read when you have the time.
          </p>
        </div>

        {/* 🔄 LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-slate-200 animate-spin mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Vault...</p>
          </div>
        ) : stories.length === 0 ? (
          
          /* 👻 CLASSY EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-24 bg-slate-50/50 border border-slate-100 rounded-[3rem] px-6">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
              <Inbox size={40} className="text-slate-200" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Your collection is empty</h3>
            <p className="text-slate-500 mt-2 mb-10 text-center max-w-sm">
              Explore the latest stories on the main feed and bookmark them to see them here.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              <Search size={18} />
              Start Discovering
            </Link>
          </div>

        ) : (
          
          /* 📱 GRID CONTENT */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story._id}
                className="group relative transition-all duration-300"
              >
                <StoryCard
                  story={story}
                  refresh={fetchBookmarks}
                  isBookmarkedPage={true}
                />
              </div>
            ))}
          </div>
        )}

        {/* 📢 FOOTER INFO */}
        {!loading && stories.length > 0 && (
          <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center">
            <div className="text-slate-300 mb-2">
               <BookmarkCheck size={20} />
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              End of Collection
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookmarks;