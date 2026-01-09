"use client";
import CarbonChart from "@/components/CarbonChart";
import BillList from "@/components/RecentBills";
import UploadCard from "@/components/UploadCard";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Home() {
  // This state is just a counter. When it increases, the list refreshes.
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    // Increment the key to trigger a reload of the list
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <>
      {/* Shows Profile Pic if logged in, nothing if logged out */}
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>

      {/* State 1: Logged Out (Landing Page) */}
      <SignedOut>
        <div className="text-center mt-20 space-y-6">
          {/*<h2 className="text-4xl font-bold text-gray-800">
            Automate your Net Zero Reporting
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stop manually typing data from utility bills. Use our AI to extract
            carbon data instantly.
          </p>*/}
          <div className="pt-6">
            <SignInButton mode="modal">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                Get Started (Sign In)
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      {/* State 2: Logged In (The Dashboard) */}
      <SignedIn>
        <div className="w-full max-w-4xl flex flex-col items-center gap-8">
          <div className="w-full max-w-md">
            <UploadCard onSuccess={handleUploadSuccess} />
          </div>

          <CarbonChart refreshTrigger={refreshKey} />

          <BillList refreshTrigger={refreshKey} />
        </div>
      </SignedIn>
    </>
  );
}
