"use client";

import { useState } from "react";
import { Button, Input } from "./ui";

interface RegistrationFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationFormProps {
  onSubmit?: (data: Omit<RegistrationFormData, 'confirmPassword'>) => void;
  isLoading?: boolean;
}

export default function RegistrationForm({ onSubmit, isLoading = false }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({});

  const validateUsername = (username: string): string | undefined => {
    if (!username) {
      return "ユーザーネームを入力してください";
    }
    if (username.length < 4) {
      return "ユーザーネームは4文字以上で入力してください";
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return "ユーザーネームは半角英数字、アンダースコア（_）、ハイフン（-）のみ使用できます";
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationFormData> = {};

    // ユーザーネーム validation
    const usernameError = validateUsername(formData.username);
    if (usernameError) {
      newErrors.username = usernameError;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "パスワードを入力してください";
    } else if (formData.password.length < 6) {
      newErrors.password = "パスワードは6文字以上で入力してください";
    }

    // Password confirmation validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "パスワード（確認）を入力してください";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const { confirmPassword, ...submitData } = formData;
      onSubmit?.(submitData);
    }
  };

  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          新規登録
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="ユーザーネーム"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            error={errors.username}
            placeholder="半角英数字、_、-のみ（4文字以上）"
            fullWidth
            disabled={isLoading}
          />

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
            placeholder="パスワードを入力（6文字以上）"
            fullWidth
            disabled={isLoading}
          />

          <Input
            type="password"
            label="パスワード（確認）"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
            placeholder="パスワードを再入力"
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
            {isLoading ? "登録中..." : "新規登録"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            すでにアカウントをお持ちの方は{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-800 underline">
              ログイン
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}