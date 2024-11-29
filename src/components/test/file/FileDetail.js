import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fileApi from "../../../api/fileApi"; // The file API we created

const FileDetail = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fileApi.getFileById(id);
        setFile(response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch file:", error);
        setLoading(false);
      }
    };

    fetchFile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!file) {
    return <div>File not found</div>;
  }

  return (
    <div>
      <h2>File Details</h2>
      <p>Name: {file.fileName}</p>
      <p>Path: {file.filePath}</p>
      <p>Size: {file.fileSize} bytes</p>
      <p>Uploaded At: {file.uploadedAt}</p>
      <p>Description: {file.description || "No description available"}</p>
    </div>
  );
};

export default FileDetail;
