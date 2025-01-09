import React from "react";
import { useDispatch } from "react-redux";
import { addSpecial, addSpecialProduct } from "../../../redux/specialSlice";

const AddToSpecial = ({ productId }) => {
    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(addSpecialProduct({ productId }));
        alert("Sản phẩm đã được thêm vào danh sách gợi ý!");
    };

    return (
        <button
            onClick={handleAdd}
            className="text-green-600 hover:underline"
        >
            Add Special
        </button>
    );
};

export default AddToSpecial;
