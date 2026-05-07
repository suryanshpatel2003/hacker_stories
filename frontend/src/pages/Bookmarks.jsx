import { useEffect, useState } from "react";
import API from "../api/axios";
import StoryCard from "../components/StoryCard";
import { Link } from "react-router-dom";

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
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* 🔥 HEADER */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          ⭐ My Bookmarks
        </h1>

        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          ← Back to Home
        </Link>
      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* STATUS */}
        <div className="flex justify-between mb-4">
          <p className="text-gray-600">
            {stories.length} bookmarked stories
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center mt-10 text-lg">
            Loading bookmarks...
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center mt-20 text-gray-500">
            <p className="text-xl">No bookmarks yet 😔</p>
            <p className="text-sm mt-2">
              Go to home and bookmark some stories!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stories.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                refresh={fetchBookmarks} // important
                isBookmarkedPage={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;