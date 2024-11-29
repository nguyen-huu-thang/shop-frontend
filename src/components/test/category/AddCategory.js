import React, { useState } from "react";
import categoryApi from "../../../api/categoryApi";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parent, setParent] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const category = await categoryApi.createCategory({ name, description, parent });
      setMessage(`Category "${category.name}" created successfully!`);
      setName("");
      setDescription("");
      setParent(null);
    } catch (error) {
      setMessage("Failed to create category.");
    }
  };

  return (
    <div>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Parent Category ID (optional)"
          value={parent || ""}
          onChange={(e) => setParent(e.target.value || null)}
        />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCategory;
