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
import { ProjectCreateDialog } from "@/features/projects/ProjectCreateDialog";
import { useCreateProject } from "@/features/projects/hooks/useCreateProject";
import { useGetProjects } from "@/features/projects/hooks/useGetProjects";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/dateUtils";

const ProjectsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { createProject } = useCreateProject();
  const { data: projects } = useGetProjects();
  const router = useRouter();

  const handleCreateProject = (data: {
    name: string;
    description: string | null;
  }) => {
    createProject(data);
  };

  return (
    <AuthGuard>
      <div className="flex flex-col p-5">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                <p className="text-gray-600 mt-2">Manage your project list</p>
              </div>
              <Button onClick={() => setIsDialogOpen(true)}>New Project</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects &&
              projects.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Created:</span>
                        <span>{formatDate(project.createdAt)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Updated:</span>
                        <span>{formatDate(project.updatedAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      Open Project
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>

          {projects && projects.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No projects yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first project to get started
                </p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Create Project
                </Button>
              </div>
            </div>
          )}
        </div>

        <ProjectCreateDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleCreateProject}
        />
      </div>
    </AuthGuard>
  );
};

export default ProjectsPage;
