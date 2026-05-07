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
  LayoutGrid,
  TrendingUp,
  ChevronRight
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
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 🏙️ MINIMALIST NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-slate-900 p-2 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg shadow-slate-200">
                <Zap size={22} className="text-white fill-current" />
              </div>
              <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase">
                HackerPulse
              </h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/bookmarks"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
              >
                <Bookmark size={18} />
                <span className="hidden sm:block">Saved</span>
              </Link>

              <button
                onClick={handleManualRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-70"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                <span className="hidden sm:block">{loading ? "Syncing..." : "Refresh Feed"}</span>
              </button>

              <div className="h-6 w-px bg-slate-100 mx-2" />

              <button
                onClick={logout}
                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Logout"
              >
                <LogOut size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        
        {/* ✨ HERO & STATUS SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 border-b border-slate-50 pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
              <TrendingUp size={14} />
              Live Intelligence
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Latest from the <br/> 
              <span className="text-slate-400 font-medium italic">Developer Frontline</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Update Status</span>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-tighter">
                  Synced {stories.length} Items
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 📱 FEED GRID */}
        {loading && stories.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 space-y-5 h-64 animate-pulse">
                <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
                <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
                <div className="pt-10 flex gap-3">
                   <div className="h-10 w-24 bg-slate-200 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story._id}
                className="group relative"
              >
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        )}

        {/* 👻 EMPTY STATE */}
        {!loading && stories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <LayoutGrid size={48} className="text-slate-200 mb-6" />
            <h3 className="text-xl font-bold text-slate-800">Your feed is quiet</h3>
            <p className="text-slate-500 mt-2">Hit refresh to scout for new stories.</p>
          </div>
        )}

        {/* 🕒 FOOTER CLOCK */}
        <div className="mt-20 flex justify-center">
            <div className="flex items-center gap-2 text-slate-300 font-medium text-xs">
                <Clock size={14} />
                <span>Auto-refreshing every 600 seconds</span>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Home;