import { QUERY_KEY } from "@/constants/queryKey";
import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createProject,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: { name: string; description: string | null }) => {
      console.log("data", data);
      try {
        const response = await apiClient(`/api/projects`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("response", response);
        if (!response.ok) {
          throw new Error("Failed to create project");
        }

        return response.json();
      } catch (error) {
        console.log("error", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROJECTS] });
    },
  });

  return {
    createProject,
    isPending,
    error,
  };
};
