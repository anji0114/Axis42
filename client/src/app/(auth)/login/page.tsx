"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const SignupPage = () => {
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:3300/api/auth/google";
  };

  return (
    <div className="min-h-screen flex">
      {/* 左側のコンテンツ */}
      <div className="flex-1 relative">
        {/* サイトアイコン - ヘッダーとして左上に配置 */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-2">
            <Image src="/logo/vulcan.svg" alt="Vulcan" width={24} height={24} />
            <span className="text-sm font-bold font-roboto">Vulcan</span>
          </div>
        </div>

        {/* 中央のコンテンツ */}
        <div className="flex flex-col justify-center items-center min-h-screen px-8">
          <div className="w-full max-w-md text-center">
            {/* Welcome メッセージ */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-roboto">
                Vulcanへようこそ
              </h1>
              <p className="text-gray-600 text-lg">
                AI駆動型SaaSプロトタイピングプラットフォーム
              </p>
            </div>

            {/* Googleログインボタン */}
            <div className="mb-8">
              <Button
                variant="outline"
                className="w-full h-12 text-sm font-bold "
                onClick={handleGoogleSignup}
              >
                <Image
                  src="/logo/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                />
                Googleでログイン
              </Button>
            </div>

            {/* 利用規約などのリンク */}
            <div className="text-center text-sm text-gray-600 leading-relaxed">
              続行することにより、
              <Link
                href="/terms"
                className="text-gray-900 underline underline-offset-2 hover:text-amber-600 transition-colors"
              >
                利用規約
              </Link>
              および
              <Link
                href="/privacy"
                className="text-gray-900 underline underline-offset-2 hover:text-amber-600 transition-colors"
              >
                プライバシーポリシー
              </Link>
              <br />
              に同意したものとみなされます。
            </div>
          </div>
        </div>
      </div>

      {/* 右側の視覚的要素 */}
      <div className="flex-1 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-8">
        <div className="max-w-lg w-full">
          {/* AI駆動型SaaSプロトタイピングのイラスト */}
          <div className="relative w-full">
            {/* メインの建設/構築イメージ */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              {/* ヘッダー */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              {/* コード生成のイメージ */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-200 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-amber-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div
                      className="h-2 bg-gray-200 rounded animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-300 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-amber-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 2a1 1 0 000 2h8a1 1 0 100-2H5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div
                      className="h-2 bg-gray-200 rounded animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 浮かぶ要素たち */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
