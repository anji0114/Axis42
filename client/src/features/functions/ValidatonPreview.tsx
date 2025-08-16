import { Button } from "@/components/ui/button";
import { Variation } from "./hooks/useGetFunctionDetail";
import { useGetVariationDetail } from "./hooks/useGertVariationDetail";
import { Loading } from "@/components/ui/loading";

type Props = {
  variation: Variation;
  onBack: () => void;
};

export const ValidatonPreview = ({ variation, onBack }: Props) => {
  const { data: validationDetail, isLoading } = useGetVariationDetail(
    variation.id
  );

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
      </div>
    </div>
  );
};
