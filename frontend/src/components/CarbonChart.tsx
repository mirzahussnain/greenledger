"use client";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { getBills, Bill } from "../lib/api";
import { useAuth } from "@clerk/nextjs";

const CarbonChart = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const { getToken } = useAuth();
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const bills = await getBills(token);

        // Transform data for the chart
        // 1. Sort by date (oldest to newest)
        // 3. Format date to be short (e.g., "Jan 10")
        const formattedData = bills
          .sort(
            (a, b) =>
              new Date(a.upload_date).getTime() -
              new Date(b.upload_date).getTime(),
          )
          .map((bill) => ({
            date: new Date(bill.upload_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            }),
            kwh: bill.extracted_kwh,
            carbon: (bill.extracted_kwh * 0.193).toFixed(1),
          }));
        setData(formattedData);
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, [refreshTrigger]);

  if (data.length === 0) return <div>No data available</div>;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Carbon Footprint Trend
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="kwh"
              stroke="#16a34a"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorKwh)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CarbonChart;
