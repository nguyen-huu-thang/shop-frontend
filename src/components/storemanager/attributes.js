import React, { useState } from "react";

const Attributes = ({ initialData = [], onChange }) => {
  const [dataArray, setDataArray] = useState([...initialData]); // Tạo bản sao của initialData

  const handleInputChange = (e, rowIdx, colIdx) => {
    const value = e.target.value;
    const updatedArray = [...dataArray];
    updatedArray[rowIdx][colIdx] = value; // Cập nhật giá trị ô cụ thể
    setDataArray(updatedArray);

    if (onChange) {
      onChange(updatedArray); // Gửi dữ liệu đã cập nhật lên cha
    }
  };

  const handleAddRow = () => {
    const updatedArray = [...dataArray, [""]]; // Thêm hàng mới với một ô nhập rỗng
    setDataArray(updatedArray);

    if (onChange) {
      onChange(updatedArray); // Gửi dữ liệu đã cập nhật lên cha
    }
  };

  const handleAddColumn = (rowIdx) => {
    const updatedArray = [...dataArray];
    updatedArray[rowIdx] = [...updatedArray[rowIdx], ""]; // Thêm một ô nhập rỗng vào cuối hàng hiện tại
    setDataArray(updatedArray);

    if (onChange) {
      onChange(updatedArray); // Gửi dữ liệu đã cập nhật lên cha
    }
  };

  const handleDeleteRow = (rowIdx) => {
    const updatedArray = [...dataArray];
    updatedArray.splice(rowIdx, 1); // Xóa hàng dựa trên chỉ mục
    setDataArray(updatedArray);

    if (onChange) {
      onChange(updatedArray); // Gửi dữ liệu đã cập nhật lên cha
    }
  };

  const handleDeleteColumn = (rowIdx, colIdx) => {
    const updatedArray = [...dataArray];
    updatedArray[rowIdx].splice(colIdx, 1); // Xóa ô cụ thể dựa trên chỉ mục
    setDataArray(updatedArray);

    if (onChange) {
      onChange(updatedArray); // Gửi dữ liệu đã cập nhật lên cha
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Thuộc tính</h3>
      <button
        type="button"
        onClick={handleAddRow}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        + Thêm thuộc tính
      </button>
      <div className="border border-gray-300 p-4">
        {dataArray.map((row, rowIdx) => (
          <div key={rowIdx} className="mb-2 flex items-center">
            {row.map((col, colIdx) => (
              <div key={`${rowIdx}-${colIdx}`} className="flex items-center">
                <input
                  type="text"
                  placeholder={colIdx === 0 ? "Tên thuộc tính" : "Giá trị"}
                  value={col}
                  onChange={(e) => handleInputChange(e, rowIdx, colIdx)}
                  className="border p-2 mr-2"
                />
                {/* Nút xóa giá trị */}
                {colIdx > 0 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteColumn(rowIdx, colIdx)}
                    className="border p-1 text-red-500 bg-red-100 hover:bg-red-200 rounded"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            {/* Nút thêm giá trị */}
            <button
              type="button"
              onClick={() => handleAddColumn(rowIdx)}
              className="border p-2 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded ml-2"
            >
              + Giá trị
            </button>
            {/* Nút xóa hàng */}
            <button
              type="button"
              onClick={() => handleDeleteRow(rowIdx)}
              className="border p-2 text-red-500 bg-red-100 hover:bg-red-200 rounded ml-2"
            >
              Xóa hàng
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attributes;
