"use client";

import { useState } from "react";
import { Button, Input } from "./ui";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    if (!formData.password) {
      newErrors.password = "パスワードを入力してください";
    } else if (formData.password.length < 6) {
      newErrors.password = "パスワードは6文字以上で入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          ログイン
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="メールアドレス"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
            placeholder="your@email.com"
            fullWidth
            disabled={isLoading}
          />

          <Input
            type="password"
            label="パスワード"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={errors.password}
            placeholder="パスワードを入力"
            fullWidth
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
            className="mt-6"
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            アカウントをお持ちでない方は{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-800 underline">
              新規登録
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}