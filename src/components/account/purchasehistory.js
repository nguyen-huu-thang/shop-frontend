import React from "react";

function PurchaseHistory() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lịch sử mua hàng</h2>
      <div>
        <ul>
          <li className="mb-2">Đơn hàng #12345 - 10/10/2024</li>
          <li className="mb-2">Đơn hàng #12346 - 12/10/2024</li>
          <li className="mb-2">Đơn hàng #12347 - 15/10/2024</li>
        </ul>
      </div>
    </div>
  );
};

export default PurchaseHistory;
