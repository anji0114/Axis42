import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/dateUtils";
import { useRouter } from "next/navigation";
import { Project } from "../hooks/useGetProjects";

type Props = {
  onDelete: (projectId: string) => void;
  project: Project;
};

export const ProjectCard = ({ project, onDelete }: Props) => {
  const router = useRouter();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{project.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">作成日:</span>
            <span>{formatDate(project.createdAt)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">更新日:</span>
            <span>{formatDate(project.updatedAt)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          className="flex-1"
          variant="outline"
          onClick={() => router.push(`/projects/${project.id}`)}
        >
          プロジェクトを開く
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};
