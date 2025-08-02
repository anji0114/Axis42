import { AuthGuard } from "@/components/AuthGuard";
import { GenelateForm } from "@/features/dashbaord/GenelateForm";

const DashboardPage = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col p-5 bg-amber-50/50">
        <GenelateForm />
      </div>
    </AuthGuard>
  );
};

export default DashboardPage;
