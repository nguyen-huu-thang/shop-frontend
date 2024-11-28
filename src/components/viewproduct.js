import React from "react";

function ViewProduct() {
  const [productList, setProductList] = React.useState([
    // Mock data for testing
    { name: "Product 1", price: "100", category: "Electronics", description: "Description for Product 1", image: "image1.jpg" },
    { name: "Product 2", price: "200", category: "Clothing", description: "Description for Product 2", image: "image2.jpg" },
  ]);

  const handleDelete = (index) => {
    const newProductList = [...productList];
    newProductList.splice(index, 1);
    setProductList(newProductList);
  };

  const handleEdit = (index) => {
    // Logic to edit product (e.g., show a modal with pre-filled data)
    alert(`Editing product ${productList[index].name}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Price</th>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={index}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.price}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{product.description}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProduct;
