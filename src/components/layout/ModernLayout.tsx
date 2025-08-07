import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import {
  Settings,
  User,
  ChevronDown,
  Bell,
  LifeBuoy,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';

// --- DATA & TYPES ---
interface UserProfile {
    name: string;
    company: string;
}

const userProfile: UserProfile = {
    name: 'Sonec Devteam',
    company: 'ETS FIRDAOUS',
};

// --- HEADER COMPONENT (pour le layout interne) ---
const InternalHeader: React.FC<{ user: UserProfile, onNavigate: (path: string) => void }> = ({ user, onNavigate }) => {
    return (
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
             <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/dashboard')}>
                <img src="/logo-sigomap.png" alt="Logo SIGOMAP" className="h-12 w-auto" />
            </div>
            {/* La navigation principale pourrait être ici via des menus */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100"><Bell className="w-5 h-5" /></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 outline-none">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <div className="hidden md:block text-left">
                           <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                           <p className="text-xs text-slate-500">{user.company}</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-500 hidden md:block" />
                   </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('/admin/settings')}><Settings className="w-4 h-4 mr-2" /><span>Paramètres</span></DropdownMenuItem>
                  <DropdownMenuItem><LifeBuoy className="w-4 h-4 mr-2" /><span>Support</span></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="w-full text-red-500 focus:text-red-600 focus:bg-red-50">
                        <LogOut className="w-4 h-4 mr-2" /><span>Se déconnecter</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    );
};


const ModernLayout: React.FC = () => {
    const location = useLocation();
    const navigate = (path: string) => (window.location.href = path); // simple navigation handler

    // Logique pour générer le fil d'Ariane dynamiquement
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbItems: BreadcrumbItem[] = pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        // Remplace les tirets par des espaces et met la première lettre en majuscule
        const label = value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return { label, path: to };
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <InternalHeader user={userProfile} onNavigate={navigate} />
            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs items={breadcrumbItems} />
                <Outlet />
            </main>
        </div>
    );
};

export default ModernLayout;
