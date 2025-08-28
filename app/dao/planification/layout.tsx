import { MainLayout } from "@/components/ui/MainLayout";

export default function DaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
