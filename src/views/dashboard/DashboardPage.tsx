import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  User,
  TrendingUp,
  Zap,
  ArrowRight,
  Activity,
  Calendar,
  ChevronDown,
  Globe,
  LogOut,
  Settings,
  Bell,
  MessageSquare,
  LifeBuoy
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { cn } from '../../lib/utils';

// --- TYPES ---
interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
  lastLogin: string;
}

interface NavMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems: { id: string; label: string; path: string }[];
}

interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  stat: string;
  statLabel: string;
  path: string;
  color: string;
}

// --- MOCK DATA ---
const userProfile: UserProfile = {
  name: 'Sonec Devteam',
  email: 'devteam@sonec.ci',
  company: 'ETS FIRDAOUS',
  role: 'Administrateur du compte Espace Entreprise',
  lastLogin: 'mardi 5 août 2025, 14:27',
};

const navMenu: NavMenuItem[] = [
    {
      id: 'marches-a-venir',
      label: "Opérations de marché à venir",
      icon: TrendingUp,
      subItems: [
        { id: 'ppm', label: 'Plans de passation de marchés', path: '/operations/passation-plans' },
        { id: 'avis-generaux', label: 'Avis généraux de passation', path: '/tenders/avis-generaux' },
      ],
    },
    {
      id: 'appels-doffres',
      label: "Avis d'appels d'offres",
      icon: Zap,
      subItems: [
        { id: 'aao', label: 'Avis d\'appels d\'offres', path: '/tenders' },
        { id: 'dossiers', label: 'Achat de dossiers d\'appels d\'offres', path: '/tenders/purchase' },
      ],
    },
    {
      id: 'mes-offres',
      label: 'Mes offres',
      icon: Activity,
      subItems: [
        { id: 'invitations', label: 'Invitations aux restreints', path: '/my-offers/invitations' },
        { id: 'soumissions', label: 'Soumissions en cours', path: '/soumissions' },
      ],
    },
    {
      id: 'mes-marches',
      label: 'Mes marchés',
      icon: Building2,
      subItems: [
        { id: 'liste', label: 'Liste des marchés', path: '/my-markets' },
        { id: 'details', label: 'Détails des marchés', path: '/my-markets/details' },
        { id: 'execution', label: 'Exécution des marchés', path: '/my-markets/execution' },
      ],
    },
    {
      id: 'administration',
      label: 'Administration',
      icon: Settings,
      subItems: [
        { id: 'users', label: 'Gestion des utilisateurs', path: '/admin/users' },
        { id: 'settings', label: 'Paramètres du compte', path: '/admin/settings' },
      ],
    },
  ];

  const actionCards: ActionCard[] = [
    {
      id: 'ppm',
      title: 'Plans de Passation de Marchés',
      description: 'Consultez les opérations publiées aux plans de passation de marché.',
      icon: Calendar,
      stat: '3',
      statLabel: 'Nouveaux plans',
      path: '/operations/passation-plans',
      color: 'text-sky-500',
    },
    {
      id: 'aao',
      title: "Avis d'Appels d'Offres",
      description: "Explorez l'ensemble des avis d'appels d'offres des autorités contractantes.",
      icon: Zap,
      stat: '12',
      statLabel: 'Appels d\'offres ouverts',
      path: '/tenders',
      color: 'text-amber-500',
    },
    {
      id: 'invitations',
      title: 'Invitations aux Restreints',
      description: 'Accédez à toutes vos invitations pour des appels d\'offres et procédures restreintes.',
      icon: MessageSquare,
      stat: '2',
      statLabel: 'Nouvelles invitations',
      path: '/my-offers/invitations',
      color: 'text-violet-500',
    },
    {
      id: 'operations-en-cours',
      title: 'Opérations en Cours',
      description: 'Suivez les appels d\'offres pour lesquels vous êtes en cours de participation.',
      icon: TrendingUp,
      stat: '5',
      statLabel: 'Opérations actives',
      path: '/soumissions',
      color: 'text-rose-500',
    },
    {
      id: 'mes-marches',
      title: 'Mes Marchés',
      description: 'Gérez vos marchés en cours de contractualisation ou d\'exécution.',
      icon: Building2,
      stat: '8',
      statLabel: 'Marchés en cours',
      path: '/my-markets',
      color: 'text-teal-500',
    },
    {
      id: 'utilisateurs',
      title: 'Mes Utilisateurs',
      description: 'Administrez la liste des utilisateurs rattachés à votre entreprise.',
      icon: User,
      stat: '4',
      statLabel: 'Utilisateurs actifs',
      path: '/admin/users',
      color: 'text-slate-500',
    },
  ];

