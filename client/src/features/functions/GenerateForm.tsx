import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";

interface GenerateFormProps {
  componentId: string;
}

export const GenerateForm = ({ componentId }: GenerateFormProps) => {
  const queryClient = useQueryClient();
  const [prompt, setPrompt] = useState("");

  const { mutate: updateComponent, isPending } = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await apiClient(`/api/components/${componentId}`, {
        method: "PATCH",
        body: JSON.stringify({ prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COMPONENT_DETAIL, componentId],
      });
      setPrompt("");
    },
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    updateComponent(prompt);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>コンポーネントを編集</CardTitle>
        <CardDescription>
          AIを使用してコンポーネントを修正・改善します
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">修正指示</Label>
            <Textarea
              id="prompt"
              name="prompt"
              placeholder="どのような変更を行いたいかを記述してください。スタイル、機能、レイアウトなど..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="min-h-48"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "更新中..." : "コンポーネントを更新"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
