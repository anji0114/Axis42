"use client";

import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login with:", { email, password });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              Vulcanへログイン
            </h1>
            <p className="text-stone-600">
              メールアドレスとパスワードでログインしてください
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
              />
            </div>

            <div className="flex items-center justify-between">
              <Link href="/forgot-password" className="text-sm text-stone-600 hover:text-stone-900">
                パスワードを忘れた方
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 text-white py-2 px-4 rounded-md hover:bg-stone-800 transition-colors font-medium"
            >
              ログイン
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-600">
            ログインすることで、
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
              アカウントをお持ちでない方は
              <Link
                href="/signup"
                className="text-stone-900 hover:underline ml-1"
              >
                アカウントを作成
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
