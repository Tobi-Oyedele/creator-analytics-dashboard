"use client";
import ViewsLineChart from "@/components/charts/ViewsLineChart";
import { useState, useEffect } from "react";
import { Eye, Users, DollarSign, Activity, LucideIcon } from "lucide-react";

interface CardData {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: string;
  icon: LucideIcon;
}

export default function DashboardPage() {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/overview")
      .then((res) => res.json())
      .then((json) => {
        const formattedCards: CardData[] = [
          {
            label: "Total Views",
            value: json.totalViews.toLocaleString(),
            trend: "+12%",
            trendUp: true,
            color: "border-blue-500",
            icon: Eye,
          },
          {
            label: "Subscribers",
            value: json.subscribers.toLocaleString(),
            trend: "+8%",
            trendUp: true,
            color: "border-purple-500",
            icon: Users,
          },
          {
            label: "Revenue",
            value: `$${json.revenue.toLocaleString()}`,
            trend: "+23%",
            trendUp: true,
            color: "border-green-500",
            icon: DollarSign,
          },
          {
            label: "Engagement Rate",
            value: `${json.engagementRate}%`,
            trend: "-2%",
            trendUp: false,
            color: "border-orange-500",
            icon: Activity,
          },
        ];

        setCards(formattedCards);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`bg-midnight rounded-xl p-5 border-b-2 cursor-pointer ${card.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-400 text-sm">{card.label}</p>
                <div className="bg-white/5 p-2 rounded-lg">
                  <Icon size={16} className="text-gray-400" />
                </div>
              </div>
              <p className="text-white text-2xl font-bold mb-2">{card.value}</p>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  card.trendUp
                    ? "text-green-400 bg-green-400/10"
                    : "text-red-400 bg-red-400/10"
                }`}
              >
                {card.trend}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-6">
        <ViewsLineChart />
      </div>
    </div>
  );
}
