"use client";

import { Box, Button, Grid } from "@mui/material";

export const BackToTopButton = () => {
  return (
    <Grid container justifyContent="center">
      <Button href="/" variant="outlined">
        トップページに戻る
      </Button>
    </Grid>
  );
};
