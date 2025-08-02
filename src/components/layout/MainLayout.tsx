import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import SecondarySidebar from "../SecondarySidebar";
import { secondaryNavigationData } from "../../navigation.data";
import { AppSection } from "../../App";

const MainLayout = () => {
  const location = useLocation();
  
  // Gère la section principale active (Dashboard, Tenders, etc.)
  const [activeSection, setActiveSection] = useState<AppSection>('DASHBOARD');
  // Gère le sous-menu actif dans la barre latérale secondaire
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  // Gère l'état (ouvert/fermé) de la barre latérale principale
  const [isMainSidebarCollapsed, setMainSidebarCollapsed] = useState(false);
  // Gère l'état (ouvert/fermé) de la barre latérale secondaire
  const [isSecondaryCollapsed, setSecondaryCollapsed] = useState(false);

  // Trouve le module de navigation secondaire correspondant à la section active
  const activeModule = secondaryNavigationData.find(m => m.id === activeSection) || null;

  // Synchronise la section active avec l'URL actuelle
  useEffect(() => {
    const path = location.pathname;
    
    // Détermine la section active basée sur l'URL
    let newActiveSection: AppSection = 'DASHBOARD';
    
    if (path.startsWith('/dashboard')) {
      newActiveSection = 'DASHBOARD';
    } else if (path.startsWith('/account')) {
      newActiveSection = 'ACCOUNT';
    } else if (path.startsWith('/operations')) {
      newActiveSection = 'OPERATIONS';
    } else if (path.startsWith('/tenders')) {
      newActiveSection = 'TENDERS';
    } else if (path.startsWith('/my-offers')) {
      newActiveSection = 'MY_OFFERS';
    } else if (path.startsWith('/my-markets')) {
      newActiveSection = 'MY_MARKETS';
    } else if (path.startsWith('/admin')) {
      newActiveSection = 'ADMIN';
    } else if (path.startsWith('/company')) {
      newActiveSection = 'COMPANY';
    }
    
    setActiveSection(newActiveSection);
    
    // Trouve le sous-item actif basé sur l'URL
    const module = secondaryNavigationData.find(m => m.id === newActiveSection);
    if (module) {
      const matchingSubItem = module.subItems.find(item => 
        item.path && path.startsWith(item.path)
      );
      if (matchingSubItem) {
        setActiveSubItem(matchingSubItem.id);
      } else if (module.subItems.length > 0) {
        setActiveSubItem(module.subItems[0].id);
      }
    }
  }, [location.pathname]);

  // Handler pour changer la section active
  const handleSetActiveItem = (section: AppSection) => {
    setActiveSection(section);
    const newModule = secondaryNavigationData.find(m => m.id === section);
    // Sélectionne le premier sous-item par défaut
    if (newModule && newModule.subItems.length > 0) {
      setActiveSubItem(newModule.subItems[0].id);
    } else {
      setActiveSubItem(null);
    }
  };

  // Handler pour basculer la sidebar principale
  const handleToggleMainSidebar = () => {
    setMainSidebarCollapsed(!isMainSidebarCollapsed);
  };

  // Handler pour basculer la sidebar secondaire
  const handleToggleSecondarySidebar = () => {
    setSecondaryCollapsed(!isSecondaryCollapsed);
  };

  return (
    <div className="flex h-screen bg-background font-sans">
      {/* Sidebar principale */}
      <Sidebar 
        setActiveItem={handleSetActiveItem} 
        isCollapsed={isMainSidebarCollapsed}
        onToggleCollapse={handleToggleMainSidebar}
      />
      
      {/* Sidebar secondaire */}
      <SecondarySidebar
        module={activeModule}
        activeSubItem={activeSubItem}
        onSubItemClick={setActiveSubItem}
        isCollapsed={isSecondaryCollapsed || !activeModule || activeModule.subItems.length === 0}
        onToggleCollapse={handleToggleSecondarySidebar}
      />
      
      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout; 