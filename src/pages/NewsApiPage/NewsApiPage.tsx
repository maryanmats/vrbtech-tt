import { Fragment, useEffect, useState } from "react";
import { ArticleCard } from "../../components/ArticleCard";
import { Layout } from "../../components/Layout";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import styles from "./newsApiPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchNewsApi } from "../../services/newsApi.api";
import { setLoading } from "../../store/newsApiSlice";

export const NewsApiPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { news, isLoading } = useSelector((state: RootState) => state.newsApi);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchNews = async () => {
      await fetchNewsApi(dispatch, pageNumber);
      dispatch(setLoading(false));
    };

    fetchNews();
  }, [pageNumber]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const filteredNews = news.filter(
    (article) =>
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      !searchQuery ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLoadMore = () => {
    if (!isLoading) {
      const nextPageNumber = pageNumber + 1;
      setPageNumber(nextPageNumber);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </Box>
      <Box className={styles["card-wrapper"]}>
        {filteredNews.length > 0 &&
          filteredNews.map((article) => (
            <Fragment key={article.title}>
              <ArticleCard article={article} isUserPage={false} />
            </Fragment>
          ))}
      </Box>
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
    </Layout>
  );
};
