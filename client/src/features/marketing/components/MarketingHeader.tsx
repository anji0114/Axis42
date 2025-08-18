import Image from "next/image";
import { Box, Button, Grid, Link, Typography } from "@mui/material";

export const MarketingHeader = () => {
  return (
    <Box className="flex justify-between items-center p-2 border-b border-gray-200 bg-white fixed top-0 left-0 z-10 w-full">
      <Link
        underline="none"
        href="/"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Image src="/logo/axis42.svg" alt="logo" width={40} height={40} />
        <Typography
          component="span"
          fontFamily="var(--font-roboto)"
          fontWeight={500}
        >
          Axis42
        </Typography>
      </Link>
      <Grid container gap={1}>
        <Button href="/demo" variant="outlined">
          デモを見る
        </Button>
        <Button href="/login" variant="contained">
          はじめる
        </Button>
      </Grid>
    </Box>
  );
};
