import axios from "axios";

// Tạo instance Axios với cấu hình mặc định
const api = axios.create({
    baseURL: "https://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor để xử lý lỗi hoặc thêm logic nếu cần
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

/**
 * Xử lý lỗi khi gọi API
 * @param {Object} error - Đối tượng lỗi từ Axios
 */
export const handleError = (error) => {
    if (error.response) {
        console.error(`API Error [${error.response.status}]: ${error.response.data.message || error.response.data.error}`);
    } else if (error.request) {
        console.error('API Error: Không có phản hồi từ máy chủ.');
    } else {
        console.error('API Error:', error.message);
    }
    throw error;
};

export default api;
