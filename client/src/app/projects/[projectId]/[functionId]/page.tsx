"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageLoading } from "@/components/ui/loading";
import { useParams, useRouter } from "next/navigation";
import { formatDate } from "@/lib/dateUtils";

const FunctionDetailPage = () => {
  const router = useRouter();
  const { projectId, functionId } = useParams() as {
    projectId: string;
    functionId: string;
  };

  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prompt: "",
    framework: "vanilla",
    aiModel: "claude-3.5-sonnet",
  });

  // Mock data for UI demonstration
  const functionData = {
    id: functionId,
    name: "User Authentication",
    description: "Handle user login and registration functionality",
    projectId: projectId,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  };

  const variations = [
    {
      id: "var1",
      name: "Basic Auth",
      description: "Simple email/password authentication",
      framework: "react",
      aiModel: "claude-3.5-sonnet",
      isActive: true,
      createdAt: "2024-01-15T10:30:00Z",
      prompt:
        "Create a basic authentication form with email and password fields...",
    },
    {
      id: "var2",
      name: "OAuth Integration",
      description: "Google and GitHub OAuth authentication",
      framework: "react",
      aiModel: "gpt-4",
      isActive: false,
      createdAt: "2024-01-16T09:15:00Z",
      prompt:
        "Implement OAuth authentication with Google and GitHub providers...",
    },
  ];

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
    <AuthGuard>
      <div className="min-h-screen flex flex-col p-5">
        <div className="max-w-6xl mx-auto w-full">
          {/* Function Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/projects/${projectId}`)}
                  className="mb-2"
                >
                  ← Back to Project
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">
                  {functionData.name}
                </h1>
                <p className="text-gray-600 mt-2">{functionData.description}</p>
                <div className="flex gap-4 mt-4 text-sm text-gray-500">
                  <span>Created: {formatDate(functionData.createdAt)}</span>
                  <span>Updated: {formatDate(functionData.updatedAt)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Edit Function</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Generate New Variation Form */}
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
                      <option value="claude-3.5-sonnet">
                        Claude 3.5 Sonnet
                      </option>
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

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating..." : "Generate Variation"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Variations */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Existing Variations ({variations.length})
                </h2>
              </div>

              {variations.map((variation) => (
                <Card
                  key={variation.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {variation.name}
                          {variation.isActive && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                              Active
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {variation.description}
                        </CardDescription>
                      </div>
                      <CardAction>
                        <Button variant="outline" size="sm">
                          ...
                        </Button>
                      </CardAction>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Framework:</span>
                          <span className="font-medium capitalize">
                            {variation.framework}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">AI Model:</span>
                          <span className="font-medium">
                            {variation.aiModel}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-gray-500">Created:</span>
                        <span className="ml-2">
                          {formatDate(variation.createdAt)}
                        </span>
                      </div>

                      <div className="pt-2">
                        <details className="group">
                          <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800">
                            View Prompt
                          </summary>
                          <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                            {variation.prompt}
                          </div>
                        </details>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1">
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Clone
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}

              {variations.length === 0 && (
                <div className="text-center py-8">
                  <div className="max-w-sm mx-auto">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No variations yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Generate your first variation using the form on the left
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default FunctionDetailPage;
