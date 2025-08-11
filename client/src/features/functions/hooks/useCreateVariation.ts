import { apiClient } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

interface Variation {
  name: string;
  functionId: string;
  description: string;
  prompt: string;
  framework: string;
  aiModel: string;
  isActive: boolean;
}

export const useCreateVariation = () => {
  const { mutate: createVariation, isPending } = useMutation({
    mutationFn: async (data: Variation) => {
      const response = await apiClient(`/api/variations`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    onError: (error) => {
      alert("エラーが発生しました");
    },
  });

  return { createVariation, isPending };
};
