import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./header.module.scss";
import cn from "classnames";

export const Header = () => {
  return (
    <Box className={styles["header-wrapper"]}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(styles.link, {
            [styles["active-link"]]: isActive,
          })
        }
      >
        User Articles
      </NavLink>
      <NavLink
        to="/newsapi"
        className={({ isActive }) =>
          cn(styles.link, {
            [styles["active-link"]]: isActive,
          })
        }
      >
        News Api
      </NavLink>
    </Box>
  );
};
