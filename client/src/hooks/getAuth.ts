import { useEffect, useState } from "react";

type Auth = {
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
        const response = await fetch("http://localhost:3300/api/auth/me", {
          credentials: "include",
        });

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
