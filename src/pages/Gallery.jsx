import React, { useState } from "react";
import api from "../api/api"; // ✅ use your configured axios + cloudinary constants

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("image");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const upload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", api.CLOUDINARY_PRESET);

    const endpoint =
      type === "image"
        ? "https://api.cloudinary.com/v1_1/dlwy94hlr/image/upload"
        : api.CLOUDINARY_URL;

    try {
      // ✅ Upload to Cloudinary
      const cloudRes = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      const cloudData = await cloudRes.json();

      if (!cloudRes.ok) throw new Error("Cloudinary upload failed");
      const fileURL = cloudData.secure_url;

      // ✅ Show in frontend gallery
      setItems((prev) => [...prev, { type, previewURL: fileURL }]);
      setFile(null);

      // ✅ Save to backend
      await api.axios.post("/admin/gallery", {
        type,
        url: fileURL,
      });

      alert("Uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Gallery Uploader</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <input
          type="file"
          accept={type === "image" ? "image/*" : "video/*"}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={upload}
          disabled={loading}
          className="bg-pink-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, i) =>
          item.type === "image" ? (
            <img key={i} src={item.previewURL} className="rounded border" />
          ) : (
            <video key={i} src={item.previewURL} controls className="rounded border" />
          )
        )}
      </div>
    </div>
  );
};

export default Gallery;
