import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2,
  CheckCircle, 
  Shield, 
  Eye, 
  Download, 
  FileText, 
  Globe, 
  LogIn,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

// --- HEADER RESPONSIVE ---
const Header: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Publications', path: '/publications' },
    { label: 'Créer un compte entreprise', path: '/adhesion' },
    { label: 'marchespublics.ci', path: 'https://marchespublics.ci', external: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/')}>
              <img src="/logo-sigomap.png" alt="Logo SIGOMAP" className="h-12 w-auto" />
              <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-slate-800 tracking-tight">SIGOMAP.GOUV.CI</h1>
                  <p className="text-xs text-slate-500 font-medium">Plateforme des marchés publics</p>
              </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" onClick={() => onNavigate('/publications')} className="text-slate-600 font-medium hover:text-primary hover:bg-primary/10">Publications</Button>
            <Button variant="outline" onClick={() => onNavigate('/adhesion')} className="border-primary text-primary hover:bg-primary/10 hover:text-primary">Créer un compte</Button>
            <Button variant="ghost" className="text-slate-600 font-medium" onClick={() => window.open('https://marchespublics.ci', '_blank')}>
                <Globe className="w-4 h-4 mr-2" />marchespublics.ci
            </Button>
          </nav>
          
          {/* Bouton Hamburger pour Mobile */}
          <div className="md:hidden">
            <Button onClick={() => setIsMenuOpen(true)} variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-card p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-bold">Menu</h2>
                <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="icon">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="justify-start p-4 text-base"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (link.external) window.open(link.path, '_blank');
                      else onNavigate(link.path);
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- LOGIN PAGE COMPONENT ---
const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
  
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/dashboard');
      }, 1000);
    };
  
    return (
      <div className="min-h-screen bg-slate-50">
        <Header onNavigate={navigate} />
        <div className="w-full h-1 bg-gradient-to-r from-amber-400 to-primary"></div>
  
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Section */}
              <div className="bg-white p-6 md:p-8 border border-slate-200 rounded-2xl">
                <h2 className="text-2xl md:text-3xl font-medium text-slate-800 mb-4">
                  Le portail des marchés publics des opérateurs économiques
                </h2>
                <p className="text-slate-600 mb-6">
                  Bienvenue sur SIGOMAP, la plateforme officielle de gestion des marchés publics en Côte d'Ivoire. 
                  Accédez facilement aux opportunités d'affaires et gérez vos soumissions en ligne.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "Accès sécurisé", desc: "Connexion sécurisée à votre espace." },
                    { title: "Avis d'appels d'offres", desc: "Consultation des appels d'offres." },
                    { title: "Gestion des offres", desc: "Soumission et suivi de vos offres." },
                    { title: "Suivi des marchés", desc: "Gestion de vos marchés attribués." },
                  ].map(item => (
                    <div key={item.title} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-medium text-slate-800">{item.title}</h4>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How it works - RESTAURÉ */}
              <div className="bg-white p-6 md:p-8 border border-slate-200 rounded-2xl">
                <h3 className="text-xl md:text-2xl font-medium text-slate-800 mb-6">
                  Comment fonctionne l'espace entreprise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: Shield, title: "Connexion sécurisée", description: "Connectez-vous avec vos identifiants." },
                    { icon: Eye, title: "Visualisation des appels d'offres", description: "Consultez les avis et opportunités." },
                    { icon: Download, title: "Acquisition des dossiers", description: "Achetez et téléchargez les dossiers." },
                    { icon: FileText, title: "Soumission des offres", description: "Déposez vos offres et suivez leur traitement." }
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">{step.title}</h4>
                        <p className="text-sm text-slate-500">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
  
            {/* Login Panel */}
            <div className="lg:col-span-1">
              <Card className="sticky top-28 border-2 border-primary shadow-lg shadow-primary/20 rounded-2xl">
                <CardHeader className="bg-primary/10 text-primary-foreground rounded-t-2xl">
                  <CardTitle className="text-lg text-primary">Accès à votre espace</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    {showForgotPassword ? (
                    <div className="space-y-4">
                        <div><Label htmlFor="reset-email">Adresse email</Label><Input id="reset-email" type="email" placeholder="votre.email@entreprise.ci" className="mt-1"/></div>
                        <Button className="w-full bg-primary hover:bg-primary/90">Envoyer le lien</Button>
                        <Button variant="ghost" className="w-full" onClick={() => setShowForgotPassword(false)}>Retour à la connexion</Button>
                    </div>
                    ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div><Label htmlFor="username">Nom d'utilisateur</Label><Input id="username" type="text" placeholder="Nom d'utilisateur ou email" value={credentials.username} onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))} className="mt-1" /></div>
                        <div><Label htmlFor="password">Mot de passe</Label><Input id="password" type="password" placeholder="Mot de passe" value={credentials.password} onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))} className="mt-1" /></div>
                        <Button variant="link" className="text-primary p-0 h-auto text-xs" onClick={() => setShowForgotPassword(true)} type="button">Mot de passe oublié ?</Button>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
                            {isLoading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Connexion...</>) : (<><LogIn className="w-4 h-4 mr-2" />Se connecter</>)}
                        </Button>
                    </form>
                    )}
                </CardContent>
              </Card>

              {/* Nouveau sur SIGOMAP - RESTAURÉ */}
              <Card className="mt-6 border-slate-200 rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle className="text-base">Nouveau sur SIGOMAP ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4">
                    Si vous n'avez pas encore de compte, vous pouvez créer votre compte entreprise.
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/adhesion')}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Créer un compte entreprise
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
};
  
export default LoginPage;
