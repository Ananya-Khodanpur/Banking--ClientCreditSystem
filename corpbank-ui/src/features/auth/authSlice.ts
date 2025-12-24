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

export const fetchMe = createAsyncThunk(
  "auth/me",
  async () => {
    const res = await api.get("/api/users/me");
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
      state.user = action.payload.user;
    })
    .addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
