"use client";

import { AuthGuard } from "@/components/layout/auth-guard";
import { PageLoading } from "@/components/ui/loading";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/dateUtils";
import { GenerateForm } from "@/features/functions/GenerateForm";
import { useGetComponentDetail } from "@/features/functions/hooks/useGetFunctionDetail";

const ComponentDetailPage = () => {
  const { componentId } = useParams() as {
    projectId: string;
    componentId: string;
  };

  const { data: componentData } = useGetComponentDetail(componentId);

  if (!componentData) {
    return <PageLoading />;
  }

  return (
    <AuthGuard hideHeader>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="border-b bg-white px-10 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {componentData.name}
              </h1>
              <p className="text-gray-600 text-sm">
                {componentData.description}
              </p>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span>作成日: {formatDate(componentData.createdAt)}</span>
                <span>更新日: {formatDate(componentData.updatedAt)}</span>
                <span>フレームワーク: {componentData.framework}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Chat/Messages */}
          <div className="w-1/2 border-r bg-gray-50 flex flex-col">
            <div className="py-4 px-10 border-b bg-white">
              <h2 className="text-lg font-semibold text-gray-900">
                コンポーネント編集
              </h2>
              <p className="text-sm text-gray-600">
                AIに指示してコンポーネントを修正できます
              </p>
            </div>
            <div className="flex-1 overflow-auto px-10 py-4">
              <GenerateForm componentId={componentId} />
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="w-1/2 flex flex-col">
            <div className="px-10 py-4 border-b bg-white">
              <h2 className="text-lg font-semibold text-gray-900">
                プレビュー
              </h2>
              <p className="text-sm text-gray-600">
                リアルタイムでコンポーネントの表示を確認
              </p>
            </div>
            <div className="flex-1 px-10 py-4">
              <div className="h-full border rounded-lg bg-white">
                <iframe
                  srcDoc={
                    componentData.content ||
                    '<html><head><title>Empty Component</title></head><body><p style="text-align: center; padding: 20px;">コンポーネントのコンテンツがありません</p></body></html>'
                  }
                  className="w-full h-full border-0 rounded-lg"
                  title="Component Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default ComponentDetailPage;
