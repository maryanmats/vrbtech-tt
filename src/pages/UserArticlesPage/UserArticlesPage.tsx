import { Fragment, useEffect, useState } from "react";
import { ArticleCard } from "../../components/ArticleCard";
import { Layout } from "../../components/Layout";
import { Box, CircularProgress, Button, TextField } from "@mui/material";
import styles from "./userArticles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setLoading } from "../../store/newsApiSlice";
import {
  pinArticle,
  removeArticle,
  setArticles,
} from "../../store/userArticlesSlice";
import { mockUserArticles } from "../../mockData/mockUserArticles";
import { ModalWindow } from "../../components/ModalWindow";

export const UserArticlesPage = () => {
  const { userArticles, isLoading } = useSelector(
    (state: RootState) => state.userArticles
  );
  const dispatch = useDispatch();
  const [displayedArticles, setDisplayedArticles] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    dispatch(setArticles(mockUserArticles));
    setLoading(false);
  }, []);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleRemoveArticle = (id: string) => {
    dispatch(removeArticle(id));
  };

  const handlePinArticle = (id: string) => {
    dispatch(pinArticle({ id }));
  };

  const handleLoadMore = () => {
    setDisplayedArticles((prev) => prev + 10);
  };

  const filteredArticles = userArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <ModalWindow />
      </Box>
      <Box className={styles["card-wrapper"]}>
        {filteredArticles
          .slice(0, displayedArticles)
          .map((article: any, index: number) => (
            <Fragment key={index}>
              <ArticleCard
                article={article}
                isUserPage={true}
                onRemove={handleRemoveArticle}
                onPin={handlePinArticle}
              />
            </Fragment>
          ))}
      </Box>

      {displayedArticles < filteredArticles.length && (
        <Button
          onClick={handleLoadMore}
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size="24px" color="inherit" />
          ) : (
            "Load more"
          )}
        </Button>
      )}
    </Layout>
  );
};
