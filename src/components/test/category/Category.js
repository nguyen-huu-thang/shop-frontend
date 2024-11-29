import React from "react";
import AddCategory from "./AddCategory";
import GetCategories from "./GetCategories";
import GetCategoryById from "./GetCategoryById";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";

const Category = () => {
  return (
    <div>
      <AddCategory />
      <GetCategories />
      <GetCategoryById />
      <UpdateCategory />
      <DeleteCategory />
    </div>
  );
};

export default Category;
