"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, PlusCircle, Check, Loader2 } from "lucide-react";
import { useOperationContext } from "@/context/OperationContext";
import { useDbContext } from "@/context/DbContext";
import { toast } from "sonner";
import Link from "next/link";

interface ApiOperation {
  use_case_id: string;
  use_case: string;
  query: string;
  user_input_columns: string[];
}

const CrudOperationsPage: React.FC = () => {
  const router = useRouter();
  const { dbConnected } = useDbContext();
  const {
    selectedOperations,
    setSelectedOperations,
    finalSelectedUsecase,
    setFinalSelectedUsecase,
  } = useOperationContext();

  const [operations, setOperations] = useState<Record<string, ApiOperation[]>>({
    Create: [],
    Read: [],
    Update: [],
    Delete: [],
  });
  const [userOperations, setUserOperations] = useState<ApiOperation[]>([]);
  const [newUserOperation, setNewUserOperation] = useState("");
  const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const fetchUseCases = async () => {
    if (!dbConnected) return;

    setLoading(true);
    setOperations({ Create: [], Read: [], Update: [], Delete: [] }); // Clear previous data
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/use_cases"
      );
      const { use_cases_result } = response.data;

      setOperations({
        Create: use_cases_result?.create || [],
        Read: use_cases_result?.read || [],
        Update: use_cases_result?.update || [],
        Delete: use_cases_result?.delete || [],
      });
    } catch (error) {
      console.error("Failed to fetch use cases:", error);
      toast.error("Failed to load use cases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUseCases();
  }, [dbConnected]);

  const toggleSelection = (id: string) => {
    setSelectedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddSelected = () => {
    const allOperations = [
      ...operations.Create,
      ...operations.Read,
      ...operations.Update,
      ...operations.Delete,
      ...userOperations,
    ];

    const selected = allOperations.filter((op) => selectedMap[op.use_case_id]);
    const newSelections = selected.filter(
      (newOp) =>
        !selectedOperations.some(
          (existingOp) => existingOp.use_case_id === newOp.use_case_id
        )
    );

    setSelectedOperations([...selectedOperations, ...newSelections]);
    setFinalSelectedUsecase([...finalSelectedUsecase, ...newSelections]);
    setSelectedMap({});
  };

  return (
    <div className="container mx-auto p-4 max-h-screen">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Panel */}
        <Card className="flex-1 p-3 space-y-6 min-h-[80vh]">
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-xl font-semibold">AI Generated Use Cases</h1>
            <Button onClick={fetchUseCases} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-2">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
              <p className="text-sm text-gray-500">
                Thinking of the best use cases for you...
              </p>
            </div>
          ) : dbConnected ? (
            <>
              {Object.entries(operations).map(([category, ops]) => (
                <section key={category}>
                  <h2 className="text-lg font-medium mb-2">
                    {category} Operations
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {ops.map((op) => (
                      <Card
                        key={op.use_case_id}
                        className={`p-2 transition-all cursor-pointer hover:bg-[#f1f5f9] ${
                          selectedMap[op.use_case_id]
                            ? "border-primary bg-accent/30"
                            : ""
                        }`}
                        onClick={() => toggleSelection(op.use_case_id)}
                      >
                        <CardContent className="flex items-center gap-2 p-2">
                          <Checkbox
                            checked={selectedMap[op.use_case_id] || false}
                            onCheckedChange={(checked: boolean) => {
                              setSelectedMap((prev) => ({
                                ...prev,
                                [op.use_case_id]: checked,
                              }));
                            }}
                          />
                          <span className="text-sm">{op.use_case}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}
            </>
          ) : (
            <div className="w-full flex items-center justify-center">
              <Card className="text-center text-black my-8 p-8 border-2 border-dashed rounded-lg bg-white">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-300"
                    >
                      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    Database Connection Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Connect your database to unlock AI-generated use cases
                    tailored to your schema.
                  </p>
                  <Link href="/dbconnect" className="w-full">
                    <Button
                      variant="outline"
                      className="bg-[#f1f5f9] cursor-pointer text-black mt-2"
                    >
                      Connect Database
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </Card>

        {/* Right Panel */}
        <div className="w-full md:w-1/3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selected Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full cursor-pointer"
                onClick={handleAddSelected}
              >
                <Check className="mr-2 h-4 w-4" />
                Add Selected Use Cases
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CrudOperationsPage;
