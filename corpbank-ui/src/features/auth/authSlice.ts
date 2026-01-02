// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const login = createAsyncThunk(
  "auth/login",
  async (data: { username: string; password: string }) => {
    const res = await api.post("/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  }
);



interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
}


const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
extraReducers: (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      // Normalize role by removing ROLE_ prefix
      const user = action.payload.user;
      if (user.role && user.role.startsWith('ROLE_')) {
        user.role = user.role.replace('ROLE_', '');
      }
      state.user = user;
    });
},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
