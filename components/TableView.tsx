"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface TableViewProps {
  tableName: string;
}

export default function TableView({ tableName }: TableViewProps) {
  const [tableData, setTableData] = useState<{ columns: string[]; rows: Record<string, unknown>[] }>({
    columns: [],
    rows: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTableData = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.get(
        `${API_URL}/api/v1/db/fetch-data/${tableName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response);
      setTableData(response.data);
    } catch (err) {
      setError("Failed to fetch table data. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-sm rounded-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-slate-800">{tableName} Data</h1>
        <div className="flex gap-2">
          
          <button
            onClick={fetchTableData}
            className="px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
          >
            + Add Record
          </button>
          <button
            onClick={fetchTableData}
            className="px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="text-center text-slate-600 py-10">
          <div className="flex items-center justify-center">
            <span className="animate-spin mr-2 text-xl">⏳</span>
            <span>Loading table data...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md font-medium border border-red-200">
          {error}
        </div>
      )}

      {tableData.rows.length === 0 && !isLoading && !error && (
        <div className="bg-slate-50 text-slate-500 text-center py-10 rounded-md border border-slate-200">
          No data available for {tableName}
        </div>
      )}

      {tableData.rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-md overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                {tableData.columns.map((column, key) => (
                  <th
                    key={key}
                    className="px-6 py-3 border-b border-slate-200 text-left text-sm font-semibold text-slate-700"
                  >
                    {column}
                  </th>
                ))}
                <th className="px-6 py-3 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.rows.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50 transition-all duration-200"
                >
                  {tableData.columns.map((column, i) => (
                    <td
                      key={i}
                      className="px-6 py-4 text-sm text-slate-700 border-b border-slate-100"
                    >
                      {row[column] !== undefined ? (
                        String(row[column])
                      ) : (
                        <span className="text-slate-400 italic">NULL</span>
                      )}
                    </td>
                  ))}
                  <td className="flex gap-4 px-6 py-4 text-sm text-slate-700 border-b border-slate-100">
                    <button
                      className="px-3 py-1 text-sm bg-black hover:bg-gray-900 text-white rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-black hover:bg-gray-900 text-white rounded transition-colors"

                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}