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
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/dateUtils";
import Link from "next/link";

export const ProjectDetail = () => {
  const router = useRouter();
  const { projectId } = useParams() as { projectId: string };

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => apiClient(`/api/projects/${projectId}`, {}),
  });

  const functions = [
    {
      id: "func1",
      name: "User Authentication",
      description: "Handle user login and registration",
      variations: [
        {
          id: "var1",
          name: "Basic Auth",
          description: "Simple email/password authentication",
          framework: "react",
          isActive: true,
          createdAt: "2024-01-15",
        },
        {
          id: "var2",
          name: "OAuth Integration",
          description: "Google and GitHub OAuth",
          framework: "react",
          isActive: false,
          createdAt: "2024-01-16",
        },
      ],
    },
    {
      id: "func2",
      name: "Dashboard Layout",
      description: "Main dashboard interface",
      variations: [
        {
          id: "var3",
          name: "Default Layout",
          description: "Standard dashboard with sidebar",
          framework: "vanilla",
          isActive: true,
          createdAt: "2024-01-17",
        },
      ],
    },
  ];

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
            <div className="flex gap-2">1
              <Button>New Function</Button>
            </div>
          </div>
        </div>

        {/* Functions List */}
        <div className="space-y-6">
          {functions.map((func) => (
            <Card key={func.id} className="p-6">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{func.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {func.description}
                    </CardDescription>
                  </div>
                  <CardAction>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm">New Variation</Button>
                    </div>
                  </CardAction>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Variations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {func.variations.map((variation) => (
                      <Card
                        key={variation.id}
                        className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-base flex items-center gap-2">
                                {variation.name}
                                {variation.isActive && (
                                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                    Active
                                  </span>
                                )}
                              </CardTitle>
                              <CardDescription className="text-sm mt-1">
                                {variation.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Framework:</span>
                              <span className="font-medium capitalize">
                                {variation.framework}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Created:</span>
                              <span>{variation.createdAt}</span>
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter className="pt-3">
                          <div className="flex gap-2 w-full">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              Edit
                            </Button>
                            <Button size="sm" className="flex-1">
                              Preview
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {functions.length === 0 && (
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
