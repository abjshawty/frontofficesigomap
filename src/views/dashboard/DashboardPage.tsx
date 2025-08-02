import React, { useState } from 'react';
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
  Clock,
  AlertCircle,
  Award,
  Sparkles,
  Search,
  ChevronDown,
  Globe,
  Lock,
  HelpCircle,
  LogOut,
  Settings
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';

// Types pour les données
interface User {
  prenom: string;
  nom: string;
  email: string;
  role: string;
  entreprise: string;
  fonctions: string[];
  lastConnection?: string;
}

interface Statistic {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color: string;
  bg: string;
}

interface Fonctionnalite {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  module: string;
  subModule: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems: { id: string; label: string }[];
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [showSessionInfo, setShowSessionInfo] = useState(false);

  // Données de navigation
  const menuItems: MenuItem[] = [
    {
      id: 'marches',
      label: 'Marchés',
      icon: Building2,
      subItems: [
        { id: 'liste', label: 'Liste des marchés' },
        { id: 'nouveau', label: 'Détails des marchés' },
        { id: 'suivi', label: 'Exécution des marchés' }
      ]
    },
    {
      id: 'soumissions',
      label: 'Soumissions',
      icon: TrendingUp,
      subItems: [
        { id: 'liste', label: 'Mes soumissions' },
        { id: 'nouvelle', label: 'Nouvelle soumission' },
        { id: 'suivi', label: 'Suivi des offres' }
      ]
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: Activity,
      subItems: [
        { id: 'liste', label: 'Mes documents' },
        { id: 'upload', label: 'Upload document' },
        { id: 'templates', label: 'Templates' }
      ]
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Calendar,
      subItems: [
        { id: 'liste', label: 'Toutes les notifications' },
        { id: 'parametres', label: 'Paramètres' }
      ]
    }
  ];

