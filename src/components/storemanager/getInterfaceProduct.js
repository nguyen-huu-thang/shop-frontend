import React, { useState, useEffect } from "react";
import fileApi from "../../api/fileApi";

const GetInterfaceProduct = ({ productId, className }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFile = async (retryCount = 10) => {
      if (!productId) {
        setError("Product ID is required");
        return;
      }

      try {
        setLoading(true);
        const response = await fileApi.getFilesByProduct(productId, true);
        console.log("Response from API:", response);

        if (response && response.length > 0) {
          const fileData = response[0];
          if (!fileData.filePath) {
            console.error("File path is invalid:", fileData);
            setError("Đường dẫn file không hợp lệ");
            return;
          }

          fileData.fullPath = `https://localhost:8000/data/${fileData.filePath.replace(/\\/g, "/")}`;
          setFile(fileData);
          setError(null);
        } else {
          console.warn("File not found for productId:", productId);
          setFile(null);
          setError("File không tồn tại");
        }
      } catch (err) {
        if (retryCount > 0) {
          console.log(`Retrying... attempts left: ${retryCount}`);
          fetchFile(retryCount - 1);
        } else {
          console.error("Error fetching file:", err);
          setError("Không thể tải ảnh đại diện sản phẩm");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [productId]);

  if (loading) {
    return <p>Đang tải ảnh...</p>;
  }

  // Nếu có lỗi hoặc không có ảnh, hiển thị ảnh mặc định
  if (error || !file) {
    return (
      <img
        src="/default-image.png" // Đường dẫn đến ảnh mặc định
        alt="Ảnh mặc định"
        className={`object-cover ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <img
      src={file.fullPath}
      alt={file.fileName || "Ảnh sản phẩm"}
      className={`object-cover ${className}`}
      loading="lazy"
      onError={(e) => {
        e.target.onerror = null; // Ngăn chặn lặp lại onError
        e.target.src = "/default-image.png"; // Đặt ảnh mặc định khi lỗi tải ảnh
      }}
    />
  );
};

export default GetInterfaceProduct;
