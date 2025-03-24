"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { useDbContext } from "@/context/DbContext"; 

const DatabaseConnectionForm = () => {
  const [connectionString, setConnectionString] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { successMessage, setSuccessMessage, setDbConnected } = useDbContext();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!connectionString || !username || !password) {
      toast("Fill all the required fields");
      return;
    }
    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.post(
        `${API_URL}/api/v1/db/connect`,
        {
          connectionUrl: connectionString,
          username,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === "success") {
        toast.success("Database Connected Successfully");

        setSuccessMessage(`Successfully connected to ${connectionString}. `);
        setDbConnected(true);
      } else {
        toast.error("Connection Failed");
        setSuccessMessage("");
      }
    } catch (error: any) {
      toast.error("Connection Failed", {
        description:
          error.response?.data?.message || "Unable to connect to the database",
      });
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white p-4 space-y-4">
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-3 rounded-lg w-[400px] text-center shadow-md">
          {successMessage}
        </div>
      )}

      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <h2 className="text-2xl">Database Connection</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="connection-string" className="mb-2 block">
                Connection String
              </Label>
              <Input
                id="connection-string"
                placeholder="Enter database connection string"
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="username" className="mb-2 block">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="password" className="mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect to Database"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseConnectionForm;
