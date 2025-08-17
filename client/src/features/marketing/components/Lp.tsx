import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

export const Lp = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-amber-50/30 to-amber-100/40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center w-full">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/logo/vulcan.svg"
            alt="PDM Vertical AI Agent"
            width={32}
            height={32}
          />
        </div>

        {/* Main headline */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold leading-tight font-roboto">
            Vulcan Engine
          </h2>
          <p className="text-sm text-gray-500">
            プロダクトを成功に導くPDM Vertical AI Agent
          </p>
        </div>

        <div className="w-full mt-4">
          <Textarea className="bg-white w-full min-h-32" rows={4} readOnly />
        </div>
      </div>
    </section>
  );
};
