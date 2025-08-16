"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProject } from "../hooks/useCreateProject";
import { createProjectFormSchema } from "../constants/createProjectForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

interface ProjectCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectCreateDialog = ({
  open,
  onOpenChange,
}: ProjectCreateDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createProject } = useCreateProject();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<z.infer<typeof createProjectFormSchema>>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createProjectFormSchema>) => {
    if (!data.name.trim()) return;
    setIsSubmitting(true);

    createProject(
      { name: data.name.trim(), description: data.description!.trim() },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
        onError: (error) => {
          console.error("Failed to create project:", error);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>新しいプロジェクトを作成</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              プロジェクト名 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="プロジェクト名を入力"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              {...register("description")}
              placeholder="プロジェクトの説明を入力（任意）"
              className="min-h-28 max-h-48"
              disabled={isSubmitting}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "作成中..." : "プロジェクト作成"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
