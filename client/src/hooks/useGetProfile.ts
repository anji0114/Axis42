import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string | null;
  email: string;
  profileImageUrl: string | null;
  lastLoginAt: Date | null;
  isActive: boolean;
};

export const useGetProfile = () => {
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["profile"],
    queryFn: () =>
      apiClient("/api/users/me", {
        method: "GET",
      }).then((res) => res.json()) as Promise<User>,
  });

  return { profile: data, isLoading, error };
};
