"use client";

import { Bill, getBills } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { FileText, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const BillList = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const { getToken, isLoaded, userId } = useAuth();
  const [bills, setBills] = useState<Bill[]>([]);

  // Fetch bills whenever "refreshTrigger" changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Wait until Clerk is actually ready
        if (!isLoaded || !userId) return;
        const token = await getToken();
        if (!token) return;
        const data = await getBills(token);
        setBills(data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchData();
  }, [refreshTrigger, getToken, isLoaded, userId]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-4 px-2">
        Recent Uploads
      </h3>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {bills.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No bills uploaded yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {bills.map((bill) => (
              <div
                key={bill.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                {/* Left Side: Icon & Name */}
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {bill.file_name}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(bill.upload_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Right Side: Usage */}
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {bill.extracted_kwh.toFixed(2)} kWh
                  </p>
                  <p className="text-xs text-gray-500">
                    {/* Simple Carbon Math: 0.193 kg CO2 per kWh (UK Grid Average) */}
                    ≈ {(bill.extracted_kwh * 0.193).toFixed(1)} kg CO2e
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BillList;
