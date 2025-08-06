import { apiURL } from "@/constants/url";
import { QUERY_KEY } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const useGetProjects = () => {
  const { data, isLoading, error } = useQuery<Project[]>({
    queryKey: [QUERY_KEY.PROJECTS],
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
