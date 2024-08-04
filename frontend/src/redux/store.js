import { configureStore } from "@reduxjs/toolkit";
import authSllice from "./authSllice";

export const store = configureStore({
  reducer: {
    auth: authSllice,
  },
});
