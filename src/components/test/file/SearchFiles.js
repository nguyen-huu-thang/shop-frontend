import React, { useState } from "react";
import fileApi from "../../../api/fileApi";

const SearchFiles = () => {
  const [query, setQuery] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Search query cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const response = await fileApi.getFilesPaginated(1, 100); // Assuming API supports filtering
      const filteredFiles = response.filter((file) =>
        file.fileName.includes(query) || file.description.includes(query)
      );
      setFiles(filteredFiles);
      setError(null);
    } catch (err) {
      setError("Failed to search files");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Files</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or description"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      <div>
        {files.length > 0 ? (
          <ul>
            {files.map((file) => (
              <li key={file.id}>{file.fileName}</li>
            ))}
          </ul>
        ) : (
          <p>No files found</p>
        )}
      </div>
    </div>
  );
};

export default SearchFiles;
