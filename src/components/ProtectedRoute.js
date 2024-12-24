import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { accessToken } = useSelector((state) => state.user);

    // Nếu đã đăng nhập (có accessToken), chuyển hướng về trang chủ
    if (accessToken) {
        return <Navigate to="/" />;
    }

    // Nếu chưa đăng nhập, hiển thị component con (trang đăng nhập/đăng ký)
    return children;
};

export default ProtectedRoute;
