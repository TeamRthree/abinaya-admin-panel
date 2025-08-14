import React, { useState } from "react";
import api from "../api/api";

const TestimonialUpload = () => {
  const [type, setType] = useState("text");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const upload = async () => {
    setError("");

    if (!name || (type === "text" && (!date || !rating || !content))) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      let uploadedURL = content;

      // Handle video upload
      if (type === "video") {
        if (!file) {
          setError("Please select a video file.");
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", api.CLOUDINARY_PRESET);

        const res = await fetch(api.CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        uploadedURL = data.secure_url;
      }

      const payload = {
        type,
        name,
        content: uploadedURL,
      };

      if (type === "text") {
        payload.date = date;
        payload.rating = rating;
      }

      // Send to backend using axios (Option 1 pattern)
      await api.axios.post("/admin/testimonials", payload);

      alert("Testimonial uploaded successfully!");

      // Reset
      setName("");
      setDate("");
      setRating(5);
      setContent("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload Testimonial</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="text">Text Testimonial</option>
          <option value="video">Video Testimonial</option>
        </select>

        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {type === "text" && (
          <>
            <input
              type="date"
              className="p-2 border rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="number"
              min={1}
              max={5}
              className="p-2 border rounded"
              placeholder="Rating (1-5)"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            />
          </>
        )}

        {type === "text" ? (
          <textarea
            className="p-2 border rounded col-span-full"
            placeholder="Write testimonial..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <input
            type="file"
            accept="video/*"
            className="col-span-full"
            onChange={(e) => setFile(e.target.files[0])}
          />
        )}
      </div>

      <button
        onClick={upload}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Testimonial"}
      </button>
    </div>
  );
};

export default TestimonialUpload;
