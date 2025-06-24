import { ButtonDemo } from "@/components/ui/ButtonDemo";

export default function ButtonDemoPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        ボタンコンポーネント（Button）のデモ
      </h1>
      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md">
        <ButtonDemo />
      </div>
    </div>
  );
}
