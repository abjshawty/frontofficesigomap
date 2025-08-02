import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { UserPlusIcon, UsersIcon, ShoppingCartIcon, Building2, ArrowLeft, Sparkles } from 'lucide-react';

const CreateUserPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Simulation d'envoi d'email
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage('Un email a été envoyé à l\'utilisateur avec les informations de connexion.');
      setEmail('');
    } catch (error) {
      setMessage('Erreur lors de l\'envoi de l\'email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec navigation */}
      <header className="h-16 bg-light-gray-1 border-b border-border flex items-center justify-between px-6 header">
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard"
            className="flex items-center gap-3 hover:bg-green-pastel/50 p-2 rounded-lg transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Retour au dashboard</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">SIGOMAP.GOUV.CI</h1>
            <p className="text-xs text-muted-foreground">Gestion du Compte</p>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Bandeau de titre */}
        <motion.div 
          className="bg-gradient-to-r from-green-pastel via-green-pastel/80 to-green-pastel border border-border/30 rounded-2xl p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5 opacity-50"></div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-chart-2 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">Créer un utilisateur</h2>
              <p className="text-muted-foreground text-base">
                Ajoutez de nouveaux utilisateurs à votre compte entreprise
              </p>
            </div>
            <Badge variant="active" className="text-sm px-3 py-2">
              <UserPlusIcon className="w-4 h-4 mr-2" />
              Gestion du Compte
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire principal */}
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
                    <UserPlusIcon className="w-5 h-5 text-primary" />
                  </div>
                  Nouvel utilisateur
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8 bg-gradient-to-b from-almost-white to-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                      Adresse email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemple@entreprise.ci"
                      required
                      className="w-full border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                    />
                    <p className="text-sm text-muted-foreground">
                      L'utilisateur recevra un email avec les informations pour se connecter à la plateforme.
                    </p>
                  </div>

                  {message && (
                    <motion.div 
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        message.includes('Erreur') 
                          ? 'bg-destructive/5 text-destructive border-destructive/20' 
                          : 'bg-green-pastel/20 text-primary border-primary/20'
                      }`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {message}
                    </motion.div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isLoading || !email}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 h-12 text-base font-medium"
                  >
                    {isLoading ? 'Envoi en cours...' : 'Créer l\'utilisateur'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Informations et navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Information */}
            <Card className="border border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-border/20">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-gradient-to-b from-almost-white to-white">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cette fonctionnalité permet à l'utilisateur principal de créer de nouveaux utilisateurs. 
                  Il suffit de renseigner l'adresse email du nouvel utilisateur. 
                  Il recevra ensuite un mail lui donnant les informations pour se connecter à la plateforme.
                </p>
              </CardContent>
            </Card>

            {/* Navigation rapide */}
            <Card className="border border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-border/20">
                <CardTitle className="text-lg">Navigation rapide</CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-gradient-to-b from-almost-white to-white">
                <div className="space-y-4">
                  <Link 
                    to="/account/users"
                    className="flex items-center gap-3 p-4 bg-green-pastel/20 rounded-lg border border-border/30 hover:bg-green-pastel/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <UsersIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Liste des utilisateurs</h4>
                      <p className="text-sm text-muted-foreground">Consulter tous les utilisateurs</p>
                    </div>
                  </Link>

                  <Link 
                    to="/account/acquisitions"
                    className="flex items-center gap-3 p-4 bg-light-gray-7 rounded-lg border border-border/30 hover:bg-green-pastel/20 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-chart-2/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ShoppingCartIcon className="w-5 h-5 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Acquisitions réalisées</h4>
                      <p className="text-sm text-muted-foreground">Voir les acquisitions</p>
                    </div>
                  </Link>

                  <Link 
                    to="/dashboard"
                    className="flex items-center gap-3 p-4 bg-light-gray-7 rounded-lg border border-border/30 hover:bg-green-pastel/20 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Retour au dashboard</h4>
                      <p className="text-sm text-muted-foreground">Accueil SIGOMAP</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage; 