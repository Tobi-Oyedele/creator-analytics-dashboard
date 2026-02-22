import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-abyss">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pt-18 lg:pt-0">{children}</main>
    </div>
  );
}
