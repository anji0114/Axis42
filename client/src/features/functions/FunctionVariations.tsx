import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { formatDate } from "@/lib/dateUtils";
import { useState } from "react";
import { ValidatonPreview } from "./ValidatonPreview";

export const FunctionVariations = () => {
  const [previewId, setPreviewId] = useState<string | null>(null);

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
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Existing Variations ({variations.length})
        </h2>
      </div>

      {previewId ? (
        <ValidatonPreview />
      ) : (
        variations.map((variation) => (
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
                    <span className="font-medium">{variation.aiModel}</span>
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
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => setPreviewId(variation.id)}
                >
                  Preview
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};
