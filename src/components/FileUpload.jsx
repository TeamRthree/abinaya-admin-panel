import { useState } from "react";

const FileUpload = ({ onUpload, acceptedTypes = "image/*" }) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file && onUpload) {
      onUpload(file);
      setFile(null);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="file"
        accept={acceptedTypes}
        onChange={handleChange}
        className="text-sm"
      />
      <button
        onClick={handleSubmit}
        className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
