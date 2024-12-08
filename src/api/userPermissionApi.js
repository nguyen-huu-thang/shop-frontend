import api from "./api";

const userPermissionApi = {
  /**
   * Lấy danh sách tất cả quyền của người dùng.
   * @returns {Promise<Array>} Danh sách quyền.
   */
  getAllPermissions: async () => {
    try {
      const response = await api.get("/api/user-permissions");
      return response.data;
    } catch (error) {
      console.error("Error fetching permissions:", error);
      throw error;
    }
  },

  /**
   * Lấy thông tin chi tiết của một quyền theo ID.
   * @param {number} id - ID của quyền cần lấy thông tin.
   * @returns {Promise<Object>} Chi tiết quyền.
   */
  getPermissionById: async (id) => {
    try {
      const response = await api.get(`/api/user-permissions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching permission with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Gán quyền mới cho người dùng.
   * @param {Object} permissionData - Dữ liệu quyền cần gán.
   * @returns {Promise<Object>} Quyền vừa được gán.
   */
  assignPermission: async (permissionData) => {
    try {
      const response = await api.post("/api/user-permissions", permissionData);
      return response.data;
    } catch (error) {
      console.error("Error assigning permission:", error);
      throw error;
    }
  },

  /**
   * Cập nhật quyền của người dùng.
   * @param {number} id - ID của quyền cần cập nhật.
   * @param {Object} permissionData - Dữ liệu cập nhật.
   * @returns {Promise<Object>} Quyền đã được cập nhật.
   */
  updatePermission: async (id, permissionData) => {
    try {
      const response = await api.put(`/api/user-permissions/${id}`, permissionData);
      return response.data;
    } catch (error) {
      console.error(`Error updating permission with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Xóa quyền của người dùng.
   * @param {number} id - ID của quyền cần xóa.
   * @returns {Promise<Object>} Kết quả xóa quyền.
   */
  deletePermission: async (id) => {
    try {
      const response = await api.delete(`/api/user-permissions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting permission with ID ${id}:`, error);
      throw error;
    }
  },
};

export default userPermissionApi;
