import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { QUERY_KEY } from "@/constants/queryKey";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      await apiClient(`/api/projects/${projectId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROJECTS] });
    },
  });
};