// --- COMPONENTS ---

const Header: React.FC<{
    user: UserProfile;
    menu: NavMenuItem[];
    onNavigate: (path: string) => void;
    onLogout: () => void;
  }> = ({ user, menu, onNavigate, onLogout }) => {
  return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/dashboard')}>
                <img src="/logo-sigomap.png" alt="Logo SIGOMAP" className="h-12 w-auto" />
                <div className="hidden sm:block">
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">SIGOMAP.GOUV.CI</h1>
                    <p className="text-xs text-slate-500 font-medium">Plateforme des marchés publics</p>
            </div>
            </div>
  
            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {menu.map((item) => (
            <DropdownMenu key={item.id}>
              <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-slate-600 font-medium hover:text-primary hover:bg-primary/10 text-sm">
                      {item.label}
                      <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64">
                    <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.subItems.map((sub) => (
                      <DropdownMenuItem key={sub.id} onClick={() => onNavigate(sub.path)}>
                        {sub.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100">
                  <Bell className="w-5 h-5" />
          </Button>

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
                  <div className="px-2 py-1 text-xs text-slate-500">
                      <p>{user.email}</p>
                      <p className="font-medium">{user.role}</p>
              </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('/admin/settings')}>
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Paramètres</span>
              </DropdownMenuItem>
                  <DropdownMenuItem>
                      <Globe className="w-4 h-4 mr-2" />
                      <span>Langue : Français</span>
              </DropdownMenuItem>
                  <DropdownMenuItem>
                      <LifeBuoy className="w-4 h-4 mr-2" />
                      <span>Support</span>
              </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-500 focus:text-red-600 focus:bg-red-50">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
          </div>
        </div>
      </header>
    );
  };

const WelcomeBanner: React.FC<{ user: UserProfile }> = ({ user }) => (
    <div className="bg-slate-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent rounded-full opacity-50"></div>
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-sky-100 rounded-full opacity-50"></div>
        <div className="relative z-10">
            <motion.h2 
                className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Bonjour, {user.name.split(' ')[0]} !
            </motion.h2>
            <motion.p 
                className="mt-2 text-slate-600 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                Bienvenue sur votre tableau de bord SIGOMAP. Voici un aperçu de votre activité.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Badge variant="outline" className="mt-4 font-mono text-xs text-slate-500 border-slate-300">
                    Dernière connexion : {user.lastLogin}
                </Badge>
            </motion.div>
        </div>
    </div>
);

const ActionCardComponent: React.FC<{ card: ActionCard; onNavigate: (path: string) => void, delay: number }> = ({ card, onNavigate, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + delay * 0.1 }}
        >
            <Card 
                onClick={() => onNavigate(card.path)} 
                className="group h-full flex flex-col p-6 rounded-2xl border-slate-200 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
            >
                <CardContent className="p-0 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <div className="flex items-start justify-between">
                            <div className={cn("text-3xl font-bold tracking-tighter", card.color)}>{card.stat}</div>
                            <card.icon className={cn("w-7 h-7 text-slate-400 group-hover:text-primary transition-colors", card.color)} />
                    </div>
                        <p className={cn("text-sm font-semibold", card.color)}>{card.statLabel}</p>

                        <h3 className="text-lg font-bold text-slate-800 mt-4">{card.title}</h3>
                        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                            {card.description}
                        </p>
                    </div>
                    <div className="mt-6">
                        <div className="flex items-center text-sm font-semibold text-primary">
                            <span>Consulter</span>
                            <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
    )
}


// --- MAIN PAGE COMPONENT ---
const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log('Logout');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Header 
        user={userProfile}
        menu={navMenu}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <WelcomeBanner user={userProfile} />

        <div className="mt-12">
            <motion.h3 
                className="text-2xl font-bold text-slate-800 tracking-tight"
                initial={{ opacity: 0, y:20 }}
                animate={{ opacity: 1, y:0 }}
                transition={{ duration: 0.5, delay: 0.2}}
            >
                Accès Rapide
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {actionCards.map((card, index) => (
                    <ActionCardComponent 
                        key={card.id} 
                        card={card} 
                        onNavigate={handleNavigation}
                        delay={index}
                    />
                ))}
            </div>
          </div>
      </main>
    </div>
  );
};

export default DashboardPage; 
