"use client";

import React from "react";
import UseCaseContainer from "../../../components/UseCaseContainer";
import RightContainer from "../../../components/RightContainer";
import { useDbContext } from "../../../context/DbContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const MainContainer: React.FC = () => {

  const { dbConnected } = useDbContext();


  return (
    <div className="flex h-[84vh] p-2 gap-2.5">
      {dbConnected ? (
        <>
          <div className="w-1/3 flex flex-col gap-3">
            <UseCaseContainer
            />
            {/* <Chatbot /> */}
          </div>
          <div className="w-2/3">
            <RightContainer />
          </div>
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
              <p className="mb-5">
                Connect your database to unlock AI-generated use cases tailored
                to your schema.
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
    </div>
  );
};

export default MainContainer;
