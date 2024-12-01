import React, { useState } from "react";
import fileApi from "../../../api/fileApi";

const UpdateFile = ({ fileId, currentDescription, currentIsActive }) => {
  const [description, setDescription] = useState(currentDescription || "");
  const [isActive, setIsActive] = useState(
    currentIsActive !== undefined ? currentIsActive : true
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    if (!description.trim()) {
      setError("Description cannot be empty");
      return;
    }

    const data = { description, isActive };

    try {
      setLoading(true);
      await fileApi.updateFile(fileId, data);
      alert("File updated successfully");
    } catch (err) {
      setError("Failed to update file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Update File Information</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter new description"
          />
        </label>
      </div>
      <div>
        <label>
          Is Active:
          <select
            value={isActive ? "true" : "false"}
            onChange={(e) => setIsActive(e.target.value === "true")}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>
      </div>
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update File"}
      </button>
    </div>
  );
};

export default UpdateFile;
