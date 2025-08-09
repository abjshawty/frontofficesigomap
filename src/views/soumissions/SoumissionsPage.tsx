import React, { useMemo, useState } from 'react';
import { Search, Filter, Download, Eye, ArrowLeft, Grid3X3, RotateCcw, ListFilter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const SoumissionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [refDac, setRefDac] = useState('');
  const [ministere, setMinistere] = useState('');
  const [autorite, setAutorite] = useState('');
  const [etape, setEtape] = useState('');
  const [nature, setNature] = useState('');
  const [natureDetail, setNatureDetail] = useState('');
  const [refOffre, setRefOffre] = useState('');
  const [visibleFilters, setVisibleFilters] = useState({ refDac: true, ministere: true, autorite: true, etape: true, nature: true, natureDetail: true, refOffre: true });

  const data = [
    { id: 'AO025073118403', ref: 'AO025073118403', objet: "AMENAGEMENT D'UN CENTRE DE SANTE", autorite: 'PROJET DOUMBIA', statut: 'Ouverte' },
  ];

  const filtered = useMemo(
    () => data.filter(d => (refDac ? d.ref.includes(refDac) : true) && (autorite ? d.autorite === autorite : true)),
    [refDac, autorite]
  );

  const handleReset = () => {
    setRefDac('');
    setMinistere('');
    setAutorite('');
    setEtape('');
    setNature('');
    setNatureDetail('');
    setRefOffre('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="h-16 bg-light-gray-1 border-b border-border flex items-center justify-between px-6 header">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => window.history.back()} className="border-border hover:bg-green-pastel"><ArrowLeft className="w-4 h-4 mr-2" />Retour</Button>
        </div>
        <div className="flex items-center gap-3"><Button variant="outline" size="sm" className="gap-2"><Download className="w-4 h-4" />Exporter</Button></div>
      </header>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8"><h1 className="text-2xl font-bold text-gray-900">Mes soumissions</h1></div>

        <Card className="rounded-2xl border-slate-200 shadow-sm mb-6">
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Filter className="w-5 h-5 text-primary" /><span>Filtres de recherche</span></CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" onSubmit={(e) => e.preventDefault()}>
              {visibleFilters.refDac && (
                <div>
                  <Label htmlFor="refdac">Référence du dossier d'appel à la concurrence</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" aria-hidden="true" />
                    <Input id="refdac" placeholder="Chercher" value={refDac} onChange={(e) => setRefDac(e.target.value)} className="pl-10" />
                  </div>
                </div>
              )}
              {visibleFilters.ministere && (
                <div>
                  <Label htmlFor="ministere">Ministère / Institution</Label>
                  <Select value={ministere} onValueChange={setMinistere}>
                    <SelectTrigger id="ministere" className="mt-1"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MEF">Ministère des Finances</SelectItem>
                      <SelectItem value="MS">Ministère de la Santé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {visibleFilters.autorite && (
                <div>
                  <Label htmlFor="autorite">Autorité contractante</Label>
                  <Select value={autorite} onValueChange={setAutorite}>
                    <SelectTrigger id="autorite" className="mt-1"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PROJET DOUMBIA">PROJET DOUMBIA</SelectItem>
                      <SelectItem value="AC-2">Autorité 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {visibleFilters.etape && (
                <div>
                  <Label htmlFor="etape">Étape de procédure</Label>
                  <Select value={etape} onValueChange={setEtape}>
                    <SelectTrigger id="etape" className="mt-1"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ouverte">Ouverte</SelectItem>
                      <SelectItem value="cloturee">Clôturée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {visibleFilters.nature && (
                <div>
                  <Label htmlFor="nature">Nature de marché</Label>
                  <Select value={nature} onValueChange={setNature}>
                    <SelectTrigger id="nature" className="mt-1"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="travaux">Travaux</SelectItem>
                      <SelectItem value="fournitures">Fournitures</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {visibleFilters.natureDetail && (
                <div>
                  <Label htmlFor="natureDetail">Détail de nature de marché</Label>
                  <Select value={natureDetail} onValueChange={setNatureDetail}>
                    <SelectTrigger id="natureDetail" className="mt-1"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="batiments">Bâtiments</SelectItem>
                      <SelectItem value="informatique">Informatique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {visibleFilters.refOffre && (
                <div>
                  <Label htmlFor="refOffre">Référence de l'offre</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" aria-hidden="true" />
                    <Input id="refOffre" placeholder="Chercher" value={refOffre} onChange={(e) => setRefOffre(e.target.value)} className="pl-10" />
                  </div>
                </div>
              )}

              <div className="flex items-end gap-2 col-span-full justify-end">
                <Button type="reset" variant="ghost" onClick={handleReset}><RotateCcw className="w-4 h-4 mr-2" />Réinitialiser</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button type="button" variant="outline"><ListFilter className="w-4 h-4 mr-2" />Choix des filtres</Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuLabel>Filtres visibles</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {Object.entries(visibleFilters).map(([key, val]) => (
                      <DropdownMenuCheckboxItem key={key} checked={val} onCheckedChange={(c) => setVisibleFilters((v) => ({ ...v, [key]: Boolean(c) }))}>
                        {key}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button type="submit" className="bg-primary hover:bg-primary/90">Rechercher</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Liste des opérations</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" aria-hidden="true" />
                <Input placeholder="Rechercher" className="pl-10 w-80 xl:w-96" aria-label="Rechercher dans la liste" />
              </div>
              <Button variant="outline"><Grid3X3 className="w-4 h-4 mr-2" />Choix des colonnes</Button>
              <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export Excel</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-light-gray-2 border-b border-border text-left">
                  <tr>
                    <th className="px-6 py-3 font-semibold">RÉFÉRENCE DE L'APPEL D'OFFRES</th>
                    <th className="px-6 py-3 font-semibold">OBJET DE L'APPEL D'OFFRES</th>
                    <th className="px-6 py-3 font-semibold">AUTORITÉ CONTRACTANTE</th>
                    <th className="px-6 py-3 font-semibold">STATUT</th>
                    <th className="px-6 py-3 font-semibold">ACCÈS AUX DÉTAILS</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id} className="border-b border-border">
                      <td className="px-6 py-3 font-mono text-xs">{row.ref}</td>
                      <td className="px-6 py-3">{row.objet}</td>
                      <td className="px-6 py-3">{row.autorite}</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">{row.statut}</span></td>
                      <td className="px-6 py-3"><Button size="sm" variant="outline" onClick={() => navigate(`/soumissions/details/${row.id}`)}><Eye className="w-4 h-4 mr-2" />Détails</Button></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground" aria-live="polite">Aucun élément</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SoumissionsPage;