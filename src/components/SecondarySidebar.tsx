// src/components/SecondarySidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';

// --- Types ---
export interface SubNavItem {
    id: string;
    text: string;
    icon: React.ElementType;
    path?: string;
    description?: string;
}

export interface NavModule {
    id: string;
    title: string;
    subItems: SubNavItem[];
}

interface SecondarySidebarProps {
    module: NavModule | null;
    activeSubItem: string | null;
    onSubItemClick: (id: string) => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

// --- Composant ---
const SecondarySidebar: React.FC<SecondarySidebarProps> = ({ 
    module, 
    onSubItemClick, 
    isCollapsed, 
    onToggleCollapse 
}) => {
    if (!module) {
        return (
            <div className="w-0 bg-light-gray-1 border-r border-border transition-all duration-300 overflow-hidden">
            </div>
        );
    }

    return (
        <div className={`
            bg-light-gray-1 border-r border-border transition-all duration-300 flex flex-col
            ${isCollapsed ? 'w-16' : 'w-72'}
            min-h-screen
        `}>
            {/* Header du module */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <FolderOpen className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2 className="text-sm font-bold text-foreground leading-tight">{module.title}</h2>
                                <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                                    {module.subItems.length} élément{module.subItems.length > 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                    )}
                    
                    <button 
                        onClick={onToggleCollapse} 
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-green-pastel/50 rounded-md transition-colors duration-200"
                        aria-label={isCollapsed ? "Étendre la navigation" : "Réduire la navigation"}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation des sous-éléments */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {module.subItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path || '#'}
                        onClick={() => onSubItemClick(item.id)}
                        className={({ isActive }) => `
                            group flex items-center p-3 rounded-lg transition-all duration-200 cursor-pointer
                            ${isCollapsed ? 'justify-center' : 'gap-3'}
                            ${isActive 
                                ? 'bg-primary text-primary-foreground shadow-sm' 
                                : 'text-muted-foreground hover:bg-green-pastel/50 hover:text-foreground'
                            }
                        `}
                        title={isCollapsed ? item.text : undefined}
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
                                        <div className="font-medium text-sm leading-tight">{item.text}</div>
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

            {/* Footer de la sidebar secondaire */}
            {!isCollapsed && (
                <div className="p-4 border-t border-border">
                    <div className="text-xs text-muted-foreground text-center">
                        Module {module.title}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecondarySidebar; 