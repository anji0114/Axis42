import { useState } from "react";
import { Input } from "@/components/ui/input";
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
import { useCreateVariation } from "./hooks/useCreateVariation";
import { useParams } from "next/navigation";

export const GenerateForm = () => {
  const { functionId } = useParams<{ functionId: string }>();
  const { createVariation, isPending } = useCreateVariation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prompt: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateVariation = async (e: React.FormEvent) => {
    if (!functionId) return;
    e.preventDefault();

    createVariation({
      isActive: true,
      framework: "vanilla",
      aiModel: "claude-sonnet-4-20250514",
      functionId: functionId,
      ...formData,
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>新しいバリエーションを生成</CardTitle>
        <CardDescription>
          AIを使用してこの関数の新しいバリエーションを生成します
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGenerateVariation} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">バリエーション名</Label>
            <Input
              id="name"
              name="name"
              placeholder="例: Googleでの認証"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <Input
              id="description"
              name="description"
              placeholder="このバリエーションの簡潔な説明"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">生成プロンプト</Label>
            <Textarea
              id="prompt"
              name="prompt"
              placeholder="生成したい内容を記述してください。機能、スタイル、動作について具体的に..."
              value={formData.prompt}
              onChange={handleInputChange}
              rows={6}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "生成中..." : "バリエーションを生成"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
