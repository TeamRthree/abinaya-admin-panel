import React, { useState, useEffect } from "react";
import api from "../api/api";

const InstagramVideos = () => {
  const [videos, setVideos] = useState([]);
  const [instaURL, setInstaURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await api.axios.get("/admin/instagram-videos");
      setVideos(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch Instagram videos.");
    }
  };

  const handleAddVideo = async () => {
    if (!instaURL.trim()) {
      alert("Instagram URL is required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.axios.post("/admin/instagram-videos", {
        url: instaURL,
      });

      setVideos([res.data.data, ...videos]);
      setInstaURL(""); // clear input
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.error || "Failed to add Instagram video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Upload Instagram Video</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Paste Instagram Post or Reel URL"
          value={instaURL}
          onChange={(e) => setInstaURL(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleAddVideo}
          disabled={loading}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="border p-4 rounded-[10px] shadow">
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <img
                src={video.thumbnail} // use thumbnail from backend
                alt="Instagram Video"
                className="w-full h-48 object-cover rounded-[5px] mb-2"
              />
            </a>
            <div
              className="embed-html"
              dangerouslySetInnerHTML={{ __html: video.embed_html }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramVideos;
