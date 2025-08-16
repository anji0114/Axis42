import { QUERY_KEY } from "@/constants/queryKey";
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export type ComponentDetail = {
  createdAt: string;
  description: string;
  id: string;
  name: string;
  projectId: string;
  updatedAt: string;
  content: string;
  framework: string;
};

export const useGetComponentDetail = (componentId: string) => {
  const { data, isLoading, error } = useQuery<ComponentDetail>({
    queryKey: [QUERY_KEY.COMPONENT_DETAIL, componentId],
    queryFn: async () => {
      const response = await apiClient(`/api/components/${componentId}`, {
        method: "GET",
      });
      return response.json();
    },
    enabled: !!componentId,
  });

  return { data, isLoading, error };
};
