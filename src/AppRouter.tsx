import { Route, Routes } from "react-router-dom";
import { NewsApiPage } from "./pages/NewsApiPage";
import { UserArticlesPage } from "./pages/UserArticlesPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<UserArticlesPage />} />
    <Route path="/newsapi" element={<NewsApiPage />} />
  </Routes>
);
