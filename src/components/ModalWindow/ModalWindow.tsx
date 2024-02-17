import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addArticle } from "../../store/userArticlesSlice";
import { RootState } from "../../store/store";
import { articleSchema } from "../../validation/validation";
import { z } from "zod";
import styles from "./modalWindow.module.scss";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  border: "1px solid transparent",
  boxShadow: 24,
  p: 4,
};

export const ModalWindow = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const { userArticles } = useSelector(
    (state: RootState) => state.userArticles
  );

  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleDescription, setNewArticleDescription] = useState("");
  const [newArticleAuthor, setNewArticleAuthor] = useState("");
  const [newArticleImageUrl, setNewArticleImageUrl] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    title: "",
    description: "",
    author: "",
    urlToImage: "",
  });

  const handleNewArticleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewArticleTitle(event.target.value);
  };

  const handleNewArticleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewArticleDescription(event.target.value);
  };

  const handleNewArticleAuthorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewArticleAuthor(event.target.value);
  };

  const handleNewArticleImageUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewArticleImageUrl(event.target.value);
  };

  const handleAddArticle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      articleSchema.parse({
        title: newArticleTitle,
        description: newArticleDescription,
        author: newArticleAuthor,
        urlToImage: newArticleImageUrl,
      });
      const maxId = Math.max(
        ...userArticles.map((article) => parseInt(article.id!))
      );
      const newId = (maxId !== -Infinity ? maxId : 0) + 1;
      const newArticle = {
        id: newId.toString(),
        title: newArticleTitle,
        description: newArticleDescription,
        author: newArticleAuthor,
        urlToImage: newArticleImageUrl,
        isPinned: false,
      };
      dispatch(addArticle(newArticle));
      setNewArticleTitle("");
      setNewArticleDescription("");
      setNewArticleAuthor("");
      setNewArticleImageUrl("");
      setErrors({
        title: "",
        description: "",
        author: "",
        urlToImage: "",
      });
      handleClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        size="large"
        className={styles.button}
      >
        Add new article
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleAddArticle} className={styles.form}>
            <TextField
              label="Title"
              variant="outlined"
              value={newArticleTitle}
              onChange={handleNewArticleTitleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
              sx={{ marginBottom: "8px" }}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={newArticleDescription}
              onChange={handleNewArticleDescriptionChange}
              error={Boolean(errors.description)}
              helperText={errors.description}
              sx={{ marginBottom: "8px" }}
            />
            <TextField
              label="Author"
              variant="outlined"
              value={newArticleAuthor}
              onChange={handleNewArticleAuthorChange}
              error={Boolean(errors.author)}
              helperText={errors.author}
              sx={{ marginBottom: "8px" }}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              value={newArticleImageUrl}
              onChange={handleNewArticleImageUrlChange}
              error={Boolean(errors.urlToImage)}
              helperText={errors.urlToImage}
              sx={{ marginBottom: "8px" }}
            />
            <Button type="submit" variant="contained" className={styles.button}>
              Add Article
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};
