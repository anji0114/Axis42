"use client";

import { useGetAuth } from "@/hooks/getAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "./ui/loading";
import { Header } from "./Header";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { auth, isLoading, error } = useGetAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth && !isLoading && error) {
      router.push("/login");
    }
  }, [auth, error, router]);

  if (isLoading || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};
