"use client";

import { usePathname } from "next/navigation";
import {
  Home,
  BarChart,
  Users,
  Settings,
  Database,
  LayoutDashboard,
  UserRoundPen,
  House,
  ListOrdered,
  ListCollapse,
  List,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Cable } from 'lucide-react';
import { GalleryHorizontalEnd } from 'lucide-react';

export default function MainSidebar() {
  const pathname = usePathname();

  return (
    <div className="pl-4 w-18 min-h-screen bg-gray-100 text-black flex flex-col justify-between items-center p-1 pt-7 pb-7">
      {/* <div className="flex items-center justify-center mb-6">
        <Image src="/logo.svg" alt="" width={40} height={40} />
      </div> */}

      <div className="w-12 h-12 mb-3 bg-black text-white flex items-center justify-center text-lg font-bold rounded-md">
        <span className="text-2xl pb-1">A</span>
      </div>

      <nav className="flex flex-col justify-center space-y-4 mb-51">
        <ul className="flex flex-col gap-1.5">
          <Link href="/home">
            <li
              className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors
              ${pathname === "/home" ? "bg-black text-white" : "hover:bg-black"}
            `}
            >
              <House
                className={`${
                  pathname === "/home"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </li>
          </Link>
          <Link href="/dbconnect">
            <li
              className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${
                pathname === "/dbconnect"
                  ? "bg-black text-white"
                  : "hover:bg-black"
              }
            `}
            >
              <Cable
                className={`${
                  pathname === "/dbconnect"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </li>
          </Link>
          <Link href="/usecase">
            <li
              className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${
                pathname === "/usecase"
                  ? "bg-black text-white"
                  : "hover:bg-black"
              }
            `}
            >
              <GalleryHorizontalEnd
                className={`${
                  pathname === "/usecase"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </li>
          </Link>
          <Link href="/main">
            <li
              className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${pathname === "/main" ? "bg-black text-white" : "hover:bg-black"}
            `}
            >
              <LayoutDashboard
                className={`${
                  pathname === "/main"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </li>
          </Link>
          <Link href="/dashboard">
          <li
            className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${
                pathname === "/dashboard"
                  ? "bg-black text-white"
                  : "hover:bg-black"
              }
            `}
          >
            
              <Database
                className={`${
                  pathname === "/dashboard"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            
          </li>
          </Link>
        </ul>
      </nav>

      <div className="flex flex-col justify-center space-y-4">
        <ul>
          <li
            className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${
                pathname === "/settings"
                  ? "bg-black text-white"
                  : "hover:bg-black"
              }
            `}
          >
            <Link href="/settings">
              <Settings
                strokeWidth={3}
                className={`${
                  pathname === "/settings"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </Link>
          </li>
          <li
            className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${
                pathname === "/profile"
                  ? "bg-black text-white"
                  : "hover:bg-black"
              }
            `}
          >
            <Link href="/profile">
              <UserRoundPen
                strokeWidth={3}
                className={`${
                  pathname === "/profile"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
