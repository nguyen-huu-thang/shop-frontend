import React, { useState } from "react";
import useTreeMapCategories from "./treemapCategories";

const TreeSelect = ({ label, name, value, onChange, error }) => {
  const categories = useTreeMapCategories();

  const renderOptions = (nodes, level = 0) => {
    return nodes.map((node) => {
      if (node.children && node.children.length > 0) {
        // Sử dụng dấu "--" để biểu thị cấp độ danh mục
        return [
          // <option key={node.id} value={node.id}>
          //   {`${"--".repeat(level)} ${node.description}`}
          // </option>,
          ...renderOptions(node.children, level + 1),
        ];
      } else {
        return (
          <option key={node.id} value={node.id}>
            {`${node.description}`}
          </option>
        );
      }
    });
  };
  
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">-- Chọn danh mục --</option>
        {renderOptions(categories.categories)}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TreeSelect;
