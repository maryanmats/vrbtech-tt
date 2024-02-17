import { configureStore } from "@reduxjs/toolkit";
import newsApiReducer from "./newsApiSlice";
import userArticlesReducer from "./userArticlesSlice";

export const store = configureStore({
  reducer: { newsApi: newsApiReducer, userArticles: userArticlesReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
