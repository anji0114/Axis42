import React from "react";
import Image from "next/image";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Box, Link } from "@mui/material";

export const Lp = () => {
  return (
    <Box className="flex flex-col items-center justify-center gap-4 h-screen">
      <Image src="/logo/axis42.svg" alt="Axis42" width={120} height={120} />
      <Link href="/login">はじめる</Link>
    </Box>
  );
};
