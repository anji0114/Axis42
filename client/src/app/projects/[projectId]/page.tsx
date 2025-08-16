import { AuthGuard } from "@/components/auth-guard";
import { ProjectDetail } from "@/features/projects/components/ProjectDetail";

const ProjectPage = () => {
  return (
    <AuthGuard>
      <ProjectDetail />
    </AuthGuard>
  );
};

export default ProjectPage;
