import { QUERY_KEY } from "@/constants/queryKey";
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Variation } from "./useGetFunctionDetail";

type VariationFile = {
  content: string;
  createdAt: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  id: string;
  mimeType: string;
  s3Key: string | null;
  storageType: string;
  updatedAt: string;
  variationId: string;
};

type VariationDetail = Variation & {
  files: VariationFile[];
};

export const useGetVariationDetail = (validationId: string) => {
  const { data, isLoading, error } = useQuery<VariationDetail>({
    queryKey: [QUERY_KEY.VARIATION_DETAIL, validationId],
    queryFn: async () => {
      const response = await apiClient(`/api/variations/${validationId}`, {
        method: "GET",
      });
      return response.json();
    },
  });

  return { data, isLoading, error };
};
