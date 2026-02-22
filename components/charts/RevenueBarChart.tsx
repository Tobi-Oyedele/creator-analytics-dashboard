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
  LineChart,
  Line,
} from "recharts";
import { DollarSign, TrendingUp, Award, LayoutGrid } from "lucide-react";

interface RevenueData {
  type: string;
  revenue: number;
}

interface TrendData {
  month: string;
  revenue: number;
}

interface Transaction {
  id: string;
  source: string;
  amount: number;
  date: string;
  status: "Paid" | "Pending";
}

interface Summary {
  totalRevenue: number;
  avgMonthly: number;
  bestMonth: number;
  sourcesCount: number;
}

export default function RevenuePage() {
  const [breakdown, setBreakdown] = useState<RevenueData[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [trend, setTrend] = useState<TrendData[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/revenue")
      .then((res) => res.json())
      .then((json) => {
        setBreakdown(json.breakdown);
        setSummary(json.summary);
        setTrend(json.trend);
        setTransactions(json.transactions);
      });
  }, []);

  const cards = summary
    ? [
        {
          label: "Total Revenue",
          value: `$${summary.totalRevenue.toLocaleString()}`,
          icon: DollarSign,
          color: "border-green-500",
          iconColor: "text-green-400",
        },
        {
          label: "Avg Monthly",
          value: `$${summary.avgMonthly.toLocaleString()}`,
          icon: TrendingUp,
          color: "border-blue-500",
          iconColor: "text-blue-400",
        },
        {
          label: "Best Month",
          value: `$${summary.bestMonth.toLocaleString()}`,
          icon: Award,
          color: "border-purple-500",
          iconColor: "text-purple-400",
        },
        {
          label: "Revenue Sources",
          value: summary.sourcesCount.toString(),
          icon: LayoutGrid,
          color: "border-orange-500",
          iconColor: "text-orange-400",
        },
      ]
    : [];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-white text-2xl font-bold">Revenue</h1>
        <p className="text-gray-400 text-sm mt-1">
          Track your earnings across all revenue streams
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`bg-midnight rounded-xl p-5 border-b-2 ${card.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-400 text-sm">{card.label}</p>
                <div className="bg-white/5 p-2 rounded-lg">
                  <Icon size={16} className={card.iconColor} />
                </div>
              </div>
              <p className="text-white text-2xl font-bold">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Trend */}
        <div className="bg-midnight rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0d1829",
                  border: "1px solid #1e2a4a",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ fill: "#6366f1", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-midnight rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Revenue Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={breakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" />
              <XAxis dataKey="type" stroke="#6b7280" tick={{ fontSize: 11 }} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0d1829",
                  border: "1px solid #1e2a4a",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                cursor={false}
              />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-midnight rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left px-4 py-3 font-medium">Source</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-right px-4 py-3 font-medium">Amount</th>
                <th className="text-right px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    index % 2 === 0 ? "bg-transparent" : "bg-white/2"
                  }`}
                >
                  <td className="px-4 py-3 text-white font-medium">
                    {transaction.source}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {transaction.date}
                  </td>
                  <td className="px-4 py-3 text-right text-white font-medium">
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        transaction.status === "Paid"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
