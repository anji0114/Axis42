import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const GenelateForm = () => {
  return (
    <div className="">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold">AI Genelater</h2>
        <div className="mt-4">
          <Textarea className="bg-white min-h-64" />
        </div>
        <div className="text-right mt-4">
          <Button variant="default" className="w-full">
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};
