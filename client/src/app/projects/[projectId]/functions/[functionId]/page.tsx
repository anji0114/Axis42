"use client";

import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/ui/loading";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useParams, useRouter } from "next/navigation";
import { formatDate } from "@/lib/dateUtils";
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { GenerateForm } from "@/features/functions/GenerateForm";
import { FunctionVariations } from "@/features/functions/FunctionVariations";
import { QUERY_KEY } from "@/constants/queryKey";
import { useGetFunctionDetail } from "@/features/functions/hooks/useGetFunctionDetail";

const FunctionDetailPage = () => {
  const router = useRouter();
  const { projectId, functionId } = useParams() as {
    projectId: string;
    functionId: string;
  };

  const { data: functionData } = useGetFunctionDetail(functionId);

  if (!functionData) {
    return <PageLoading />;
  }

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
                  ← プロジェクトに戻る
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">
                  {functionData.name}
                </h1>
                <p className="text-gray-600 mt-2">{functionData.description}</p>
                <div className="flex gap-4 mt-4 text-sm text-gray-500">
                  <span>作成日: {formatDate(functionData.createdAt)}</span>
                  <span>更新日: {formatDate(functionData.updatedAt)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">関数を編集</Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate">生成</TabsTrigger>
              <TabsTrigger value="list">バリエーション</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="mt-6">
              <GenerateForm />
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <FunctionVariations variations={functionData.variations} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  );
};

export default FunctionDetailPage;
