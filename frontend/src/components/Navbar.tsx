"use client";

import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Leaf, LayoutDashboard, LogIn } from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
              <Leaf className="w-5 h-5 text-green-700" />
            </div>
            <span className="font-bold text-xl text-gray-800 tracking-tight">
              GreenLedger
            </span>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com/mirzahussnain/greenledger"
                  target="_blank"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors hidden sm:block"
                >
                  GitHub
                </Link>
                <Link href="/sign-in">
                  <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
