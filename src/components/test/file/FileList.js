import React, { useEffect, useState } from "react";
import fileApi from "../../../api/fileApi"; // The file API we created

const FileList = ({ page, limit }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fileApi.getFilesPaginated(page, limit);
        setFiles(response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };

    fetchFiles();
  }, [page, limit]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>File List</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>{file.fileName}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
