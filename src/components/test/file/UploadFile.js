import React, { useState } from "react";
import fileApi from "../../../api/fileApi"; // The file API we created

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected");
      return;
    }

    const formData = {
      description: description,
      isActive: true, // Or false based on your need
    };

    try {
      setLoading(true);
      await fileApi.uploadFile(file, formData);
      setLoading(false);
      alert("File uploaded successfully");
    } catch (err) {
      setLoading(false);
      setError("File upload failed");
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Description"
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadFile;
