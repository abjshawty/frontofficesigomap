// src/components/Sidebar.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Building2, 
  Settings, 
  ShoppingCart, 
  ClipboardList,
  ChevronRight
} from 'lucide-react';
import { AppSection } from '../App';

interface NavigationItem {
    id: AppSection;
    label: string;
    icon: React.ElementType;
    path: string;
    description?: string;
}

const mainNavigation: NavigationItem[] = [
    { 
        id: 'DASHBOARD', 
        label: 'Dashboard', 
        icon: LayoutDashboard, 
        path: '/dashboard',
        description: 'Tableau de bord'
    },
    { 
        id: 'ACCOUNT', 
        label: 'Compte', 
        icon: Users, 
        path: '/account/users',
        description: 'Gestion du compte'
    },
    { 
        id: 'OPERATIONS', 
        label: 'Opérations', 
        icon: ClipboardList, 
        path: '/operations/passation-plans',
        description: 'Opérations de marché'
    },
    { 
        id: 'TENDERS', 
        label: 'Appels d\'offres', 
        icon: FileText, 
        path: '/tenders',
        description: 'Avis d\'appel d\'offres'
    },
    { 
        id: 'MY_OFFERS', 
        label: 'Mes offres', 
        icon: ShoppingCart, 
        path: '/my-offers/invitations',
        description: 'Gestion des offres'
    },
    { 
        id: 'MY_MARKETS', 
        label: 'Mes marchés', 
        icon: Building2, 
        path: '/my-markets',
        description: 'Mes marchés publics'
    },
    { 
        id: 'ADMIN', 
        label: 'Administration', 
        icon: Settings, 
        path: '/admin/users',
        description: 'Administration système'
    },
    { 
        id: 'COMPANY', 
        label: 'Entreprise', 
        icon: Building2, 
        path: '/company',
        description: 'Mon compte entreprise'
    },
];

interface SidebarProps {
    setActiveItem: (item: AppSection) => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveItem, isCollapsed = false, onToggleCollapse }) => {
    return (
        <div className={`
            bg-light-gray-1 border-r border-border flex flex-col transition-all duration-300
            ${isCollapsed ? 'w-16' : 'w-64'}
            min-h-screen
        `}>
            {/* Header de la sidebar */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-foreground">SIGOMAP</h2>
                                <p className="text-xs text-muted-foreground">Navigation</p>
                            </div>
                        </div>
                    )}
                    {onToggleCollapse && (
                        <button 
                            onClick={onToggleCollapse}
                            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-green-pastel/50 rounded-md transition-colors duration-200"
                            aria-label={isCollapsed ? "Étendre la navigation" : "Réduire la navigation"}
                        >
                            <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
                        </button>
                    )}
                </div>
            </div>

            {/* Navigation principale */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {mainNavigation.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        onClick={() => setActiveItem(item.id)}
                        className={({ isActive }) => `
                            group flex items-center p-3 rounded-lg transition-all duration-200 cursor-pointer
                            ${isCollapsed ? 'justify-center' : 'gap-3'}
                            ${isActive 
                                ? 'bg-primary text-primary-foreground shadow-sm' 
                                : 'text-muted-foreground hover:bg-green-pastel/50 hover:text-foreground'
                            }
                        `}
                        title={isCollapsed ? item.label : undefined}
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`
                                    flex items-center justify-center transition-all duration-200
                                    ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                                `}>
                                    <item.icon className="h-5 w-5" />
                                </div>
                                
                                {!isCollapsed && (
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm leading-tight">{item.label}</div>
                                        {item.description && (
                                            <div className="text-xs text-muted-foreground/70 leading-tight mt-0.5">
                                                {item.description}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer de la sidebar */}
            {!isCollapsed && (
                <div className="p-4 border-t border-border">
                    <div className="text-xs text-muted-foreground text-center">
                        SIGOMAP v1.0
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar; 