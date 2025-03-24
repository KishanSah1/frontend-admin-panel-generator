import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Table, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";

interface AppSidebarProps {
  onTableSelect?: (tableName: string) => void;
}

export function AppSidebar({ onTableSelect }: AppSidebarProps) {
  const [tableNames, setTableNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const fetchTables = async () => {
      const token = localStorage.getItem("token");
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get<string[]>(
          `${API_URL}/api/v1/db/fetch-tables`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTableNames(response.data);
        setIsLoading(false);
        toast.success("Tables Loaded", {
          description: `Loaded ${response.data.length} tables`,
        });
      } catch (error: any) {
        setIsLoading(false);
        toast.error("Failed to Load Tables", {
          description:
            error.response?.data?.message || "Unable to fetch tables",
        });
        console.error("Table fetching error:", error);
      }
    };

    fetchTables();
  }, []);

  const handleTableClick = (tableName: string) => {
    router.push(`/dashboard/${tableName}`);
    if (onTableSelect) onTableSelect(tableName);
  };

  return (
    <Card className="shadow-md max-h-[85h] border-r border-slate-200 bg-white w-64">
      <div className="bg-white">
        {/* <div className="bg-white flex flex-col items-center py-6 border-b border-slate-100 shadow-sm h-[93px]">
          <Image src="/logo.png" alt="Brand Logo" width={180} height={10} />
        </div> */}

        <div>
          <div className="px-4 text-slate-700 font-semibold text-xs uppercase tracking-wider mt-4">
            Database Tables
          </div>

          <div>
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-indigo-600" />
                <span className="text-slate-600 text-sm">Loading Tables...</span>
              </div>
            ) : (
              <div>
                {tableNames.length === 0 ? (
                  <div className="p-4 text-sm text-slate-500">No tables found</div>
                ) : (
                  <div>
                    {tableNames.map((table) => (
                      <div key={table}>
                        <div
                          onClick={() => handleTableClick(table)}
                          className="flex items-center px-4 py-3 text-slate-700 font-medium hover:bg-slate-100 rounded-lg w-full cursor-pointer transition-all duration-200"
                        >
                          <Table className="mr-3 h-5 w-5 text-black" />
                          <span>{table}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AppSidebar;