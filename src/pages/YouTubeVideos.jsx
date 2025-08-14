import React, { useState, useEffect } from "react";
import api from "../api/api";

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [videoURL, setVideoURL] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await api.axios.get("/admin/youtube-videos");
      setVideos(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch videos.");
    }
  };

  // ✅ Extract YouTube ID
  const extractYouTubeId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddVideo = async () => {
    if (!videoTitle.trim() || !videoURL.trim()) {
      alert("Both Title and URL are required");
      return;
    }

    const youtubeId = extractYouTubeId(videoURL);
    if (!youtubeId) {
      alert("Invalid YouTube URL");
      return;
    }

    setLoading(true);
    try {
      const res = await api.axios.post("/admin/youtube-videos", {
        title: videoTitle,
        url: videoURL,
        youtube_id: youtubeId,
      });

      setVideos([res.data.data, ...videos]);
      setVideoTitle("");
      setVideoURL("");
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Upload YouTube Video</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Video Title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="YouTube URL"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleAddVideo}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Add"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="border p-4 rounded-[10px] shadow">
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <img
                src={`https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-48 object-cover rounded-[5px] mb-2"
              />
            </a>
            <h4 className="font-semibold text-lg">{video.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideos;
