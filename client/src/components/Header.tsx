import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto py-3 flex items-center justify-between">
        <Link href="/projects" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={28} height={28} />
          <span className="text-lg font-bold pt-px inline-block">Vulcan</span>
        </Link>
      </div>
    </header>
  );
};
