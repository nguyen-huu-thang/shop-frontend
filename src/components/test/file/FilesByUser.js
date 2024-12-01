import React, { useEffect, useState } from "react";
import fileApi from "../../../api/fileApi";

const FilesByUser = ({ userId }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilesByUser = async () => {
      try {
        const response = await fileApi.getFilesByUser(userId);
        setFiles(response);
      } catch (err) {
        setError("Failed to fetch files for this user.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilesByUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <h2>Files for User ID: {userId}</h2>
      {files.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>File Name</th>
              <th>Uploaded At</th>
              <th>Size</th>
              <th>Active</th>
              <th>Description</th>
              <th>Product ID</th>
              <th>Review ID</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.id}</td>
                <td>{file.fileName}</td>
                <td>{file.uploadedAt}</td>
                <td>{file.fileSize} bytes</td>
                <td>{file.isActive ? "Yes" : "No"}</td>
                <td>{file.description || "No description"}</td>
                <td>{file.productId || "N/A"}</td>
                <td>{file.reviewId || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No files found for this user.</p>
      )}
    </div>
  );
};

export default FilesByUser;
