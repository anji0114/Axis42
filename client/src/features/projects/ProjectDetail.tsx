"use client";

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
import { PageLoading } from "@/components/ui/loading";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/dateUtils";
import Link from "next/link";
import { FunctionCreateDialog } from "@/features/functions/FunctionCreateDialog";
import { useState } from "react";

export const ProjectDetail = () => {
  const router = useRouter();
  const { projectId } = useParams() as { projectId: string };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate: createFunction } = useMutation({
    mutationFn: async (data: {
      name: string;
      description: string | undefined;
    }) => {
      const response = await apiClient(`/api/functions`, {
        method: "POST",
        body: JSON.stringify({ ...data, projectId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data: { id: string }) => {
      setIsDialogOpen(false);
      router.push(`/projects/${projectId}/functions/${data.id}`);
    },
  });

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => apiClient(`/api/projects/${projectId}`, {}),
  });

  if (isLoading || !project) {
    return <PageLoading message="Loading project details..." />;
  }

  return (
    <div className="min-h-screen flex flex-col p-5">
      <div className="max-w-6xl mx-auto w-full">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" size="sm" className="mb-2" asChild>
                <Link href="/projects">← Back to Projects</Link>
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">
                {project.name}
              </h1>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="flex gap-4 mt-4 text-sm text-gray-500">
                <span>Created: {formatDate(project.createdAt)}</span>
                <span>Updated: {formatDate(project.updatedAt)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsDialogOpen(true)}>
                New Function
              </Button>
            </div>
          </div>
        </div>
        <FunctionCreateDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={(data) => createFunction(data)}
        />

        {/* Functions List */}
        <div className="space-y-6">
          {project.functions.map((func: any) => (
            <Card key={func.id} className="p-6">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{func.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {func.description}
                    </CardDescription>
                  </div>
                  <CardAction>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/projects/${projectId}/${func.id}`)
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </CardAction>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {project.functions.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No functions yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first function to get started with this project
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Create Function
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
