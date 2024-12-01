import React from "react";
import AddCategory from "./AddCategory";
import GetCategories from "./GetCategories";
import GetCategoryById from "./GetCategoryById";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";

const Category = () => {
  return (
    <div>
      <section>
        <AddCategory />
      </section>

      <section>
        <GetCategories />
      </section>

      <section>
        <GetCategoryById />
      </section>

      <section>
        <UpdateCategory />
      </section>

      <section>
        <DeleteCategory />
      </section>
    </div>
  );
};

export default Category;
