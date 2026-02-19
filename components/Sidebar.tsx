"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  PlaySquare,
  Users,
  Radio,
  UserPlus,
  Wallet,
  PieChart,
  Handshake,
  FileImage,
  CalendarDays,
  Trophy,
  Settings,
  Bell,
  LifeBuoy,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

// ─── Navigation config ────────────────────────────────────────────────────────

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      {
        label: "Content Performance",
        href: "/dashboard/content-performance",
        icon: PlaySquare,
      },
    ],
  },
  {
    title: "Growth",
    items: [
      {
        label: "Audience Insights",
        href: "/dashboard/audience-insights",
        icon: Users,
      },
      {
        label: "Reach & Impressions",
        href: "/dashboard/reach-impressions",
        icon: Radio,
      },
      {
        label: "Follower Growth",
        href: "/dashboard/follower-growth",
        icon: UserPlus,
      },
    ],
  },
  {
    title: "Revenue",
    items: [
      {
        label: "Earnings Overview",
        href: "/dashboard/earnings",
        icon: Wallet,
      },
      {
        label: "Revenue Breakdown",
        href: "/dashboard/revenue-breakdown",
        icon: PieChart,
      },
      {
        label: "Sponsorships & Deals",
        href: "/dashboard/sponsorships",
        icon: Handshake,
      },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Posts & Media", href: "/dashboard/posts", icon: FileImage },
      {
        label: "Scheduled Content",
        href: "/dashboard/scheduled",
        icon: CalendarDays,
      },
      {
        label: "Top Performing Content",
        href: "/dashboard/top-performing",
        icon: Trophy,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        label: "Account Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
      {
        label: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
      },
      { label: "Help & Support", href: "/dashboard/help", icon: LifeBuoy },
    ],
  },
];

// ─── SidebarInner (shared between mobile drawer and desktop sidebar) ──────────

type SidebarInnerProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
  onLinkClick: () => void;
  isActive: (href: string) => boolean;
};

function SidebarInner({
  collapsed,
  onToggleCollapse,
  onClose,
  onLinkClick,
  isActive,
}: SidebarInnerProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Header: logo + toggle ── */}
      <div
        className={`flex shrink-0 border-b border-white/8 transition-all duration-300 ${
          collapsed
            ? "flex-col items-center py-3 gap-2"
            : "flex-row items-center h-16 px-4 justify-between"
        }`}
      >
        {/* Logo mark */}
        <div className={`flex items-center gap-2.5 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          {!collapsed && (
            <span className="text-white font-semibold text-sm tracking-tight truncate">
              CreatorAnalytics
            </span>
          )}
        </div>

        {/* Desktop: collapse/expand toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>

        {/* Mobile: close (X) button */}
        <button
          onClick={onClose}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-3">
        {NAV_SECTIONS.map((section) => (
          <div
            key={section.title}
            className={`mb-1 ${collapsed ? "px-2" : "px-3"}`}
          >
            {/* Section label / divider */}
            {!collapsed ? (
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 pt-4 pb-1.5 select-none">
                {section.title}
              </p>
            ) : (
              <div className="border-t border-white/8 my-2" />
            )}

            {/* Items */}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onLinkClick}
                      title={collapsed ? item.label : undefined}
                      className={`relative flex items-center gap-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group ${
                        collapsed ? "justify-center px-2" : "px-3"
                      } ${
                        active
                          ? "bg-emerald-500/12 text-emerald-400"
                          : "text-slate-400 hover:text-white hover:bg-white/6"
                      }`}
                    >
                      {/* Active left-edge bar */}
                      {active && !collapsed && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald-500 rounded-r-full" />
                      )}

                      {/* Icon */}
                      <Icon
                        className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                          active
                            ? "text-emerald-400"
                            : "text-slate-500 group-hover:text-slate-200"
                        }`}
                      />

                      {/* Label */}
                      {!collapsed && (
                        <span className="truncate leading-none">
                          {item.label}
                        </span>
                      )}

                      {/* Active dot (collapsed only) */}
                      {active && collapsed && (
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── User profile ── */}
      <div
        className={`shrink-0 border-t border-white/8 p-3 ${
          collapsed ? "flex justify-center" : ""
        }`}
      >
        <div
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/6 transition-colors cursor-default ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
            <span className="text-white text-xs font-bold select-none">AJ</span>
          </div>

          {/* Name & role */}
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-medium leading-none mb-1 truncate">
                Alex Johnson
              </p>
              <p className="text-slate-500 text-xs truncate">Content Creator</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Sidebar export ──────────────────────────────────────────────────────

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Mobile: hamburger trigger (fixed top-left) ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 flex items-center justify-center w-9 h-9 rounded-xl bg-slate-950 text-white shadow-lg shadow-black/25 border border-white/10 transition-colors hover:bg-slate-900"
        aria-label="Open navigation"
      >
        <Menu className="w-[18px] h-[18px]" />
      </button>

      {/* ── Mobile: backdrop overlay ── */}
      <div
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile: slide-in drawer ── */}
      <aside
        aria-label="Mobile navigation"
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-white/8 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarInner
          collapsed={false}
          onToggleCollapse={() => {}}
          onClose={() => setMobileOpen(false)}
          onLinkClick={() => setMobileOpen(false)}
          isActive={isActive}
        />
      </aside>

      {/* ── Desktop: static collapsible sidebar ── */}
      <aside
        aria-label="Desktop navigation"
        className={`hidden lg:flex flex-col bg-slate-950 border-r border-white/8 transition-all duration-300 ease-in-out shrink-0 ${
          collapsed ? "w-[72px]" : "w-64"
        }`}
      >
        <SidebarInner
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          onClose={() => {}}
          onLinkClick={() => {}}
          isActive={isActive}
        />
      </aside>
    </>
  );
}
