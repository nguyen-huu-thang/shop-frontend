import api, { handleError } from "./api";

const securityApi = {
  /**
   * Đăng nhập và lấy access token + refresh token
   * @param {string} username - Tên người dùng
   * @param {string} password - Mật khẩu
   * @returns {Promise<Object>} Đối tượng chứa access token và refresh token
   */
  login: async (username, password) => {
    try {
      const response = await api.post('/login', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Cấp lại Access Token từ Refresh Token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} Đối tượng chứa access token mới
   */
  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post('/refresh-token', {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Đăng xuất người dùng (xóa token phía client)
   * @returns {Promise<Object>} Phản hồi từ server
   */
  logout: async () => {
    try {
      const response = await api.post('/logout');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Thay đổi mật khẩu
   * @param {string} currentPassword - Mật khẩu hiện tại
   * @param {string} newPassword - Mật khẩu mới
   * @returns {Promise<Object>} Phản hồi từ server
   */
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/change-password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Xác thực mật khẩu
   * @param {string} password - Mật khẩu cần xác thực
   * @returns {Promise<Object>} Phản hồi từ server
   */
  verifyPassword: async (password) => {
    try {
      const response = await api.post('/verify-password', {
        password,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Kiểm tra quyền của người dùng
   * @returns {Promise<Object>} Phản hồi từ server chứa quyền
   */
  checkPermission: async () => {
    try {
      const response = await api.get('/cp');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default securityApi;
