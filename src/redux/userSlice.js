import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import securityApi from "../api/securityApi";
import userApi from "../api/userApi";
// Thunk để làm mới Access Token
export const refreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (_, { getState }) => {
    const { refreshToken } = getState().user;
    const data = await securityApi.refreshToken(refreshToken);
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  }
);
// Thunk để lấy thông tin người dùng hiện tại
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().user;
      const user = await userApi.getCurrentUser(accessToken); // Gửi token để lấy thông tin
      console.log("Fetched current user:", user);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);
// Thunk để đăng ký tài khoản
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.createUser(data);
      console.log("API Response:", response); // Debug dữ liệu
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to register user");
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        console.log("Access token refreshed:", action.payload);
        state.accessToken = action.payload;
        localStorage.setItem("accessToken", action.payload);
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        console.log("Fetch current user fulfilled:", action.payload);
        state.user = action.payload; // Gán toàn bộ đối tượng làm user
        state.accessToken = localStorage.getItem("accessToken");
        localStorage.setItem("user", action.payload);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // const { accessToken, refreshToken, user } = action.payload;

        // Lưu Access Token, Refresh Token và User vào Redux và LocalStorage
        state.accessToken = action.payload;
        state.refreshToken = action.payload;
        state.user = action.payload;

        localStorage.setItem("accessToken", state.accessToken);
        localStorage.setItem("refreshToken", state.refreshToken);
        localStorage.setItem("user", state.user);
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
