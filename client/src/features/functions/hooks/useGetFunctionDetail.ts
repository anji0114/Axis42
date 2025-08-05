import { QUERY_KEY } from "@/constants/queryKey";
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export type Variation = {
  aiModel: string;
  createdAt: string;
  description: string;
  framework: string;
  functionId: string;
  id: string;
  isActive: boolean;
  name: string;
  prompt: string;
  updatedAt: string;
};

type FunctionDetail = {
  createdAt: string;
  description: string;
  id: string;
  name: string;
  projectId: string;
  updatedAt: string;
  variations: Variation[];
};

export const useGetFunctionDetail = (functionId: string) => {
  const { data, isLoading, error } = useQuery<FunctionDetail>({
    queryKey: [QUERY_KEY.FUNCTION_DETAIL, functionId],
    queryFn: async () => {
      const response = await apiClient(`/api/functions/${functionId}`, {
        method: "GET",
      });
      return response.json();
    },
    enabled: !!functionId,
  });

  return { data, isLoading, error };
};
