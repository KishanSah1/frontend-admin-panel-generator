"use client";

import MainSidebar from "../../components/MainSidebar";
import { Card } from "../../components/ui/card";
import MainNavbar from "../../components/MainNavbar";
import ProtectedRoute from "../../components/ProtectedRoute";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
    
    <div className="bg-[#f1f5f9] shadow-md h-[100vh] flex flex-row">
      <MainSidebar />

      <div className="flex-1 p-3 bg-[#f1f5f9]">
        <Card className="pt-0.5 h-[96vh] max-h-[110vh]">
          <MainNavbar />
          <main className="max-h-[88vh] overflow-auto -mt-6">{children}</main>
        </Card>
      </div>
      
    </div>
    </ProtectedRoute>
  );
}
