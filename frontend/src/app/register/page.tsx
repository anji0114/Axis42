"use client";

import { useState } from "react";
import RegistrationForm from "../../components/RegistrationForm";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: { username: string; email: string; password: string }) => {
    setIsLoading(true);
    
    try {
      console.log("新規登録試行:", data);
      // TODO: 実際の登録処理を実装
      await new Promise(resolve => setTimeout(resolve, 1500)); // デモ用の遅延
      
      // 成功時の処理
      alert("新規登録に成功しました！");
    } catch (error) {
      console.error("登録エラー:", error);
      alert("新規登録に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <RegistrationForm onSubmit={handleRegister} isLoading={isLoading} />
    </div>
  );
}