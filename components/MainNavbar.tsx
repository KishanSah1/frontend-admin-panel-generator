import React from 'react'
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../context/AuthProvider';

const MainNavbar = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-between items-center p-3 border-b-3 border-gray-200 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex justify-center items-center">
        <div className="ml-6 hidden md:block">
          <h2 className="text-lg text-gray-700 dark:text-gray-300">
            Welcome back, <span className="font-medium">{user?.sub} </span>
          </h2>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mr-4">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <Link href="/login">
          {user ? (
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Logout
            </button>
          ) : (
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Login
            </button>
          )}
        </Link>
      </div>
    </div>
  );
}

export default MainNavbar