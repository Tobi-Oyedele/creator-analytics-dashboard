"use client";

import ViewsLineChart from "@/components/charts/ViewsLineChart";
import PostsTable from "@/components/dashboard/PostsTable";
import { mockPosts } from "@/lib/mockPosts";
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

const platformConfig: Record<
  "YouTube" | "Instagram" | "TikTok",
  { badge: string; dot: string }
> = {
  YouTube: { badge: "bg-red-500/10 text-red-400", dot: "bg-red-500" },
  Instagram: { badge: "bg-pink-500/10 text-pink-400", dot: "bg-pink-500" },
  TikTok: { badge: "bg-cyan-500/10 text-cyan-400", dot: "bg-cyan-500" },
};

const topPosts = [...mockPosts].sort((a, b) => b.views - a.views).slice(0, 5);

const platformBreakdown = (
  ["YouTube", "Instagram", "TikTok"] as const
).map((platform) => {
  const posts = mockPosts.filter((p) => p.platform === platform);
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
  const avgEngagement =
    posts.reduce((sum, p) => sum + p.engagementRate, 0) / posts.length;
  return { platform, count: posts.length, totalViews, avgEngagement };
});

export default function DashboardPage() {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/overview")
      .then((res) => res.json())
      .then((json) => {
        setCards([
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
        ]);
      });
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-sm text-slate-400 mt-0.5">February 2026</p>
      </div>

      {/* KPI Cards */}
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

      {/* Views chart */}
      <div className="bg-midnight rounded-xl p-5 border border-white/6">
        <div className="mb-4">
          <h2 className="text-white font-semibold text-sm">
            Views — Last 30 Days
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Daily view count across all platforms
          </p>
        </div>
        <ViewsLineChart />
      </div>

      {/* Top posts + Platform breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_272px] gap-4">

        {/* Top performing posts */}
        <div className="bg-midnight rounded-xl p-5 border border-white/6">
          <div className="mb-4">
            <h2 className="text-white font-semibold text-sm">
              Top Performing Content
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Your 5 highest-viewed posts
            </p>
          </div>
          <PostsTable posts={topPosts} />
        </div>

        {/* Platform breakdown */}
        <div className="bg-midnight rounded-xl p-5 border border-white/6">
          <div className="mb-4">
            <h2 className="text-white font-semibold text-sm">
              Platform Breakdown
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Views &amp; engagement by platform
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {platformBreakdown.map(
              ({ platform, count, totalViews, avgEngagement }) => {
                const cfg = platformConfig[platform];
                return (
                  <div
                    key={platform}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                  >
                    <span
                      className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${cfg.dot}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.badge}`}
                        >
                          {platform}
                        </span>
                        <span className="text-xs text-slate-500">
                          {count} posts
                        </span>
                      </div>
                      <p className="text-white text-sm font-semibold">
                        {totalViews.toLocaleString()}
                        <span className="text-slate-500 font-normal text-xs ml-1">
                          views
                        </span>
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {avgEngagement.toFixed(1)}% avg engagement
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
