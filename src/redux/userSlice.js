import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import securityApi from "../api/securityApi";

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
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload;
    });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
