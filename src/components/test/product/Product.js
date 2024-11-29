import React from "react";
import AddProduct from "./AddProduct";
import GetProducts from "./GetProducts";
import GetProductById from "./GetProductById";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";

const Product = () => {
  return (
    <div>
      <AddProduct />
      <GetProducts />
      <GetProductById />
      <UpdateProduct />
      <DeleteProduct />
    </div>
  );
};

export default Product;
