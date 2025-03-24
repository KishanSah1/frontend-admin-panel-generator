"use client"

import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full">

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white border-r shadow-md">
          <AppSidebar />
        </div>

        <main className="flex-1 max-h-[85vh] overflow-auto p-4 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
