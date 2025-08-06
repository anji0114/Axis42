import { AuthGuard } from "@/components/AuthGuard";
import { ProjectDetail } from "@/features/projects/components/ProjectDetail";

const ProjectPage = () => {
  return (
    <AuthGuard>
      <ProjectDetail />
    </AuthGuard>
  );
};

export default ProjectPage;
