"use client"

import React, { useState } from 'react';
import { CompactSidebar } from "@/components/ui/CompactSidebar";
import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen w-full">
      <CompactSidebar />
      <div className="flex flex-col flex-1">
        <div className={`grid ${isSidebarCollapsed ? 'md:grid-cols-[72px_1fr]' : 'md:grid-cols-[280px_1fr]'} flex-1 transition-all duration-300 ease-in-out`}>
          <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
          <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-sigomap-bg-secondary">
              <div className="w-full max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
