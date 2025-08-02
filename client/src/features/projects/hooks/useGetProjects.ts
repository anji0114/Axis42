import { apiURL } from "@/constants/url";
import { useQuery } from "@tanstack/react-query";

type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const useGetProjects = () => {
  const { data, isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch(`${apiURL}/api/projects`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      return response.json();
    },
  });

  return { data, isLoading, error };
};
