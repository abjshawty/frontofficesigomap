import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { ArrowLeft, Download, RefreshCw, XCircle } from 'lucide-react';


const mockUser = {
  id: 1, 
  name: 'Jean Dupont', 
  email: 'jean.dupont@example.com', 
  status: 'active',
  role: 'Administrateur',
  lastLogin: '21/07/2025 11:53',
  createdAt: '15/01/2024',
  permissions: ['Gestion des utilisateurs', 'Administration système', 'Lecture des rapports'],
  functions: [
    { id: 'f1', name: 'EMA_ADMIN - Administrateur du compte Espace Entreprise', date: '21/07/2025 11:53' },
  ]
};

const UserDetailPage: React.FC = () => {
  const { userId: _userId } = useParams<{ userId: string }>();

  // Dans une vraie application, vous feriez un appel API ici avec userId
  const user = mockUser; 

  const fonctionsDisponibles = [
    { id: '1', libelle: 'Administrateur du compte Espace Entreprise' },
    { id: '2', libelle: 'Gestionnaire utilisateurs' },
    { id: '3', libelle: 'Lecteur rapports' },
  ];
  const [fonction, setFonction] = useState('');

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4">
        <Link to="/admin/users">
          <Button variant="outline" className="border-border hover:bg-green-pastel"><ArrowLeft className="w-4 h-4 mr-2" />Retour à la liste</Button>
        </Link>
        <h2 className="text-xl font-bold text-gray-900">Détail d'un utilisateur</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-2xl border-slate-200">
            <CardHeader className="bg-light-gray-1 border-b border-border"><CardTitle>INFORMATIONS CLÉS</CardTitle></CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><p className="text-muted-foreground">Nom</p><p className="font-medium">{user.name.split(' ')[1]}</p></div>
                <div><p className="text-muted-foreground">Prénom</p><p className="font-medium">{user.name.split(' ')[0]}</p></div>
                <div><p className="text-muted-foreground">Email</p><p className="font-medium">{user.email}</p></div>
                <div>
                  <p className="text-muted-foreground">Statut</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className={`text-sm ${user.status === 'active' ? 'text-green-700' : 'text-red-700'}`}>Utilisateur {user.status === 'active' ? 'actif' : 'inactif'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200">
            <CardHeader className="bg-light-gray-1 border-b border-border"><CardTitle>Nouvelle fonction</CardTitle></CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">Ajouter la fonction de votre choix à cet utilisateur</p>
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="md:col-span-2">
                  <Label htmlFor="fonction">Fonction *</Label>
                  <Select value={fonction} onValueChange={setFonction}>
                    <SelectTrigger id="fonction" className="mt-1"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      {fonctionsDisponibles.map((f) => (<SelectItem key={f.id} value={f.id}>{f.libelle}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end justify-end">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">Confirmer</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200">
            <CardHeader className="bg-light-gray-1 border-b border-border"><CardTitle>Liste des fonctions de cet utilisateur</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 border-b">
                <div><Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Export Excel</Button></div>
                <div className="relative"><Input placeholder="Rechercher..." className="w-72" /></div>
              </div>
              <Table>
                <TableHeader><TableRow><TableHead>RÉFÉRENCE</TableHead><TableHead>LIBELLÉ</TableHead><TableHead>STATUT</TableHead><TableHead>DATE DÉBUT</TableHead><TableHead>DATE DE FIN</TableHead><TableHead>ACCÈS AUX DÉTAILS</TableHead></TableRow></TableHeader>
                <TableBody>
                  {user.functions.map((fonction) => (
                    <TableRow key={fonction.id}>
                      <TableCell className="font-mono text-sm">{fonction.id}</TableCell>
                      <TableCell>{fonction.name}</TableCell>
                      <TableCell><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Valide</span></TableCell>
                      <TableCell>{fonction.date.split(' ')[0]}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell><Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50"><XCircle className="w-4 h-4 mr-2" />Désactiver</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader><CardTitle className="text-lg">Actions rapides</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full"><RefreshCw className="w-4 h-4 mr-2" />Réinitialiser le mot de passe</Button>
              <div className="pt-4 border-t text-sm">
                <p className="flex justify-between"><span className="text-muted-foreground">Dernière connexion:</span><span className="font-medium">{user.lastLogin}</span></p>
                <p className="flex justify-between"><span className="text-muted-foreground">Fonctions:</span><span className="font-medium">{user.functions.length}</span></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;