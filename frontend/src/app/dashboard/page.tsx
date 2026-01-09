"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import UploadCard from "../../components/UploadCard";
import BillList from "../../components/RecentBills";
import CarbonChart from "../../components/CarbonChart";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstName} 👋
          </h1>
          <p className="text-gray-500">
            Here is your carbon footprint overview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Actions */}
          <div className="lg:col-span-1 space-y-8">
            <UploadCard onSuccess={handleUploadSuccess} />
          </div>

          {/* Right Column: Data */}
          <div className="lg:col-span-2 space-y-8">
            <CarbonChart refreshTrigger={refreshKey} />
            <BillList refreshTrigger={refreshKey} />
          </div>
        </div>
      </main>
    </div>
  );
}
