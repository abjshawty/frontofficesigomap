import React, { useState } from 'react';
import { Building2, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';

const AdhesionPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState('ivoirien');
  const [ncc, setNcc] = useState('');
  const [dontKnowNcc, setDontKnowNcc] = useState(false);

  const onBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header simplifié */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-medium text-foreground">SIGOMAP</h1>
                <p className="text-xs text-muted-foreground">Processus d'adhésion</p>
              </div>
            </div>
            <Button variant="outline" onClick={onBack} className="border-border hover:bg-green-pastel">
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Fil d'ariane */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Processus d'adhésion &gt; Adhésion d'un contribuable
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-border">
              <CardHeader className="bg-light-gray-1 border-b border-border">
                <CardTitle>Sélection du type d'opérateur</CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-almost-white">
                <Tabs value={selectedType} onValueChange={setSelectedType}>
                  <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                    <TabsTrigger value="ivoirien">Opérateurs ivoiriens</TabsTrigger>
                    <TabsTrigger value="non-national">Non nationaux enregistrés</TabsTrigger>
                    <TabsTrigger value="etranger">Opérateurs étrangers</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ivoirien" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Opérateurs économiques ivoiriens</h3>
                      <p className="text-sm text-muted-foreground">
                        Pour les entreprises enregistrées en Côte d'Ivoire avec un numéro de compte contribuable.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="non-national" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Opérateurs non nationaux déjà enregistrés</h3>
                      <p className="text-sm text-muted-foreground">
                        Pour les entreprises étrangères déjà enregistrées auprès des autorités ivoiriennes.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="etranger" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Opérateurs économiques étrangers</h3>
                      <p className="text-sm text-muted-foreground">
                        Pour les entreprises étrangères non encore enregistrées.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader className="bg-light-gray-1 border-b border-border">
                <CardTitle>Vérification des informations</CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-almost-white space-y-4">
                <div>
                  <Label htmlFor="ncc">Numéro de compte contribuable (NCC)</Label>
                  <Input
                    id="ncc"
                    value={ncc}
                    onChange={(e) => setNcc(e.target.value)}
                    placeholder="Saisissez votre NCC"
                    disabled={dontKnowNcc}
                    className="mt-1 bg-light-gray-7 border-border"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="dont-know-ncc"
                    checked={dontKnowNcc}
                    onChange={(e) => setDontKnowNcc(e.target.checked)}
                    className="w-4 h-4 border-border"
                    aria-label="Je ne connais pas mon NCC"
                  />
                  <Label htmlFor="dont-know-ncc" className="text-sm">
                    Je ne connais pas mon NCC
                  </Label>
                </div>
                
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Confirmer
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Panneau d'information */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border border-border">
              <CardHeader className="bg-light-gray-1 border-b border-border">
                <CardTitle className="text-lg">Le parcours d'adhésion</CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-almost-white space-y-6">
                {[
                  {
                    number: "1",
                    title: "Durée de validation",
                    description: "Le processus de validation prend généralement 2-3 jours ouvrables"
                  },
                  {
                    number: "2",
                    title: "Modèle d'autorisation",
                    description: "Téléchargez et complétez le modèle d'autorisation requis"
                  },
                  {
                    number: "3",
                    title: "Informations de l'utilisateur",
                    description: "Saisissez les informations du représentant de l'entreprise"
                  },
                  {
                    number: "4",
                    title: "Activation du compte",
                    description: "Recevez les accès par email une fois la validation effectuée"
                  }
                ].map((step) => (
                  <div key={step.number} className="flex gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{step.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4 border-border hover:bg-green-pastel">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le modèle d'autorisation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdhesionPage; 