import { MarketingHeader } from "@/features/marketing/components/MarketingHeader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MarketingHeader />
      {children}
    </div>
  );
}
