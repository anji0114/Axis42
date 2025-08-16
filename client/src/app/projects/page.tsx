import { AuthGuard } from "@/components/layout/auth-guard";
import { Projects } from "@/features/projects/components/Projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "プロジェクト一覧",
};

const ProjectsPage = () => {
  return (
    <AuthGuard>
      <Projects />
    </AuthGuard>
  );
};

export default ProjectsPage;
