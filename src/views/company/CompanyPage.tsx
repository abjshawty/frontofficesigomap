import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Upload } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

const CompanyPage: React.FC = () => {
  const navigate = useNavigate();
  const [subModule] = useState<string | null>(null);
  
  // Données simulées de l'utilisateur
  const user = {
    entreprise: 'Exemple SARL',
    prenom: 'Jean',
    nom: 'Dupont',
    email: 'jean.dupont@exemple.ci'
  };

  const handleGoBack = () => {
    // Retour vers la page précédente ou vers le dashboard
    navigate(-1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={handleGoBack} className="border-border hover:bg-green-pastel">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Mon Compte Entreprise</h1>
      </div>

      {(subModule === 'informations' || !subModule) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Informations Générales</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-almost-white space-y-4">
              <div className="p-4 bg-green-pastel/20 rounded-lg">
                <p className="text-sm text-muted-foreground">Nom de l'entreprise</p>
                <p className="font-semibold text-lg">{user.entreprise}</p>
              </div>
              <div className="p-4 bg-light-gray-7 rounded-lg">
                <p className="text-sm text-muted-foreground">Utilisateur référent</p>
                <p className="font-semibold">{user.prenom} {user.nom}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="outline" className="w-full border-border hover:bg-green-pastel">
                Modifier les informations
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Pièces Justificatives</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-almost-white">
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Documents Légaux</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Gérez vos documents et pièces justificatives.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Upload className="w-4 h-4 mr-2" />
                  Ajouter un document
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {subModule === 'documents' && (
        <Card className="border-border bg-white">
          <CardHeader className="bg-light-gray-1 border-b border-border">
            <CardTitle>Gestion des Documents</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-almost-white">
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Centre Documentaire</h3>
              <p className="text-muted-foreground">
                Gérez tous vos documents et pièces justificatives en un seul endroit.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyPage;