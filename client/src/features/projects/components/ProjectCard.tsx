import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/dateUtils";
import { useRouter } from "next/navigation";
import { Project } from "../hooks/useGetProjects";
import Link from "next/link";

type Props = {
  onDelete: (projectId: string) => void;
  project: Project;
};

export const ProjectCard = ({ project, onDelete }: Props) => {
  const router = useRouter();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
          </CardTitle>
          <Button
            variant="outline"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
        <CardDescription className="text-sm text-gray-600">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-1">
          {project.functions.map((functionItem) => (
            <li className="text-sm" key={functionItem.id}>
              {functionItem.name}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
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
    </Card>
  );
};
