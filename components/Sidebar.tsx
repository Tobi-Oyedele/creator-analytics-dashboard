"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  FileText,
  Users,
  Settings,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { name: "Revenue", href: "/dashboard/revenue", icon: DollarSign },
  { name: "Content Library", href: "/dashboard/content", icon: FileText },
  { name: "Audience", href: "/dashboard/audience", icon: Users },
];

const secondaryNav = [
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

function NavLink({
  item,
  onClick,
  isActive,
  collapsed,
}: {
  item: { name: string; href: string; icon: React.ElementType };
  onClick: () => void;
  isActive: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      title={collapsed ? item.name : undefined}
      className={`
        group flex items-center gap-3 px-3 py-2 rounded-md text-sm
        transition-all duration-150 select-none
        ${collapsed ? "lg:justify-center lg:gap-0 lg:p-2" : ""}
        ${
          isActive
            ? "bg-white/8 text-white"
            : "text-slate-400 hover:bg-white/4 hover:text-slate-200"
        }
      `}
    >
      <Icon
        size={16}
        className={`shrink-0 transition-colors duration-150 ${
          isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
        }`}
      />
      <span className={`font-medium truncate ${collapsed ? "lg:hidden" : ""}`}>
        {item.name}
      </span>
      {isActive && (
        <span
          className={`ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 ${
            collapsed ? "lg:hidden" : ""
          }`}
        />
      )}
    </Link>
  );
}

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActiveRoute = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile hamburger
          Fades out once the drawer opens so it no longer sits on top of the sidebar */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className={`
          lg:hidden fixed top-4 left-4 z-50
          p-2 bg-abyss text-slate-300 rounded-lg border border-white/10 shadow-lg
          hover:text-white transition-all duration-200
          ${isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Backdrop — always in the DOM, fades in/out via opacity */}
      <div
        onClick={closeMobileMenu}
        className={`
          lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30
          transition-opacity duration-300
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-60 bg-abyss flex flex-col overflow-hidden
          border-r border-white/6
          transition-[transform,width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-17" : ""}
        `}
      >
        {/* Brand */}
        <div
          className={`
            border-b border-white/6 flex items-center gap-2.5 px-4 py-4
            ${isCollapsed ? "lg:justify-center lg:gap-0 lg:px-0" : ""}
          `}
        >
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
            <TrendingUp size={13} className="text-white" />
          </div>

          {/* Brand text — hidden on desktop when collapsed */}
          <div className={`min-w-0 flex-1 ${isCollapsed ? "lg:hidden" : ""}`}>
            <h1 className="text-[13px] font-semibold text-white tracking-tight leading-none truncate">
              Creator Analytics
            </h1>
            <p className="text-[11px] text-slate-500 mt-0.75 leading-none">
              Dashboard
            </p>
          </div>

          {/* Desktop collapse button — only rendered when sidebar is expanded */}
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex items-center justify-center w-6 h-6 rounded-md text-slate-500 hover:text-slate-300 hover:bg-white/6 transition-all duration-150 shrink-0"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft size={14} />
            </button>
          )}

          {/* Mobile close button — lives inside the sidebar header so it never overlaps */}
          <button
            onClick={closeMobileMenu}
            className="lg:hidden flex items-center justify-center w-6 h-6 rounded-md text-slate-500 hover:text-slate-300 hover:bg-white/6 transition-all duration-150 shrink-0"
            aria-label="Close menu"
          >
            <X size={14} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto flex flex-col gap-0.5">
          {/* Desktop expand button — top of nav, only when collapsed */}
          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(false)}
              className="hidden lg:flex items-center justify-center w-full py-1.5 mb-1 rounded-md text-slate-600 hover:text-slate-300 hover:bg-white/4 transition-all duration-150"
              aria-label="Expand sidebar"
            >
              <ChevronRight size={14} />
            </button>
          )}

          {/* Main nav */}
          <div className="flex flex-col gap-0.5">
            {mainNav.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                onClick={closeMobileMenu}
                isActive={isActiveRoute(item.href)}
                collapsed={isCollapsed}
              />
            ))}
          </div>

          {/* Divider */}
          <div
            className={`my-2 border-t border-white/6 ${
              isCollapsed ? "lg:mx-1 mx-3" : "mx-3"
            }`}
          />

          {/* Secondary nav */}
          <div className="flex flex-col gap-0.5">
            {secondaryNav.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                onClick={closeMobileMenu}
                isActive={isActiveRoute(item.href)}
                collapsed={isCollapsed}
              />
            ))}
          </div>
        </nav>

        {/* User section */}
        <div className="border-t border-white/6 px-2 py-2">
          <button
            title={isCollapsed ? "Tobz — Creator" : undefined}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-md
              hover:bg-white/4 transition-all duration-150 group
              ${isCollapsed ? "lg:justify-center lg:gap-0 lg:px-0" : ""}
            `}
          >
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 text-[11px] font-bold text-white shadow-sm ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-150">
              T
            </div>
            <div className={`flex-1 text-left min-w-0 ${isCollapsed ? "lg:hidden" : ""}`}>
              <p className="text-[13px] font-medium text-slate-200 leading-none truncate">
                Tobz
              </p>
              <p className="text-[11px] text-slate-500 mt-0.75 leading-none">
                Creator
              </p>
            </div>
            <ChevronRight
              size={13}
              className={`text-slate-600 group-hover:text-slate-400 transition-colors duration-150 shrink-0 ${
                isCollapsed ? "lg:hidden" : ""
              }`}
            />
          </button>
        </div>
      </aside>
    </>
  );
}
