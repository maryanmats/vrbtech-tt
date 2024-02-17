import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Article } from "../../types/types";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DeleteIcon from "@mui/icons-material/Delete";
import FiberPinIcon from "@mui/icons-material/FiberPin";
import { Box } from "@mui/material";
import styles from "./articleCard.module.scss";

type Props = {
  article: Article;
  isUserPage: boolean;
  onRemove?: (id: string) => void;
  onPin?: (id: string) => void;
};

export const ArticleCard: React.FC<Props> = ({
  article,
  isUserPage,
  onRemove = () => {},
  onPin = () => {},
}) => {
  return (
    <Card sx={{ maxWidth: 345, height: "fit-content" }}>
      <CardMedia
        component="img"
        height="180"
        image={article.urlToImage}
        alt={article.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>

        <Box color="text.secondary" className={styles["block-bottom"]}>
          {isUserPage && (
            <Box className={styles["block-actions"]}>
              <DeleteIcon
                onClick={() => onRemove(article.id!)}
                className={styles["action-btn"]}
              />
              {article.isPinned ? (
                <FiberPinIcon sx={{ color: "gold" }} />
              ) : (
                <FiberPinIcon
                  onClick={() => onPin(article.id!)}
                  className={styles["action-btn"]}
                />
              )}
            </Box>
          )}

          <Box className={styles["block-author"]}>
            <PermIdentityIcon />
            <Typography variant="body2">{article.author}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
