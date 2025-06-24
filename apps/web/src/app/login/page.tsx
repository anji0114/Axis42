"use client";

import { useState } from "react";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    
    try {
      console.log("ログイン試行:", data);
      // TODO: 実際の認証処理を実装
      await new Promise(resolve => setTimeout(resolve, 1500)); // デモ用の遅延
      
      // 成功時の処理
      alert("ログインに成功しました！");
    } catch (error) {
      console.error("ログインエラー:", error);
      alert("ログインに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </div>
  );
}