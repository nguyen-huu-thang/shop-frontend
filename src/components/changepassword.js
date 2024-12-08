import React, { useState } from "react";

function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Xóa lỗi khi người dùng nhập liệu
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};

    // Kiểm tra lỗi mật khẩu cũ
    if (!formData.oldPassword) {
      formErrors.oldPassword = "Mật khẩu cũ không được để trống.";
    }

    // Kiểm tra lỗi mật khẩu mới và xác nhận mật khẩu
    if (!formData.newPassword) {
      formErrors.newPassword = "Mật khẩu mới không được để trống.";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      formErrors.confirmPassword = "Mật khẩu mới và xác nhận mật khẩu không khớp.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Nếu không có lỗi, thực hiện đổi mật khẩu
    alert("Đổi mật khẩu thành công.");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Mật khẩu cũ</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
