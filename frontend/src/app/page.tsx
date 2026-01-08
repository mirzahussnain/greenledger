"use client";
import BillList from "@/components/RecentBills";
import UploadCard from "@/components/UploadCard";
import { useState } from "react";

export default function Home() {
  // This state is just a counter. When it increases, the list refreshes.
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    // Increment the key to trigger a reload of the list
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      {/*Title Section */}
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
          GreenLedger 🌿
        </h1>
        <p className="text-lg to-gray-600 max-w-lg mx-auto">
          AI-powered Carbon Tracking for UK Enterprises Upload your utility bill
          to calculate footprint instantly.
        </p>
      </div>
      {/* Upload Section */}
      <div className="w-full max-w-md mb-8">
        {/* We pass the "onSuccess" function down to the card */}
        <UploadCard onSuccess={handleUploadSuccess} />
      </div>

      {/* Data Section */}
      <BillList refreshTrigger={refreshKey} />
    </main>
  );
}
