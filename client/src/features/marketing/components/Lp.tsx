import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";

export const Lp = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-amber-50/30 to-amber-100/40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div>
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent py-1">
              Vulcan Engine
            </h1>
          </div>

          {/* Main headline */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            AI駆動型
            <br />
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
              SaaSプロトタイピング
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            アイデアを数ヶ月ではなく数分で機能的なSaaSプロトタイプに変換。
            <br />
            AIが面倒な作業を担当し、あなたはイノベーションに集中できます。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/login"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className:
                  "bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-6 text-lg rounded-full",
              })}
            >
              今すぐ始める
            </Link>
            <Link
              href="/demo"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "border-2 border-amber-400 text-amber-600 px-8 py-6 text-lg rounded-full bg-white",
              })}
            >
              デモを見る
            </Link>
          </div>

          {/* Stats or social proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500 mb-2">10倍</div>
              <div className="text-gray-600">高速開発</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500 mb-2">90%</div>
              <div className="text-gray-600">コスト削減</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500 mb-2">24/7</div>
              <div className="text-gray-600">AIアシスタント</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
