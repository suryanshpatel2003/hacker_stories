import { useEffect, useState } from "react";
import API from "../api/axios";
import StoryCard from "../components/StoryCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

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
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStories();

    const interval = setInterval(() => {
      fetchStories();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = async () => {
    setLoading(true);
    await API.post("/stories/scrape");
    await fetchStories();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">

      {/* 🔥 NAVBAR */}
      <div className="backdrop-blur-md bg-white/70 border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            🚀 Hacker News
          </h1>

          <div className="flex items-center gap-3">

            <Link
              to="/bookmarks"
              className="px-4 py-1 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition"
            >
              ⭐ Bookmarks
            </Link>

            <button
              onClick={handleManualRefresh}
              className={`px-4 py-1 rounded-full text-white transition ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Refreshing..." : "Refresh 🔄"}
            </button>

            <button
              onClick={logout}
              className="px-4 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* STATUS BAR */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 text-sm">
            Showing <span className="font-semibold">{stories.length}</span> top stories
          </p>

          <p className="text-xs text-gray-400">
            Auto refresh every 10 min ⏱
          </p>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story._id}
                className="transform hover:scale-[1.02] transition duration-200"
              >
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;