import { AuthGuard } from "@/components/AuthGuard";
import { Projects } from "@/features/projects/components/Projects";

const ProjectsPage = () => {
  return (
    <AuthGuard>
      <Projects />
    </AuthGuard>
  );
};

export default ProjectsPage;
