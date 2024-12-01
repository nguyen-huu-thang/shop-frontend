import React from "react";
import AddProduct from "./AddProduct";
import GetProducts from "./GetProducts";
import GetProductById from "./GetProductById";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";

const Product = () => {
  return (
    <div>
      <section>
        <AddProduct />
      </section>

      <section>
        <GetProducts />
      </section>

      <section>
        <GetProductById />
      </section>

      <section>
        <UpdateProduct />
      </section>

      <section>
        <DeleteProduct />
      </section>
    </div>
  );
};

export default Product;
