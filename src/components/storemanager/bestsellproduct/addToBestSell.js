import React from "react";
import { useDispatch } from "react-redux";
import { addBestSell } from "../../../redux/bestSellSlice";

const AddToBestSell = ({ productId }) => {
    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(addBestSell({ productId }));
        alert("Sản phẩm đã được thêm vào danh sách gợi ý!");
    };

    return (
        <button
            onClick={handleAdd}
            className="text-green-600 hover:underline"
        >
            Add BestSell
        </button>
    );
};

export default AddToBestSell;
