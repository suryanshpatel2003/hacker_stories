import { useEffect, useState } from "react";
import API from "../api/axios";
import StoryCard from "../components/StoryCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { 
  RefreshCw, 
  Bookmark, 
  LogOut, 
  Zap, 
  Clock, 
  LayoutGrid 
} from "lucide-react";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const fetchStories = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/stories");
      setStories(data);
    } catch (error) {
      console.error("Error fetching stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
    const interval = setInterval(() => fetchStories(), 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = async () => {
    setLoading(true);
    try {
      await API.post("/stories/scrape");
      await fetchStories();
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100">
      
      {/* 🚀 MODERN NAVIGATION */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                <Zap size={20} className="text-white fill-current" />
              </div>
              <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                HackerPulse
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/bookmarks"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
              >
                <Bookmark size={18} />
                <span className="hidden sm:block">Saved</span>
              </Link>

              <button
                onClick={handleManualRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-70"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                <span>{loading ? "Syncing..." : "Refresh"}</span>
              </button>

              <div className="h-6 w-[1px] bg-slate-200 mx-1" />

              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 🌪️ MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Top Feed
            </h2>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              <LayoutGrid size={16} />
              Currently displaying {stories.length} trending insights
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Clock size={14} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Auto-sync active
            </span>
          </div>
        </div>

        {/* LOADING STATE (SKELETON) */}
        {loading && stories.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="h-4 bg-slate-100 rounded-full w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded-full w-1/2 animate-pulse" />
                <div className="pt-4 flex gap-2">
                   <div className="h-8 w-16 bg-slate-50 rounded-lg animate-pulse" />
                   <div className="h-8 w-16 bg-slate-50 rounded-lg animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ACTUAL FEED */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story._id}
                className="group transform hover:-translate-y-1 transition-all duration-300"
              >
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && stories.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <h3 className="text-lg font-bold text-slate-800">No stories found</h3>
            <p className="text-slate-500">Try clicking refresh to fetch new data.</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default Home;