import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const MarketingHeader = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b bg-white fixed top-0 z-10 w-full">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo/vulcan.svg" alt="logo" width={28} height={28} />
        <span className="text-lg font-bold pt-px inline-block font-roboto">
          Vulcan Engine
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <Link href="/demo" className={buttonVariants({ variant: "outline" })}>
          デモを見る
        </Link>
        <Link href="/login" className={buttonVariants({ variant: "default" })}>
          はじめる
        </Link>
      </div>
    </header>
  );
};
