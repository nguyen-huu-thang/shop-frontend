import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate thay vì useHistory
import fileApi from "../../../api/fileApi"; // The file API we created

const DeleteFile = ({ fileId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Thay vì dùng history, sử dụng navigate

  const handleDelete = async () => {
    try {
      setLoading(true);
      await fileApi.deleteFile(fileId);
      setLoading(false);
      alert("File deleted successfully");
      navigate("/files"); // Sử dụng navigate thay vì history.push
    } catch (err) {
      setLoading(false);
      setError("Failed to delete file");
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete File"}
      </button>
    </div>
  );
};

export default DeleteFile;
