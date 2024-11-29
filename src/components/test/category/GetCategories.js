import React, { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";

const GetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAllCategories();
        setCategories(data);
      } catch (error) {
        setMessage("Failed to fetch categories.");
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Category List</h2>
      {message && <p>{message}</p>}
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <strong>{category.name}</strong> - {category.description || "No description"}
            {category.parent && <p>Parent ID: {category.parent.id}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetCategories;
