"use client";

import Link from "next/link";
import { useState } from "react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic
    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return;
    }
    console.log("Signup with:", { email, password });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              Vulcanへようこそ
            </h1>
            <p className="text-stone-600">
              アカウントを作成してプロトタイプ作成を始めましょう
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                placeholder="••••••••"
                required
                minLength={8}
              />
              <p className="mt-1 text-xs text-stone-500">
                8文字以上で入力してください
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-700 mb-1">
                パスワードの確認
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 text-white py-2 px-4 rounded-md hover:bg-stone-800 transition-colors font-medium"
            >
              アカウントを作成
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-600">
            アカウント登録により、
            <Link href="/terms" className="text-stone-900 hover:underline">
              利用規約
            </Link>
            および
            <Link href="/privacy" className="text-stone-900 hover:underline">
              プライバシーポリシー
            </Link>
            に同意したものとみなされます。
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <p className="text-sm text-stone-600">
              すでにアカウントをお持ちの方は
              <Link
                href="/login"
                className="text-stone-900 hover:underline ml-1"
              >
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
