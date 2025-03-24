import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";


import {
  Database,
  ListOrdered,
  LayoutDashboard,
  PencilRuler,
  ArrowRight,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 bg-white">
      <div className="text-center mb-8 mt-5">
        <h1 className="text-4xl font-bold text-primary mb-3 tracking-tight">
          Admin Panel Generator
        </h1>
        <p className="text-md text-gray-600 max-w-2xl mx-auto">
          Transform your database into a powerful, intuitive admin dashboard in
          minutes, not months. No complex coding required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
        {/* Connect DB Card */}
        <Card className="hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center mb-1">
              <Database className="w-8 h-8 text-blue-500 mr-3" />
              <CardTitle className="text-lg">Connect Your Database</CardTitle>
            </div>
            <CardDescription className="text-sm">
              Securely link your data source with end-to-end encryption and zero
              configuration.
              <p className="text-sm text-gray-500 pt-2">
                Supports MySQL, PostgreSQL, MongoDB, and other database
                types.
              </p>
              <div className="pt-4">
                <Link href="/dbconnect" className="w-full">
                  <Button className="w-full group">
                    Connect Database
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Get Useful Usecases Card */}
        <Card className="hover:shadow-xl transition-all duration-300 border-t-4 border-purple-500 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center mb-1">
              <ListOrdered className="w-8 h-8 text-purple-500 mr-3" />
              <CardTitle className="text-lg">Discover Use Cases</CardTitle>
            </div> 
            <CardDescription className="text-sm">
              Instantly generate tailored functionality based on your database
              structure.
              <p className="text-sm text-gray-500 pt-2">
                Our AI analyzes your schema to suggest the most valuable
                operations for your business.
              </p>
              <div className="pt-4">
                <Link href="/usecase" className="w-full">
                  <Button className="w-full group">
                    Explore Use Cases
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Build Your Dashboard Card */}
        <Card className="hover:shadow-xl transition-all duration-300 border-t-4 border-green-500 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center mb-1">
              <LayoutDashboard className="w-8 h-8 text-green-500 mr-3" />
              <CardTitle className="text-lg">
                Craft Dashboards
              </CardTitle>
            </div>
            <CardDescription className="text-sm">
              Intuitive interface to build professional analytics displays
              in minutes.
              <p className="text-sm text-gray-500 pt-2">
                Tools to represent
                your data perfectly.
              </p>
              <div className="pt-4">
                <Link href="/main" className="w-full">
                  <Button className="w-full group">
                    Create Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Perform CRUD on DB Card */}
        <Card className="hover:shadow-xl transition-all duration-300 border-t-4 border-amber-500 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center mb-1">
              <PencilRuler className="w-8 h-8 text-amber-500 mr-3" />
              <CardTitle className="text-lg">Manage Your Data</CardTitle>
            </div>
            <CardDescription className="text-sm">
              Intuitive interface for creating, reading, updating, and deleting
              records seamlessly.
              <p className="text-sm text-gray-500 pt-2">
                Built-in validation, data auditing, and change history tracking
                at every step.
              </p>
              <div className="pt-4">
                <Link href="/dashboard" className="w-full">
                  <Button className="w-full group">
                    Access Data Tools
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <p className="text-center text-gray-500 mt-12 max-w-xl">
        Join developers who build better admin experiences in a fraction
        of the time.
      </p>
    </div>
  );
};

export default HomePage;
