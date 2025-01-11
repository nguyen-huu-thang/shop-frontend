import React from 'react'
import { Link } from 'react-router-dom'
const paymentButtons = () => {
  return (
    <div>      
        <div className="text-right mt-4">
            <Link to="/payments">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                Thanh toán
            </button>
            </Link>
        </div>
  </div>
  )
}

export default paymentButtons