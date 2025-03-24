"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = () => {
  return (
    <div className="flex max-h-[85vh] bg-white overflow-auto">
      <div className="flex flex-col flex-1 overflow-auto">
        <div className="flex-1 border ">
          <Card className="shadow-lg border border-gray-200 bg-white w-{500}">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg">
                Welcome to your dashboard. Manage your data efficiently!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
