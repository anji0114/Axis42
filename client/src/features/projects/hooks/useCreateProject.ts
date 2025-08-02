import { apiURL } from "@/constants/url";
import { useMutation } from "@tanstack/react-query";

export const useCreateProject = () => {
  const {
    mutate: createProject,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: { name: string; description: string | null }) => {
      const response = await fetch(`${apiURL}/api/projects`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      return response.json();
    },
  });

  return {
    createProject,
    isPending,
    error,
  };
};
