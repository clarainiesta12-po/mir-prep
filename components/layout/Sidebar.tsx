"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  BookOpen, Home, Stethoscope, HelpCircle,
  ClipboardList, Calendar, Settings, ChevronLeft,
  ChevronRight, LogOut, Trophy, Flame, UserCircle, MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/inicio",         label: "Inicio",          icon: Home },
  { href: "/especialidades", label: "Especialidades",  icon: Stethoscope },
  { href: "/preguntas",      label: "Preguntas",       icon: HelpCircle },
  { href: "/simulacros",     label: "Simulacros",      icon: ClipboardList },
  { href: "/calendario",     label: "Calendario",      icon: Calendar },
  { href: "/chat",           label: "Chat IA",         icon: MessageSquare },
];

const bottomItems = [
  { href: "/perfil",    label: "Mi perfil",    icon: UserCircle },
  { href: "/rankings",  label: "Rankings",     icon: Trophy },
  { href: "/ajustes",   label: "Ajustes",      icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-white border-r border-gray-100 shadow-sm transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center h-16 px-4 border-b border-gray-100", collapsed && "justify-center")}>
        <Link href="/inicio" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <span className="font-display text-lg font-bold text-gray-900">
              MIR<span className="text-brand-600">Prep</span>
            </span>
          )}
        </Link>
      </div>

      {/* User quick stats */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <Link href="/perfil" className="flex items-center gap-2 mb-2 hover:opacity-80 transition-opacity">
            <Image
              src="/assets/Ana Chang.jpeg"
              alt="Ana Chang"
              width={32}
              height={32}
              className="rounded-full object-cover shrink-0 ring-1 ring-brand-200"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Ana Chang</p>
              <p className="text-xs text-gray-500">Plan Pro · Barcelona</p>
            </div>
          </Link>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              <span className="font-semibold text-orange-600">12</span> días
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-yellow-500" />
              <span className="font-semibold">#34</span>
            </span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {!collapsed && (
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Estudio
          </p>
        )}
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-brand-50 text-brand-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                collapsed && "justify-center"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-brand-600" : "")} />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-600" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-100 py-3 px-2 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all",
                collapsed && "justify-center"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
        <button
          className={cn(
            "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-all",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Salir</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </aside>
  );
}
