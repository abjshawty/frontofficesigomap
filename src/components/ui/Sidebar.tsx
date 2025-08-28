"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/components/lib/utils"
import type { SidebarNavItem } from "@/config/nav-config"

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  navItems: SidebarNavItem[];
  moduleTitle: string;
}

export function Sidebar({ isCollapsed, onToggle, navItems, moduleTitle }: SidebarProps) {
  const pathname = usePathname()

  const getActiveAccordion = useCallback(() => {
    if (!navItems) return null;
    const activeItem = navItems
      .filter((item): item is Extract<SidebarNavItem, { type: 'accordion' }> => item.type === 'accordion')
      .map(item => {
        const matchingChild = item.children.find(child => pathname.startsWith(child.href));
        return matchingChild ? { ...item, hrefLength: matchingChild.href.length } : null;
      })
      .filter((item): item is Extract<SidebarNavItem, { type: 'accordion' }> & { hrefLength: number } => item !== null)
      .sort((a, b) => b.hrefLength - a.hrefLength)[0];
      
    return activeItem ? activeItem.label : null;
  }, [pathname, navItems]);

  const [openAccordion, setOpenAccordion] = useState<string | null>(getActiveAccordion());

  useEffect(() => {
    if (isCollapsed) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(getActiveAccordion());
    }
  }, [pathname, isCollapsed, getActiveAccordion]);

  const handleAccordionToggle = (label: string) => {
    if (isCollapsed) return;
    setOpenAccordion(openAccordion === label ? null : label);
  };

  const getActiveLink = useCallback(() => {
    if (!navItems) return null;

    const matchingLinks = navItems
        .filter((item): item is Extract<SidebarNavItem, { type: 'link' }> => item.type === 'link')
        .filter(item => pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/'));

    if (matchingLinks.length === 0) return null;

    matchingLinks.sort((a, b) => b.href.length - a.href.length);
    return matchingLinks[0];
  }, [pathname, navItems]);

  const activeLink = getActiveLink();

  return (
    <div className={cn(
      "flex-1 flex flex-col bg-sigomap-blanc w-full border-r border-sigomap-gris-light transition-all duration-300 ease-in-out",
      isCollapsed ? "w-[72px]" : "w-[280px]"
    )}>
      <div className="h-16 px-3 border-b border-sigomap-gris-light bg-gradient-to-r from-sigomap-blanc to-sigomap-bg-secondary flex items-center justify-between">
        <div className={cn("flex items-center space-x-2 transition-opacity duration-300", isCollapsed && "opacity-0 pointer-events-none")}>
            <div className="w-3 h-3 rounded-full bg-sigomap-bleu"></div>
            <div>
                <div className="text-[10px] font-semibold text-sigomap-gris-dark tracking-wide">
                {moduleTitle}
                </div>
                <div className="text-[8px] font-light text-sigomap-gris tracking-wide">
                SIGOMAP
                </div>
            </div>
        </div>
        <button onClick={onToggle} className="p-1.5 hover:bg-sigomap-gris-light/50 rounded-sm transition-colors duration-200 group">
            {isCollapsed ? 
                <ChevronRight className="w-4 h-4 text-sigomap-gris group-hover:text-sigomap-gris-dark"/> : 
                <ChevronLeft className="w-4 h-4 text-sigomap-gris group-hover:text-sigomap-gris-dark"/>
            }
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2 bg-sigomap-blanc overflow-y-auto">
        <div className="px-2 py-2 mb-1">
            <h3 className={cn(
                "text-xs font-semibold text-sigomap-gris uppercase tracking-wider transition-all duration-300",
                isCollapsed && "text-center"
            )}>
                {isCollapsed ? moduleTitle.substring(0, 2) : moduleTitle}
            </h3>
        </div>

        {navItems && navItems.map((item) => {
          if (item.type === 'link') {
            const isActive = activeLink ? item.href === activeLink.href : false;
            return (
              <div key={item.label}>
                <Link
                  href={item.href}
                  title={item.label}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-normal transition-all duration-200 rounded-md",
                    isCollapsed && "justify-center",
                    isActive
                      ? "bg-gradient-to-r from-sigomap-vert to-sigomap-vert-dark text-sigomap-blanc shadow-sm"
                      : "text-sigomap-gris-dark hover:text-sigomap-vert-dark hover:bg-sigomap-bg-secondary/50"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 flex-shrink-0 transition-colors duration-200",
                    !isCollapsed && "mr-3",
                    isActive ? "text-sigomap-blanc" : "text-sigomap-gris group-hover:text-sigomap-vert-dark"
                  )} />
                  <span className={cn("font-medium transition-all duration-300", isCollapsed && "opacity-0 w-0 h-0")}>{item.label}</span>
                </Link>
              </div>
            );
          }

          if (item.type === 'accordion') {
            const isOpen = openAccordion === item.label;
            const isChildActive = item.children.some(child => pathname.startsWith(child.href));

            return (
              <div key={item.label}>
                <button
                  onClick={() => handleAccordionToggle(item.label)}
                  disabled={isCollapsed}
                  className={cn(
                    "w-full group flex items-center justify-between px-3 py-2 text-sm font-normal transition-all duration-200 rounded-md",
                     isCollapsed && "justify-center",
                    (isOpen && !isCollapsed) || isChildActive
                      ? "bg-sigomap-bg-secondary text-sigomap-gris-dark"
                      : "text-sigomap-gris-dark hover:text-sigomap-vert-dark hover:bg-sigomap-bg-secondary/50"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className={cn(
                        "h-4 w-4 flex-shrink-0 transition-colors duration-200",
                        !isCollapsed && "mr-3",
                        (isOpen && !isCollapsed) || isChildActive ? "text-sigomap-gris-dark" : "text-sigomap-gris group-hover:text-sigomap-vert-dark"
                    )} />
                    <span className={cn("font-medium transition-all duration-300", isCollapsed && "opacity-0 w-0 h-0")}>{item.label}</span>
                  </div>
                  {!isCollapsed && (
                    <ChevronRight className={cn(
                        "h-4 w-4 transition-all duration-300 ease-in-out",
                        isOpen ? "rotate-90 text-sigomap-gris-dark" : "text-sigomap-gris group-hover:text-sigomap-vert-dark"
                    )} />
                  )}
                </button>
                <div className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isCollapsed ? "max-h-0 opacity-0" : (isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")
                )}>
                    <div className={cn("mt-2 ml-4 border-l-2 border-sigomap-gris-light", !isCollapsed && "pl-3 space-y-1 py-1")}>
                        {item.children.map((child) => {
                            const isChildLinkActive = pathname.startsWith(child.href);
                            return (
                                <Link
                                    key={child.href}
                                    href={child.href}
                                    className={cn(
                                        "group flex items-center px-3 py-2 text-sm transition-all duration-200 rounded-md",
                                        isChildLinkActive 
                                            ? "bg-sigomap-vert/10 text-sigomap-vert-dark" 
                                            : "text-sigomap-gris-dark hover:text-sigomap-vert-dark hover:bg-sigomap-bg-secondary/50"
                                    )}
                                >
                                    <span className={cn(
                                        "w-1.5 h-1.5 mr-3 rounded-full",
                                        isChildLinkActive ? "bg-sigomap-vert-dark" : "bg-sigomap-gris-light group-hover:bg-sigomap-vert-dark"
                                    )}></span>
                                    <div>
                                        <span className={cn("font-normal", isChildLinkActive && "font-semibold")}>{child.label}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </nav>
    </div>
  )
}
