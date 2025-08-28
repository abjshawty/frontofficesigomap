"use client"

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CompactSidebar } from "@/components/ui/CompactSidebar";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/Sidebar";
import { modules } from '@/config/nav-config';
import { Breadcrumb } from "./Breadcrumb";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const activeModule = modules
    .map(item => {
        const matchingPath = item.activeFor
            .filter(path => pathname.startsWith(path))
            .sort((a, b) => b.length - a.length)[0];
        
        return {
            ...item,
            matchLength: matchingPath ? matchingPath.length : 0
        };
    })
    .filter(item => item.matchLength > 0)
    .sort((a, b) => b.matchLength - a.matchLength)[0];

  const sidebarNav = activeModule?.sidebarNav;

  return (
    <div className="flex h-screen w-full bg-sigomap-bg-secondary overflow-hidden">
      <CompactSidebar />
      <div className={`hidden md:flex flex-col transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-[72px]' : 'w-[280px]'}`}>
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={toggleSidebar}
          navItems={sidebarNav?.items || []}
          moduleTitle={sidebarNav?.title || activeModule?.label || "SIGOMAP"}
        />
      </div>
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="w-full max-w-7xl mx-auto">
            <Breadcrumb />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
