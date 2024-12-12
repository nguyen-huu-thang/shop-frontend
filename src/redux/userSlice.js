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
  async (_, { rejectWithValue }) => {
    try {
      const user = await userApi.getCurrentUser();
      return user;
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
      return response; // Trả về thông tin người dùng mới tạo
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
    isLoggedIn: false, 
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user; // Lưu thông tin người dùng
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload; // Lưu thông tin người dùng mới
      });
  },
});

export const { setUser, logout, login } = userSlice.actions;
export default userSlice.reducer;
