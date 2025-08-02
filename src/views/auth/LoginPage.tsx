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
  LogIn
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [, setCurrentView] = useState<'publications' | 'adhesion'>('publications');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Accès direct au dashboard sans validation (prototype)
    setTimeout(() => {
      setIsLoading(false);
      // Redirection directe vers le dashboard
      navigate('/dashboard');
    }, 1000); // Réduit à 1 seconde pour un accès plus rapide
  };



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-medium text-foreground">SIGOMAP</h1>
                <p className="text-xs text-muted-foreground">Marchés Publics de Côte d'Ivoire</p>
              </div>
            </div>
            
            <nav className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/publications')}
                className="text-muted-foreground hover:text-foreground"
              >
                Publications
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/adhesion')}
                className="border-primary text-primary hover:bg-accent"
              >
                Créez votre compte entreprise
              </Button>
              <Button
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                onClick={() => window.open('https://marchespublics.ci', '_blank')}
              >
                <Globe className="w-4 h-4 mr-2" />
                marchespublics.ci
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-card p-8 border border-border rounded-xl">
              <h2 className="text-3xl font-medium text-foreground mb-4">
                Le portail des marchés publics des opérateurs économiques
              </h2>
              <p className="text-muted-foreground mb-6">
                Bienvenue sur SIGOMAP, la plateforme officielle de gestion des marchés publics en Côte d'Ivoire. 
                Accédez facilement aux opportunités d'affaires et gérez vos soumissions en ligne.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Accès sécurisé</h4>
                    <p className="text-sm text-muted-foreground">Connexion sécurisée à votre espace contractant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Avis d'appels d'offres</h4>
                    <p className="text-sm text-muted-foreground">Consultation des appels d'offres en temps réel</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Gestion des offres</h4>
                    <p className="text-sm text-muted-foreground">Soumission et suivi de vos offres</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Suivi des marchés</h4>
                    <p className="text-sm text-muted-foreground">Gestion complète de vos marchés attribués</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment fonctionne l'espace entreprise */}
            <div className="bg-card p-8 border border-border rounded-xl">
              <h3 className="text-[24px] font-medium text-foreground mb-6">
                Comment fonctionne l'espace entreprise
              </h3>
              <p className="text-muted-foreground mb-8">
                Découvrez les étapes simples pour accéder aux opportunités de marchés publics
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    number: "1",
                    title: "Connexion sécurisée",
                    description: "Connectez-vous avec vos identifiants d'entreprise",
                    icon: Shield
                  },
                  {
                    number: "2", 
                    title: "Visualisation des appels d'offres",
                    description: "Consultez les avis et opportunités disponibles",
                    icon: Eye
                  },
                  {
                    number: "3",
                    title: "Acquisition des dossiers",
                    description: "Achetez et téléchargez les dossiers d'appel à la concurrence",
                    icon: Download
                  },
                  {
                    number: "4",
                    title: "Soumission des offres",
                    description: "Déposez vos offres et suivez leur traitement",
                    icon: FileText
                  }
                ].map((step) => (
                  <div key={step.number} className="flex items-start gap-4 p-4 border border-border">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <step.icon className="w-4 h-4 text-primary" />
                        <h4 className="font-medium text-foreground">{step.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panneau de connexion */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border border-border">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="text-lg">
                  Accès à votre espace contractant
                </CardTitle>
                <p className="text-primary-foreground/80 text-sm">
                  Pour accéder à votre espace contractant, veuillez-vous connecter ici
                </p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">


                {showForgotPassword ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reset-email">Adresse email</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="votre.email@entreprise.ci"
                        className="mt-1 bg-input-background border-border"
                      />
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Envoyer le lien de réinitialisation
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      Retour à la connexion
                    </Button>
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="username">Votre nom d'utilisateur</Label>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Nom d'utilisateur ou email"
                          value={credentials.username}
                          onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                          className="mt-1 bg-input-background border-border"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="password">Votre mot de passe</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Mot de passe"
                          value={credentials.password}
                          onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                          className="mt-1 bg-input-background border-border"
                          required
                        />
                      </div>
                      
                      <Button 
                        variant="link" 
                        className="text-primary p-0 h-auto text-xs w-full whitespace-normal break-words"
                        onClick={() => setShowForgotPassword(true)}
                        type="button"
                      >
                        Mot de passe oublié / réinitialisation du mot de passe
                      </Button>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin mr-2" />
                            Connexion en cours...
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-2" />
                            Connexion (Prototype)
                          </>
                        )}
                      </Button>
                      
                      {/* Bouton d'accès rapide pour le prototype */}
                      <Button 
                        type="button"
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary/10"
                        onClick={() => navigate('/dashboard')}
                      >
                        🚀 Accès direct au Dashboard (Prototype)
                      </Button>
                    </form>

                    
                  </>
                )}
              </CardContent>
            </Card>

            {/* Information supplémentaire */}
            <Card className="mt-6 border border-border">
              <CardHeader className="bg-light-gray-1">
                <CardTitle className="text-base">Nouveau sur SIGOMAP ?</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Si vous n'avez pas encore de compte, vous pouvez créer votre compte entreprise.
                </p>
                <Button 
                  variant="outline"
                  className="w-full border-border hover:bg-green-pastel"
                  onClick={() => setCurrentView('adhesion')}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Créer un compte entreprise
                </Button>
                
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Besoin d'aide ? Consultez nos{' '}
                    <Button variant="link" className="text-primary p-0 h-auto text-xs">
                      guides utilisateur
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage; 