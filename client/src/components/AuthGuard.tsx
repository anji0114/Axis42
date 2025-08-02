"use client";

import { useGetAuth } from "@/hooks/getAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return children;
};
