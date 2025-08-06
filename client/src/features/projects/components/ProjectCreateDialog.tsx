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

interface ProjectCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectCreateDialog = ({
  open,
  onOpenChange,
}: ProjectCreateDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createProject } = useCreateProject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    setIsSubmitting(true);

    createProject(
      { name: name.trim(), description: description.trim() },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
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
    setName("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>新しいプロジェクトを作成</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              プロジェクト名 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="プロジェクト名を入力"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            <Button type="submit" disabled={!name.trim() || isSubmitting}>
              {isSubmitting ? "作成中..." : "プロジェクト作成"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
