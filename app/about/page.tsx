import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">About Our Platform</h1>
        <p className="text-lg text-gray-600 text-center mt-4">
          Our automated admin panel generation platform simplifies database management by allowing users 
          to connect their databases and generate a fully functional admin panel dynamically.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>User Authentication & Onboarding</CardTitle>
            </CardHeader>
            <CardContent>
              Secure signup, login, and session management using JWT and email/password authentication.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Connectivity</CardTitle>
            </CardHeader>
            <CardContent>
              Supports SQL (MySQL, PostgreSQL, SQL Server) and NoSQL (MongoDB) with automated schema analysis.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schema Analysis & Use Case Generation</CardTitle>
            </CardHeader>
            <CardContent>
              AI-driven analysis to detect database structure, relationships, and common admin operations.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approval & Customization</CardTitle>
            </CardHeader>
            <CardContent>
              Users can review, modify, and approve suggested use cases for admin panel functionalities.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Panel UI</CardTitle>
            </CardHeader>
            <CardContent>
              Automatically generated UI for CRUD operations, ensuring a user-friendly and adaptable experience.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security & Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              Role-based access control (RBAC) to ensure different user levels and secure data handling.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
