"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCreateDialog } from "@/features/projects/components/ProjectCreateDialog";
import { useGetProjects } from "@/features/projects/hooks/useGetProjects";
import { ProjectCard } from "./ProjectCard";
import { useDeleteProject } from "../hooks/useDeleteProject";

export const Projects = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: projects } = useGetProjects();
  const { mutate: deleteProject } = useDeleteProject();

  const handleDeleteProject = (projectId: string) => {
    if (confirm("本当に削除しますか？")) {
      deleteProject(projectId, {});
    }
  };

  return (
    <div className="flex flex-col p-5">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                プロジェクト一覧
              </h1>
              <p className="text-gray-600 mt-2">プロジェクトを管理します</p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>新規作成</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects &&
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDeleteProject}
              />
            ))}
        </div>
      </div>

      <ProjectCreateDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};
