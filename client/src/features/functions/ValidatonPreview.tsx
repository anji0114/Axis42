import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Variation } from "./hooks/useGetFunctionDetail";
import { formatDate } from "@/lib/dateUtils";
import { useGetVariationDetail } from "./hooks/useGertVariationDetail";
import { Loading } from "@/components/ui/loading";

type Props = {
  variation: Variation;
  onBack: () => void;
};

export const ValidatonPreview = ({ variation, onBack }: Props) => {
  const {
    data: validationDetail,
    isLoading,
    error,
  } = useGetVariationDetail(variation.id);

  console.log(validationDetail);

  if (isLoading || !validationDetail) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline">
          ← リストを表示
        </Button>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            variation.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {variation.isActive ? "アクティブ" : "非アクティブ"}
        </span>
      </div>

      {validationDetail.files.map((file) => (
        <div key={file.id}>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {file.fileName}
          </h2>
          <iframe
            className="bg-gray-50 p-4 rounded-lg border border-gray-200 w-full h-screen"
            srcDoc={file.content}
            sandbox="allow-scripts allow-same-origin"
            title={file.fileName}
          />
        </div>
      ))}

      <div className="space-y-8">
        <div className="text-center py-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {variation.name}
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            {variation.description}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                設定
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    AIモデル
                  </label>
                  <div className="bg-blue-50 px-4 py-3 rounded-lg">
                    <p className="text-gray-900 font-medium">
                      {variation.aiModel}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    フレームワーク
                  </label>
                  <div className="bg-purple-50 px-4 py-3 rounded-lg">
                    <p className="text-gray-900 font-medium">
                      {variation.framework}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    ステータス
                  </label>
                  <div
                    className={`px-4 py-3 rounded-lg ${
                      variation.isActive ? "bg-green-50" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          variation.isActive ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></div>
                      <p className="text-gray-900 font-medium">
                        {variation.isActive ? "アクティブ" : "非アクティブ"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    最終更新
                  </label>
                  <div className="bg-orange-50 px-4 py-3 rounded-lg">
                    <p className="text-gray-900 font-medium">
                      {formatDate(variation.updatedAt)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      作成日: {formatDate(variation.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                プロンプト
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gray-900 p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-100 font-mono leading-relaxed">
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
