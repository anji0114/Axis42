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

export const GenerateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prompt: "",
    framework: "vanilla",
    aiModel: "claude-3.5-sonnet",
  });

  const [isGenerating, setIsGenerating] = useState(false);

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
    e.preventDefault();
    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      alert("Variation generation would be implemented here!");
      setFormData({
        name: "",
        description: "",
        prompt: "",
        framework: "vanilla",
        aiModel: "claude-3.5-sonnet",
      });
    }, 2000);
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
            <Label htmlFor="framework">Framework</Label>
            <select
              id="framework"
              name="framework"
              value={formData.framework}
              onChange={handleInputChange}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            >
              <option value="vanilla">Vanilla JavaScript</option>
              <option value="react">React</option>
              <option value="vue">Vue.js</option>
              <option value="angular">Angular</option>
              <option value="svelte">Svelte</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aiModel">AI Model</Label>
            <select
              id="aiModel"
              name="aiModel"
              value={formData.aiModel}
              onChange={handleInputChange}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            >
              <option value="claude-3.5-sonnet">Claude 3.5 Sonnet</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
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

          <Button type="submit" className="w-full" disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate Variation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
