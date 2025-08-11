import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, Check, Info } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
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
      const [email, setEmail] = useState('');
      const [confirmEmail, setConfirmEmail] = useState('');
      const [otpCode, setOtpCode] = useState('');
      const [isOtpOpen, setIsOtpOpen] = useState(false);
      const [showToast, setShowToast] = useState(false);

      const isEmailMode = selectedType === 'etranger';
      const isContinueDisabled = isEmailMode
        ? email.trim() === '' || confirmEmail.trim() === '' || email.trim() !== confirmEmail.trim()
        : !dontKnowNcc && ncc.trim() === '';

      const handleConfirm = () => {
        if (isEmailMode) {
          setIsOtpOpen(true);
          setShowToast(true);
          // Masquer automatiquement le toast après 4 secondes
          window.setTimeout(() => setShowToast(false), 4000);
        } else {
          // TODO: logiques futures pour les autres types
        }
      };

    return (
    <div className="min-h-screen bg-slate-50">
      {showToast && (
        <div className="fixed top-3 left-1/2 z-[60] -translate-x-1/2 rounded-md bg-emerald-600 text-white px-4 py-2 shadow-lg">
          L'email a bien été envoyé
        </div>
      )}
      <Header onNavigate={navigate} />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Colonne de gauche: Image */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
               <ImagePlaceholder
                 src="/View_of_the_Plateau,_Abidjan.jpg"
                 alt="Vue du Plateau, Abidjan"
                 className="lg:h-[640px]"
               />
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
                    {isEmailMode ? (
                      <>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Saisir votre email"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirm-email">Email</Label>
                          <Input
                            id="confirm-email"
                            type="email"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            placeholder="Confirmer votre email"
                            className="mt-1"
                          />
                        </div>
                        {email && confirmEmail && email !== confirmEmail && (
                          <p className="text-sm text-red-600">Les emails ne correspondent pas.</p>
                        )}
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                    <Button className="w-full bg-primary hover:bg-primary/90" disabled={isContinueDisabled} onClick={handleConfirm}>
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

      {/* Dialog OTP */}
      <Dialog open={isOtpOpen} onOpenChange={setIsOtpOpen}>
        <DialogContent className="max-w-xl w-[95vw]">
          <DialogHeader>
            <DialogTitle>Confirmation de l'email par code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-slate-600">
            <p className="text-sm">
              Le système vient de vous transmettre un code à usage unique à l'adresse mail que vous venez de renseigner.
              Merci de saisir le code ci‑dessous afin de poursuivre votre action. Ce code a une durée de validité limitée.
            </p>
            <div>
              <Label htmlFor="otpEmail">Email</Label>
              <Input id="otpEmail" type="email" value={email} readOnly className="mt-1 bg-slate-100" />
            </div>
            <div>
              <Label htmlFor="otpCode">Code à usage unique (*)</Label>
              <Input
                id="otpCode"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Saisir le code"
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowToast(true)}>
                Générer un nouveau code
              </Button>
              <Button disabled={otpCode.trim() === ''} className="bg-primary hover:bg-primary/90">
                Confirmer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdhesionPage;
