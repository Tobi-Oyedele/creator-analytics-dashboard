"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ViewsData {
  date: string;
  views: number;
}

export default function ViewsLineChart() {
  const [data, setData] = useState<ViewsData[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/chart-data")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="bg-abyss rounded-xl p-5">
      <h2 className="text-white font-semibold mb-4">Views Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" />
          <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 11 }} />
          <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
