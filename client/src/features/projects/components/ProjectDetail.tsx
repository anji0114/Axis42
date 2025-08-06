"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardAction,
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
      return response.json();
    },
    onSuccess: (data: { id: string }) => {
      setIsDialogOpen(false);
      router.push(`/projects/${projectId}/functions/${data.id}`);
    },
  });

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const response = await apiClient(`/api/projects/${projectId}`, {});
      return response.json();
    },
  });

  if (isLoading || !project) {
    return <PageLoading message="プロジェクト詳細を読み込み中..." />;
  }

  return (
    <div className="min-h-screen flex flex-col p-5">
      <div className="max-w-6xl mx-auto w-full">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" size="sm" className="mb-2" asChild>
                <Link href="/projects">← プロジェクト一覧に戻る</Link>
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">
                {project.name}
              </h1>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="flex gap-4 mt-4 text-sm text-gray-500">
                <span>作成日: {formatDate(project.createdAt)}</span>
                <span>更新日: {formatDate(project.updatedAt)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsDialogOpen(true)}>新しい関数</Button>
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
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/projects/${projectId}/functions/${func.id}`}
                        >
                          詳細を見る
                        </Link>
                      </Button>
                    </div>
                  </CardAction>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
