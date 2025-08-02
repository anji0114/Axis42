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
      const response = await fetch("http://localhost:3300/api/auth/me", {
        credentials: "include",
      });

      if (!response.ok) {
        setIsLoading(false);
        setError("Failed to fetch auth");
        return null;
      }

      const data = await response.json();
      setAuth(data as Auth);
      setIsLoading(false);
    };

    fetchAuth();
  }, []);

  return { auth, isLoading, error };
};
