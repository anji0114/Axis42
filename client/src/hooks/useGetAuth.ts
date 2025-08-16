import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";

export type Auth = {
  id: string;
  email: string;
  name: string;
};

export const useGetAuth = () => {
  const [auth, setAuth] = useState<Auth | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await apiClient("/api/auth/me", {
          credentials: "include",
        });

        if (response.status === 401) {
          const refreshResponse = await apiClient("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            setAuth(data as Auth);
            setIsLoading(false);
            return;
          }
        }

        if (!response.ok) {
          setIsLoading(false);
          setError("Failed to fetch auth");
          return;
        }

        const data = await response.json();
        setAuth(data as Auth);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Failed to fetch auth");
      }
    };

    fetchAuth();
  }, []);

  return { auth, isLoading, error };
};
