import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, Check, Info } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { motion } from 'framer-motion';

import ImagePlaceholder from '../../components/ImagePlaceholder';

// --- HEADER COMPONENT ---
const Header: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
    return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/')}>
                <img src="/logo-sigomap.png" alt="Logo SIGOMAP" className="h-12 w-auto" />
                <div className="hidden sm:block">
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">SIGOMAP.GOUV.CI</h1>
                    <p className="text-xs text-slate-500 font-medium">Processus d'adhésion</p>
                </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('/login')}
              className="text-slate-600 font-medium hover:text-primary hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la connexion
            </Button>
          </div>
        </div>
      </header>
    );
  };

// --- MAIN PAGE COMPONENT ---
const AdhesionPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('ivoirien');
    const [ncc, setNcc] = useState('');
    const [dontKnowNcc, setDontKnowNcc] = useState(false);

    return (
    <div className="min-h-screen bg-slate-50">
      <Header onNavigate={navigate} />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Colonne de gauche: Image */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
               <ImagePlaceholder src="/View_of_the_Plateau,_Abidjan.jpg" alt="Vue du Plateau, Abidjan" />
            </motion.div>

            {/* Colonne de droite: Formulaire et informations */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                className="flex flex-col gap-8"
            >
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tighter">
                        Création de votre compte entreprise
                    </h2>
                    <p className="text-slate-500 mt-2">
                        Suivez les étapes ci-dessous pour rejoindre la plateforme SIGOMAP.
                    </p>
                </div>
          
          {/* Main Form */}
          <div className="space-y-8">
            <Card className="rounded-2xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">1. Sélectionnez votre type de compte</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedType} onValueChange={setSelectedType}>
                  <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                    <TabsTrigger value="ivoirien">Opérateur Ivoirien</TabsTrigger>
                    <TabsTrigger value="non-national">Non-national enregistré</TabsTrigger>
                    <TabsTrigger value="etranger">Opérateur Étranger</TabsTrigger>
                  </TabsList>
                  
                  <div className="bg-slate-100 p-4 rounded-lg mt-4 text-slate-600 text-sm">
                    <TabsContent value="ivoirien">
                        Pour les entreprises enregistrées en Côte d'Ivoire avec un numéro de compte contribuable.
                    </TabsContent>
                    <TabsContent value="non-national">
                        Pour les entreprises étrangères déjà enregistrées auprès des autorités ivoiriennes.
                    </TabsContent>
                    <TabsContent value="etranger">
                        Pour les entreprises étrangères non encore enregistrées.
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle>2. Vérifiez vos informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="ncc">Numéro de Compte Contribuable (NCC)</Label>
                        <Input
                            id="ncc"
                            value={ncc}
                            onChange={(e) => setNcc(e.target.value)}
                            placeholder="Saisissez votre NCC"
                            disabled={dontKnowNcc}
                            className="mt-1"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="dont-know-ncc"
                            checked={dontKnowNcc}
                            onChange={(e) => setDontKnowNcc(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/50"
                            aria-label="Je ne connais pas mon Numéro de Compte Contribuable"
                        />
                        <Label htmlFor="dont-know-ncc" className="text-sm font-normal">
                            Je ne connais pas mon NCC
                        </Label>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                        <Check className="w-4 h-4 mr-2" />
                        Confirmer et continuer
                    </Button>
                </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div>
            <div className="space-y-6">
                <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Info className="w-5 h-5 text-primary" />
                            <span>Parcours d'adhésion</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { title: "Durée de validation", description: "Le processus prend généralement 2-3 jours ouvrables." },
                            { title: "Modèle d'autorisation", description: "Téléchargez et complétez le modèle d'autorisation requis." },
                            { title: "Informations utilisateur", description: "Saisissez les informations du représentant de l'entreprise." },
                            { title: "Activation du compte", description: "Recevez les accès par email une fois la validation effectuée." }
                        ].map((step, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-slate-100 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                                {index + 1}
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 text-sm">{step.title}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                            </div>
                        </div>
                        ))}
                    </CardContent>
                </Card>
                <Button variant="outline" className="w-full bg-white">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le modèle d'autorisation
                </Button>
            </div>
          </div>
            </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdhesionPage;