  // Fonctions de navigation
  const onNavigate = (module: string, subModule?: string) => {
    setCurrentModule(module);
    console.log('Navigation:', module, subModule);
    
    // Navigation vers les pages SIGOMAP
    switch (module) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'account':
        if (subModule === 'create-user') {
          navigate('/account/create-user');
        } else if (subModule === 'users') {
          navigate('/account/users');
        } else if (subModule === 'acquisitions') {
          navigate('/account/acquisitions');
        }
        break;
      case 'operations':
        if (subModule === 'passation-plans') {
          navigate('/operations/passation-plans');
        } else if (subModule === 'general-plans') {
          navigate('/operations/general-plans');
        }
        break;
      case 'tenders':
        navigate('/tenders');
        break;
      case 'my-offers':
        if (subModule === 'invitations') {
          navigate('/my-offers/invitations');
        } else if (subModule === 'procedures') {
          navigate('/my-offers/procedures');
        }
        break;
      case 'my-markets':
        if (subModule === 'liste') {
          navigate('/my-markets');
        } else if (subModule === 'nouveau') {
          navigate('/my-markets/details');
        } else if (subModule === 'suivi') {
          navigate('/my-markets/execution');
        } else {
          navigate('/my-markets');
        }
        break;
      case 'admin':
        if (subModule === 'users') {
          navigate('/admin/users');
        } else if (subModule === 'settings') {
          navigate('/admin/settings');
        }
        break;
      case 'company':
        navigate('/company');
        break;
      case 'compte-entreprise':
        navigate('/company');
        break;
      case 'marches':
        if (subModule === 'liste') {
          navigate('/marches/liste');
        } else if (subModule === 'nouveau') {
          navigate('/marches/details');
        } else if (subModule === 'suivi') {
          navigate('/marches/execution');
        } else {
          navigate('/marches');
        }
        break;
      case 'soumissions':
        if (subModule === 'liste') {
          navigate('/soumissions/liste');
        } else if (subModule === 'nouvelle') {
          navigate('/soumissions/nouvelle');
        } else if (subModule === 'suivi') {
          navigate('/soumissions/suivi');
        } else {
          navigate('/soumissions');
        }
        break;
      case 'documents':
        if (subModule === 'liste') {
          navigate('/documents/liste');
        } else if (subModule === 'upload') {
          navigate('/documents/upload');
        } else if (subModule === 'templates') {
          navigate('/documents/templates');
        } else {
          navigate('/documents');
        }
        break;
      case 'notifications':
        if (subModule === 'liste') {
          navigate('/notifications/liste');
        } else if (subModule === 'parametres') {
          navigate('/notifications/parametres');
        } else {
          navigate('/notifications');
        }
        break;
      default:
        console.log('Module non reconnu:', module);
    }
  };

  const onLogout = () => {
    console.log('Déconnexion');
    // Redirection vers la page de login
    navigate('/login');
  };
  // Données simulées de l'utilisateur
  const user: User = {
    prenom: 'Jean',
    nom: 'Dupont',
    email: 'jean.dupont@entreprise.ci',
    role: 'Responsable Marchés Publics',
    entreprise: 'Entreprise ABC SARL',
    fonctions: ['Soumissionnaire', 'Consultant', 'Expert'],
    lastConnection: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  };

  // État pour la fonction active
  const [activeFonction, setActiveFonction] = useState(user.fonctions[0] || 'Soumissionnaire');

  // Statistiques d'activité
  const statistiques: Statistic[] = [
    {
      icon: Building2,
      value: '12',
      label: 'Marchés actifs',
      color: 'text-primary',
      bg: 'bg-green-pastel/20'
    },
    {
      icon: TrendingUp,
      value: '8',
      label: 'Offres soumises',
      color: 'text-chart-2',
      bg: 'bg-chart-2/10'
    },
    {
      icon: Activity,
      value: '3',
      label: 'En attente',
      color: 'text-chart-3',
      bg: 'bg-chart-3/10'
    },
    {
      icon: Calendar,
      value: '5',
      label: 'Échéances',
      color: 'text-chart-4',
      bg: 'bg-chart-4/10'
    }
  ];

  // Fonctionnalités principales
  const fonctionnalites: Fonctionnalite[] = [
    {
      id: 'gestion-compte',
      title: 'Gestion du Compte',
      description: 'Créez des utilisateurs, gérez la liste des utilisateurs et consultez les acquisitions réalisées.',
      buttonLabel: 'Gérer le compte',
      module: 'account',
      subModule: 'create-user',
      icon: User,
      color: 'from-emerald-600 to-emerald-700'
    },
    {
      id: 'operations-marche',
      title: 'Opérations de Marché',
      description: 'Consultez les plans de passation de marché et les opérations à venir.',
      buttonLabel: 'Voir les opérations',
      module: 'operations',
      subModule: 'passation-plans',
      icon: Building2,
      color: 'from-blue-600 to-blue-700'
    },
    {
      id: 'avis-offres',
      title: 'Avis d\'Appel d\'Offres',
      description: 'Consultez tous les avis d\'appel d\'offres publiés sur la plateforme.',
      buttonLabel: 'Voir les avis',
      module: 'tenders',
      subModule: 'list',
      icon: TrendingUp,
      color: 'from-purple-600 to-purple-700'
    },
    {
      id: 'mes-offres',
      title: 'Mes Offres',
      description: 'Gérez vos invitations restreintes et vos procédures en cours.',
      buttonLabel: 'Mes offres',
      module: 'my-offers',
      subModule: 'invitations',
      icon: Activity,
      color: 'from-orange-600 to-orange-700'
    },
    {
      id: 'mes-marches',
      title: 'Mes Marchés',
      description: 'Suivez l\'exécution de vos marchés attribués et consultez les documents contractuels.',
      buttonLabel: 'Mes marchés',
      module: 'my-markets',
      subModule: 'list',
      icon: Building2,
      color: 'from-green-600 to-green-700'
    },
    {
      id: 'administration',
      title: 'Administration',
      description: 'Accédez aux fonctionnalités d\'administration et de gestion des utilisateurs.',
      buttonLabel: 'Administration',
      module: 'admin',
      subModule: 'users',
      icon: User,
      color: 'from-gray-600 to-gray-700'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 bg-light-gray-1 border-b border-border flex items-center justify-between px-6 header">
        <div className="flex items-center gap-4 flex-1">
          {/* Logo et titre - Clickable pour retour dashboard */}
          <button 
            className="flex items-center gap-3 hover:bg-green-pastel/50 p-2 rounded-lg transition-colors duration-300 cursor-pointer"
            onClick={() => onNavigate('dashboard')}
            aria-label="Retour au tableau de bord"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">SIGOMAP.GOUV.CI</h1>
              <p className="text-xs text-muted-foreground">Système Intégré de Gestion des Opérations de Marchés Publics</p>
            </div>
          </button>

          {/* Barre de recherche */}
          <div className="relative flex-1 max-w-md ml-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              placeholder="Rechercher dans SIGOMAP..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md bg-light-gray-7 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary input transition-all duration-300"
              aria-label="Recherche globale"
            />
          </div>
        </div>

        {/* Navigation principale - Déclenchement au CLIC (pas hover) */}
        <nav className="flex items-center gap-2">
          {menuItems.map((item) => (
            <DropdownMenu key={item.id}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    currentModule === item.id 
                      ? 'bg-green-pastel text-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-green-pastel/50'
                  }`}
                  aria-label={`Menu ${item.label}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-white border-border">
                {item.subItems.map((subItem) => (
                  <DropdownMenuItem 
                    key={subItem.id}
                    onClick={() => onNavigate(item.id, subItem.id)}
                    className="text-sm hover:bg-green-pastel/30 cursor-pointer transition-colors duration-200 p-3"
                  >
                    {subItem.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        {/* Actions utilisateur */}
        <div className="flex items-center gap-3 ml-6">
          {/* Sélecteur de langue */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 border-border hover:bg-light-gray-3 transition-all duration-300"
                aria-label="Changer de langue"
              >
                <Globe className="w-4 h-4" />
                FR
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-border">
              <DropdownMenuItem className="hover:bg-green-pastel/30">🇫🇷 Français</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-green-pastel/30">🇬🇧 English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Informations de session */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSessionInfo(true)}
            className="text-primary border-primary/30 hover:bg-green-pastel/50 transition-all duration-300"
          >
            Informations de session
          </Button>

          {/* Menu utilisateur */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="gap-2 border-border hover:bg-light-gray-3 transition-all duration-300"
                aria-label="Menu utilisateur"
              >
                <User className="w-4 h-4" />
                MON COMPTE
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white border-border">
              <div className="px-3 py-3 border-b border-border bg-light-gray-7">
                <p className="font-semibold text-sm">{user.prenom} {user.nom}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <Badge variant="active" className="mt-1 text-xs">
                  {user.role}
                </Badge>
              </div>
              <DropdownMenuItem 
                onClick={() => onNavigate('compte-entreprise', 'informations')}
                className="hover:bg-green-pastel/30 p-3"
              >
                <Building2 className="w-4 h-4 mr-3" />
                Mon compte entreprise
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-green-pastel/30 p-3">
                <Lock className="w-4 h-4 mr-3" />
                Modifier mon mot de passe
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-green-pastel/30 p-3">
                <HelpCircle className="w-4 h-4 mr-3" />
                Centre d'aide
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem 
                onClick={onLogout} 
                className="text-destructive hover:bg-destructive/5 hover:text-destructive p-3"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Bandeau de bienvenue */}
      <motion.div 
        className="bg-gradient-to-r from-green-pastel via-green-pastel/80 to-green-pastel border border-border/30 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5 opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-chart-2 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              Bienvenue dans votre espace connecté
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Accédez rapidement à toutes vos fonctionnalités de gestion des marchés publics
            </p>
          </div>
          <div className="flex-shrink-0">
            <Badge variant="active" className="text-sm px-3 py-2">
              <User className="w-4 h-4 mr-2" />
              {user.role}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Informations de profil et statistiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-border/20">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                Informations du profil utilisateur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 md:p-8 bg-gradient-to-b from-almost-white to-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div className="p-4 bg-green-pastel/20 rounded-lg border border-border/30 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Nom complet</p>
                  <p className="font-semibold text-base md:text-lg leading-tight">{user.prenom} {user.nom}</p>
                </div>
                <div className="p-4 bg-light-gray-7 rounded-lg border border-border/30 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Adresse email</p>
                  <p className="font-semibold text-base md:text-lg leading-tight break-words">{user.email}</p>
                </div>
                <div className="p-4 bg-light-gray-7 rounded-lg border border-border/30 space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Rôle dans l'entreprise</p>
                  <Badge variant="success" className="text-sm px-3 py-1">
                    <Award className="w-4 h-4 mr-2" />
                    {user.role}
                  </Badge>
                </div>
                <div className="p-4 bg-green-pastel/20 rounded-lg border border-border/30 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Entreprise</p>
                  <div className="flex items-start gap-2">
                    <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="font-semibold text-base md:text-lg leading-tight">{user.entreprise}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-light-gray-7 to-light-gray-6 rounded-lg border border-border/30 space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Fonctions actives</p>
                <div className="flex flex-wrap gap-2">
                  {user.fonctions.map((fonction, index) => (
                    <Badge key={index} variant="outline" className="bg-white border border-border/50 text-foreground hover:bg-green-pastel/50 transition-colors duration-300 text-sm">
                      {fonction}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-border/20">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                Statistiques d'activité
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-b from-almost-white to-white">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-green-pastel/20 rounded-lg border border-border/30">
                  <span className="text-sm font-medium text-muted-foreground">Dernière connexion</span>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-semibold">
                      {user.lastConnection ? 
                        new Date(user.lastConnection).toLocaleDateString('fr-FR') :
                        'Aujourd\'hui'
                      }
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.lastConnection ? 
                        new Date(user.lastConnection).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) :
                        new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                      }
                    </p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-border/30">
                  <div className="grid grid-cols-2 gap-3">
                    {statistiques.map((stat, index) => (
                      <motion.div 
                        key={index} 
                        className={`text-center p-3 ${stat.bg} rounded-lg border border-border/30 hover:scale-105 transition-all duration-300 cursor-pointer group`}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <div className="flex items-center justify-center mb-2">
                          <stat.icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                        <p className={`text-lg font-bold ${stat.color} leading-tight`}>{stat.value}</p>
                        <p className="text-xs text-muted-foreground font-medium leading-tight">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Grille des fonctionnalités principales */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Accès rapide aux fonctionnalités
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fonctionnalites.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="h-full"
            >
              <Card className="transition-all duration-500 cursor-pointer group border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <CardContent className="p-6 relative h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300 text-base leading-tight line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 h-10"
                      onClick={() => onNavigate(item.module, item.subModule)}
                      aria-label={`Accéder à ${item.title}`}
                    >
                      <span className="flex items-center justify-center gap-2 text-sm font-medium">
                        {item.buttonLabel}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section d'informations récentes */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className="border border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-border/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Notifications récentes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-b from-almost-white to-white">
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-pastel/30 to-green-pastel/10 rounded-xl border border-border/30 group transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-semibold">Nouvel AAO disponible</p>
                      <Badge variant="success" className="text-xs">Nouveau</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Acquisition de véhicules administratifs - MEF</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Il y a 2 heures
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-light-gray-7 to-light-gray-6 rounded-xl border border-border/30 group transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-3 h-3 bg-chart-2 rounded-full mt-2 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-semibold">Offre soumise avec succès</p>
                      <Badge variant="info" className="text-xs">Confirmé</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Votre offre pour le marché TRV-2024-001 a été reçue</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Hier à 14:30
                    </p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Card className="border border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-border/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Échéances importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-b from-almost-white to-white">
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center gap-3 p-4 border border-destructive/20 bg-gradient-to-r from-destructive/5 to-destructive/10 rounded-xl group transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-semibold">Date limite de soumission</p>
                      <Badge variant="destructive" className="text-xs">Urgent</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Marché TRV-2024-002</p>
                    <p className="text-sm text-destructive font-bold">Dans 3 jours</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3 p-4 border border-primary/20 bg-gradient-to-r from-green-pastel/30 to-green-pastel/10 rounded-xl group transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-semibold">Ouverture des plis</p>
                      <Badge variant="info" className="text-xs">Planifié</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Marché BTP-2024-005</p>
                    <p className="text-sm text-primary font-bold">Le 15 janvier 2025</p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modale des informations de session */}
      <Dialog open={showSessionInfo} onOpenChange={setShowSessionInfo}>
        <DialogContent className="max-w-md bg-white border-border">
          <DialogHeader>
            <DialogTitle>Mes informations de session</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Fonction active */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Fonction active</h4>
              <Card className="border border-border bg-light-gray-7">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{activeFonction}</p>
                      <p className="text-xs text-muted-foreground">{user.entreprise}</p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3 border-border hover:bg-light-gray-3"
                      >
                        Changer de fonction
                        <ChevronDown className="w-3 h-3 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-white border-border">
                      {user.fonctions.map((fonction) => (
                        <DropdownMenuItem 
                          key={fonction}
                          onClick={() => setActiveFonction(fonction)}
                          className="hover:bg-green-pastel/30"
                        >
                          {fonction}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </div>

            {/* Outils de développement */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Outils pour le développement</h4>
              <Button 
                variant="outline" 
                className="w-full border-border hover:bg-light-gray-3"
              >
                <Settings className="w-4 h-4 mr-2" />
                Outils de diagnostic
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default DashboardPage; 