import { useGetProfile } from "@/hooks/useGetProfile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { apiClient } from "@/lib/apiClient";

export const DashboardHeader = () => {
  const { profile } = useGetProfile();

  const handleLogout = async () => {
    try {
      const response = await apiClient("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const json = await response.json();
      console.log("aaaa");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="px-10 py-3 flex items-center justify-between">
        <Link href="/projects" className="flex items-center gap-2">
          <Image src="/logo/vulcan.svg" alt="logo" width={28} height={28} />
          <span className="text-lg font-bold pt-px inline-block font-roboto">
            Vulcan
          </span>
        </Link>

        {profile && (
          <Popover>
            <PopoverTrigger className="flex items-center cursor-pointer">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {profile.profileImageUrl ? (
                  <Image
                    src={profile.profileImageUrl}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-600">
                    {profile.name?.charAt(0) || profile.email.charAt(0)}
                  </span>
                )}
              </div>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-64">
              <div className="space-y-3">
                <div className="border-b border-gray-100 pb-3">
                  <p className="font-medium text-sm">
                    {profile.name || "名無し"}
                  </p>
                  <p className="text-xs text-gray-500">{profile.email}</p>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                  >
                    ログアウト
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
};
