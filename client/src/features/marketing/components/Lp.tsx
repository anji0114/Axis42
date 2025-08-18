import React from "react";
import { Box, Button } from "@mui/material";

export const Lp = () => {
  return (
    <Box className="flex flex-col items-center justify-center gap-4 h-screen">
      <Button href="/login" size="large">
        はじめる
      </Button>
    </Box>
  );
};
