"use client";

import { useGetAuth } from "@/hooks/getAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading";
import { DashboardHeader } from "./dashboard-header";

type AuthGuardProps = {
  children: React.ReactNode;
  hideHeader?: boolean;
};

export const AuthGuard = ({ children, hideHeader = false }: AuthGuardProps) => {
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
    <div>
      {!hideHeader && <DashboardHeader />}
      <div>{children}</div>
    </div>
  );
};
