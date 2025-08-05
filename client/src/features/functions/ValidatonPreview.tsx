import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Variation } from "./hooks/useGetFunctionDetail";
import { formatDate } from "@/lib/dateUtils";

type Props = {
  variation: Variation;
  onBack: () => void;
};

export const ValidatonPreview = ({ variation, onBack }: Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline">
          ← View List
        </Button>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            variation.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {variation.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {variation.name}
          </h1>
          <p className="text-gray-600 text-lg">{variation.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  AI Model
                </label>
                <p className="text-gray-900">{variation.aiModel}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Framework
                </label>
                <p className="text-gray-900">{variation.framework}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Status
                </label>
                <p className="text-gray-900">
                  {variation.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Created At
                </label>
                <p className="text-gray-900">
                  {formatDate(variation.createdAt)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Updated At
                </label>
                <p className="text-gray-900">
                  {formatDate(variation.updatedAt)}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {variation.prompt}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
