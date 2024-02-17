import { createSlice } from "@reduxjs/toolkit";
import { Article } from "../types/types";

export interface UserArticlesState {
  userArticles: Article[];
  isLoading: boolean;
}

const initialState: UserArticlesState = {
  userArticles: [],
  isLoading: false,
};

export const userArticlesSlice = createSlice({
  name: "userArticles",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.userArticles = action.payload;
    },
    addArticle: (state, action) => {
      state.userArticles.push(action.payload);
    },
    removeArticle: (state, action) => {
      state.userArticles = state.userArticles.filter(
        (article) => article.id !== action.payload
      );
    },
    pinArticle: (state, action) => {
      const { id } = action.payload;
      const index = state.userArticles.findIndex(
        (article) => article.id === id
      );
      if (index !== -1) {
        const pinnedArticle = state.userArticles.splice(index, 1)[0];
        state.userArticles.unshift(pinnedArticle);
        state.userArticles.forEach((article) => {
          article.isPinned = article.id === id;
        });
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setArticles,
  removeArticle,
  addArticle,
  pinArticle,
  setLoading,
} = userArticlesSlice.actions;

export default userArticlesSlice.reducer;
