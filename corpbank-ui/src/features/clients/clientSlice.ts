import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchClients = createAsyncThunk(
  "clients/fetch",
  async () => {
    const res = await api.get("/api/clients");
    return res.data;
  }
);


export const createClient = createAsyncThunk(
  "clients/create",
  async (data: any) => (await api.post("/api/rm/clients", data)).data
);

const clientSlice = createSlice({
  name: "clients",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchClients.fulfilled, (s, a) => { s.list = a.payload });
  }
});

export default clientSlice.reducer;
