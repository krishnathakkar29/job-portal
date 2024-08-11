import { configureStore } from "@reduxjs/toolkit";
import authSllice from "./authSllice";
import jobSlice from "./jobSlice";
import api from "./api";

export const store = configureStore({
  reducer: {
    auth: authSllice,
    job: jobSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid() , api.middleware ]
});
