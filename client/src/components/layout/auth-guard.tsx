"use client";

import { useGetAuth } from "@/hooks/getAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

type AuthGuardProps = {
  children: React.ReactNode;
  hideHeader?: boolean;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { auth, isLoading, error } = useGetAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth && !isLoading && error) {
      router.push("/login");
    }
  }, [auth, error, router]);

  if (isLoading || error) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box component="main">{children}</Box>
    </Box>
  );
};
