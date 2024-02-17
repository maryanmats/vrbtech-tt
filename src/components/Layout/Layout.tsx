import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import { Header } from "../Header";
import styles from "./layout.module.scss";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box className={styles.layout}>
      <Header />
      {children}
    </Box>
  );
};
