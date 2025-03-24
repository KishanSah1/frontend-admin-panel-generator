"use client";

import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import Link from "next/link";


export default function Navbar() {
  const [currentDate, setCurrentDate] = useState("");
  
  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    };
    setCurrentDate(date.toLocaleDateString("en-US", options));
  }, []);

  return (
    <div className="flex items-center justify-between w-full px-8 bg-white py-6 shadow-sm  z-10 min-h-[80px]">
      <div className="flex flex-col">
        <Link href="/dashboard">
          <h1 className="text-xl font-bold text-slate-800 cursor-pointer hover:text-gray-600 transition-colors">
            AdminXpert
          </h1>
        </Link>
        <h6 className="text-xs text-slate-500">{currentDate}</h6>
      </div>

      <div className="flex items-center space-x-5">
        <Link
          href="/about"
          className="text-slate-600 text-sm font-medium hover:text-grey-600 transition-colors"
        >
          About Us
        </Link>

        <Button className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-md shadow-sm hover:shadow-md transition-all">
          Log out
        </Button>
      </div>
    </div>
  );
}