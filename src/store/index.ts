import { configureStore } from "@reduxjs/toolkit";
import detailReducer from "../features/detail/detailSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    detail: detailReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
