import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import clientReducer from "../features/clients/clientSlice";
import creditReducer from "../features/credit/creditSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    credit: creditReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
