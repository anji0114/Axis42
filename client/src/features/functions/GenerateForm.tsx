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
  const { createVariation } = useCreateVariation();
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
      aiModel: "claude-3.7-sonnet",
      functionId: functionId,
      ...formData,
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Generate New Variation</CardTitle>
        <CardDescription>
          Use AI to generate a new variation of this function
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGenerateVariation} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Variation Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., OAuth with Google"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Brief description of this variation"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Generation Prompt</Label>
            <Textarea
              id="prompt"
              name="prompt"
              placeholder="Describe what you want to generate. Be specific about features, styling, and behavior..."
              value={formData.prompt}
              onChange={handleInputChange}
              rows={6}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Generate Variation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
