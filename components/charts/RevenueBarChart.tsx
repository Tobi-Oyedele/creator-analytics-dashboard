"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueData {
  type: string;
  revenue: number;
}

export default function RevenueBarChart() {
  const [data, setData] = useState<RevenueData[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/revenue")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="bg-abyss rounded-xl p-5">
      <h2 className="text-white font-semibold mb-4">Revenue</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" />
            <XAxis dataKey="type" stroke="#6b7280" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
            <Tooltip cursor={false} />
            <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
