"use client";
import { useState, useEffect } from "react";

interface CardData {
  label: string;
  value: string;
}

export default function DashboardPage() {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/overview")
      .then((res) => res.json())
      .then((json) => {
        const formattedCards: CardData[] = [
          { label: "Total Views", value: json.totalViews.toLocaleString() },
          { label: "Subscribers", value: json.subscribers.toLocaleString() },
          { label: "Revenue", value: `$${json.revenue.toLocaleString()}` },
          { label: "Engagement Rate", value: `${json.engagementRate}%` },
        ];

        setCards(formattedCards);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Analytics</h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-midnight rounded-xl p-5">
            <p className="text-gray-400 text-sm">{card.label}</p>
            <p className="text-white text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
