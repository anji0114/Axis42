import { QUERY_KEY } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { FunctionDetail } from "@/features/functions/hooks/useGetFunctionDetail";

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  functions: FunctionDetail[];
};

export const useGetProjects = () => {
  const { data, isLoading, error } = useQuery<Project[]>({
    queryKey: [QUERY_KEY.PROJECTS],
    queryFn: async () => {
      const response = await apiClient("/api/projects");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      return response.json();
    },
  });

  return { data, isLoading, error };
};
