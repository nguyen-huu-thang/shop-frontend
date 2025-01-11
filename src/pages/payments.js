import React, { useState } from "react";
import CustomerInfoForm from "../components/order/customerInfo";
import CartSummary from "../components/cart/cartSummary";
import PaymentMethod from "../components/order/paymentMethod";
import Navbar from "../components/navbar";
const Payments = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  return (
    <div>
      <Navbar />
      <CustomerInfoForm formData={formData} setFormData={setFormData} />
      <CartSummary />
      <PaymentMethod formData={formData}/>
    </div>
  );
};

export default Payments;
