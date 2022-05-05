import { configureStore } from "@reduxjs/toolkit";

import middleware from "redux/middleware";
import rootReducer from "redux/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});
