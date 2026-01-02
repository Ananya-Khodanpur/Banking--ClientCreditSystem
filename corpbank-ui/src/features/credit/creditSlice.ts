import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchCreditRequests = createAsyncThunk(
  "credit/fetch",
  async () => {
    const res = await api.get("/api/credit-requests");
    return res.data;
  }
);

export const createCreditRequest = createAsyncThunk(
  "credit/create",
  async (data: any) => {
    const res = await api.post("/api/credit-requests", data);
    return res.data;
  }
);

export const updateCreditRequest = createAsyncThunk(
  "credit/update",
  async ({ id, status }: { id: string; status: string }) => {
    const res = await api.put(`/api/credit-requests/${id}`, { status });
    return res.data;
  }
);

const creditSlice = createSlice({
  name: "credit",
  initialState: {
    list: [] as any[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreditRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreditRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

export default creditSlice.reducer;
