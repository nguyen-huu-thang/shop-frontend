const BASE_URL = "http://your-backend-url/api";

// Lấy danh sách sản phẩm
export const fetchProducts = async (page = 1, limit = 10) => {
  const response = await fetch(`${BASE_URL}/products?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
};
