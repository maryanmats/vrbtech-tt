import { createSlice } from "@reduxjs/toolkit";
import { Article } from "../types/types";

export interface NewsApiState {
  news: Article[];
  isLoading: boolean;
}

const initialState: NewsApiState = {
  news: [],
  isLoading: false,
};

export const newsApiSlice = createSlice({
  name: "newsApi",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.news = action.payload;
    },
    setMoreArticles: (state, action) => {
      state.news = [...state.news, ...action.payload];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setArticles, setMoreArticles, setLoading } =
  newsApiSlice.actions;

export default newsApiSlice.reducer;
