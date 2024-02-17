import { setArticles, setMoreArticles } from "../store/newsApiSlice";
import { AppDispatch } from "../store/store";

const PAGE_SIZE = 10;
const BASE_URL = "https://newsapi.org/v2/everything";
const API_KEY = "7253f56022e74c4abede2b04e0979343";

export const fetchNewsApi = async (
  dispatch: AppDispatch,
  pageNumber: number
) => {
  try {
    const url = `${BASE_URL}?q=bitcoin&pageSize=${PAGE_SIZE}&page=${pageNumber}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    if (pageNumber === 1) {
      dispatch(setArticles(data.articles));
    } else {
      dispatch(setMoreArticles(data.articles));
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
