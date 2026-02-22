"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { name: "Revenue", href: "/dashboard/revenue", icon: DollarSign },
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
          isActive
            ? "text-blue-400"
            : "text-slate-500 group-hover:text-slate-300"
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
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActiveRoute = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile top nav */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-18 bg-abyss border-b border-white/6 flex items-center justify-between px-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center justify-center w-9 h-9 -ml-1 text-slate-400 hover:text-white transition-colors duration-150"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <p className="text-[15px] font-semibold text-white tracking-tight leading-none">
            Creator Analytics
          </p>
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
            <TrendingUp size={13} className="text-white" />
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={closeMobileMenu}
        className={`
          lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-60 bg-abyss flex flex-col overflow-hidden
          border-r border-white/6
          lg:transition-[transform,width] lg:duration-300 lg:ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isMobileMenuOpen
            ? "translate-x-0 animate-slide-in-left shadow-[4px_0_32px_rgba(0,0,0,0.5)]"
            : "-translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in"
          }
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

          {/* Mobile close button — lives inside the sidebar header */}
          <button
            onClick={closeMobileMenu}
            className="lg:hidden flex items-center justify-center w-6 h-6 rounded-md text-slate-500 hover:text-slate-300 hover:bg-white/6 transition-all duration-150 shrink-0"
            aria-label="Close menu"
          >
            <X size={20} />
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
        </nav>

        {/* Logout section */}
        <div className="p-3 border-t border-white/6">
          <button
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : undefined}
            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-white/4 transition-all duration-150 ${isCollapsed ? "lg:justify-center lg:gap-0 lg:p-2" : ""}`}
          >
            <LogOut size={14} className="text-slate-500" />
            <span
              className={`text-sm text-slate-400 ${isCollapsed ? "lg:hidden" : ""}`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
