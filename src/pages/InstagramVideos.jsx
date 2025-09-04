import React, { useState, useEffect } from "react";
import api from "../api/api";

const InstagramVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await api.axios.get("/admin/instagram-videos");
      setVideos(res.data || []); // adjust if backend returns differently
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch Instagram videos.");
    }
  };

  const handleSyncReels = async () => {
    setLoading(true);
    try {
      const res = await api.axios.post("/admin/instagram-videos/sync");
      alert(`${res.data.count} reels synced successfully`);
      fetchVideos(); // refresh list
    } catch (err) {
      console.error("Sync error:", err);
      alert("Failed to sync reels");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Instagram Reels</h2>

      <div className="mb-6">
        <button
          onClick={handleSyncReels}
          disabled={loading}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          {loading ? "Syncing..." : "Sync Reels"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.insta_id} className="border p-4 rounded-[10px] shadow">
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <img
                src={video.thumbnail_url || video.media_url}
                alt="Instagram Video"
                className="w-full h-48 object-cover rounded-[5px] mb-2"
              />
            </a>
            {video.caption && <p className="text-sm">{video.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramVideos;
