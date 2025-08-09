import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, RotateCcw, ChevronRight, ListFilter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
// import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';

// Helpers non nécessaires ici (présents sur la page de détail)

// --- TYPES ---
interface OperationListItem {
    ref: string;
    objet: string;
    autorite: string;
    mode: string;
    nature: string;
    detail: string;
}

// Les détails sont gérés sur la page dédiée

// --- MOCK DATA ---
const operations: OperationListItem[] = [
    { ref: 'PSL25080430452', objet: 'TEST CRITERES', autorite: 'AEPE', mode: 'Procédure simplifiée à compétition limitée', nature: 'Fournitures', detail: 'Fournitures informatiques' },
    { ref: 'PSL25080430451', objet: 'TEST CRITERES', autorite: 'AEPE', mode: 'Procédure simplifiée à compétition limitée', nature: 'Travaux', detail: 'Route' },
    { ref: 'AOO25080430450', objet: 'CONSTRUCTION DU BATIMENT ANNEXE DU PRRI', autorite: 'Projet de Renforcement des Routes...', mode: 'Appel d\'offres ouvert', nature: 'Travaux', detail: 'Construction et rehabilitation' },
    { ref: 'PSL25073130436', objet: 'ENTRETIENT DES LOCAUX DU PALAIS', autorite: 'PROJET TEST WONNAN', mode: 'Procédure simplifiée à compétition ouverte', nature: 'Prestation de ser...', detail: 'Entretiens espaces verts et locaux' },
    { ref: 'CAC25073130441', objet: 'CONSTRUCTION DE LA CLOTURE DU PALAIS', autorite: 'PROJET TEST WONNAN', mode: 'Gré à gré', nature: 'Travaux', detail: 'Construction et rehabilitation' },
    { ref: 'PIAOR25073130445', objet: 'Recrutement du personnelle de laboratoire', autorite: 'projet DRAD 2025', mode: 'Prestations intellectuelles avec autorisation...', nature: 'Prestation intellec...', detail: 'Prestation intellectuelle' },
    { ref: 'AOR25073130438', objet: 'Acquisition de Borne Electrique', autorite: 'projet DRAD 2025', mode: 'Appel d\'offres restreint', nature: 'Fournitures', detail: 'Fourniture d\'équipements' },
    { ref: 'AORAP25073130439', objet: 'Achat de Carburant', autorite: 'projet DRAD 2025', mode: 'Appel d\'offres restreint sans autorisation pr...', nature: 'Fournitures', detail: 'Fourniture de carburant' },
];

// (Suppression du code de détail; la navigation envoie vers la page dédiée)

const PassationPlansPage: React.FC = () => {
    const navigate = useNavigate();
    const [ministere, setMinistere] = React.useState<string>('');
    const [autorite, setAutorite] = React.useState<string>('');
    const [mode, setMode] = React.useState<string>('');
    const [nature, setNature] = React.useState<string>('');
    const [search, setSearch] = React.useState<string>('');

    const filtered = React.useMemo(() => {
        return operations.filter(op => {
            const matchMinistere = ministere ? op.autorite.toLowerCase().includes(ministere.toLowerCase()) : true;
            const matchAutorite = autorite ? op.autorite.toLowerCase().includes(autorite.toLowerCase()) : true;
            const matchMode = mode ? op.mode.toLowerCase().includes(mode.toLowerCase()) : true;
            const matchNature = nature ? op.nature.toLowerCase().includes(nature.toLowerCase()) : true;
            const query = search.trim().toLowerCase();
            const matchSearch = query
                ? [op.ref, op.objet, op.autorite, op.mode, op.nature, op.detail].some(v => v.toLowerCase().includes(query))
                : true;
            return matchMinistere && matchAutorite && matchMode && matchNature && matchSearch;
        });
    }, [ministere, autorite, mode, nature, search]);

    const resetFilters = () => {
        setMinistere('');
        setAutorite('');
        setMode('');
        setNature('');
        setSearch('');
    };

    return (
    <>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card className="rounded-2xl border-slate-200 shadow-sm mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Filter className="w-5 h-5 text-primary" />
                        <span>Filtres de recherche</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <Label htmlFor="ministere">Ministère / Institution</Label>
                        <Select value={ministere} onValueChange={setMinistere}>
                            <SelectTrigger id="ministere" className="mt-1"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">Tous</SelectItem>
                                <SelectItem value="AEPE">AEPE</SelectItem>
                                <SelectItem value="PRRI">PRRI</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="autorite">Autorité contractante</Label>
                        <Select value={autorite} onValueChange={setAutorite}>
                            <SelectTrigger id="autorite" className="mt-1"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">Toutes</SelectItem>
                                <SelectItem value="AEPE">AEPE</SelectItem>
                                <SelectItem value="PROJET TEST WONNAN">PROJET TEST WONNAN</SelectItem>
                                <SelectItem value="projet DRAD 2025">projet DRAD 2025</SelectItem>
                                <SelectItem value="Projet de Renforcement des Routes">Projet de Renforcement des Routes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="mode">Mode de passation</Label>
                        <Select value={mode} onValueChange={setMode}>
                            <SelectTrigger id="mode" className="mt-1"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">Tous</SelectItem>
                                <SelectItem value="Appel d'offres ouvert">Appel d'offres ouvert</SelectItem>
                                <SelectItem value="Appel d'offres restreint">Appel d'offres restreint</SelectItem>
                                <SelectItem value="Procédure simplifiée">Procédure simplifiée</SelectItem>
                                <SelectItem value="Gré à gré">Gré à gré</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="nature">Nature de marché</Label>
                        <Select value={nature} onValueChange={setNature}>
                            <SelectTrigger id="nature" className="mt-1"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">Toutes</SelectItem>
                                <SelectItem value="Fournitures">Fournitures</SelectItem>
                                <SelectItem value="Travaux">Travaux</SelectItem>
                                <SelectItem value="Prestation">Prestation</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-end gap-2 col-span-full justify-end">
                        <Button variant="ghost" onClick={resetFilters}><RotateCcw className="w-4 h-4 mr-2" />Réinitialiser</Button>
                        <Button className="bg-primary hover:bg-primary/90" onClick={() => { /* noop: filtrage live */ }}><Search className="w-4 h-4 mr-2" />Rechercher</Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Liste des opérations</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                              placeholder="Rechercher dans la liste..."
                              className="pl-10 w-64"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button variant="outline"><ListFilter className="w-4 h-4 mr-2" />Choix des colonnes</Button>
                        <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export Excel</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Référence</TableHead>
                                    <TableHead>Objet de l'opération</TableHead>
                                    <TableHead>Autorité Contractante</TableHead>
                                    <TableHead>Mode de Passation</TableHead>
                                    <TableHead>Nature</TableHead>
                                    <TableHead>Détail</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                             <TableBody>
                                 {filtered.map((op, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-mono text-xs">{op.ref}</TableCell>
                                        <TableCell className="font-medium max-w-xs truncate">{op.objet}</TableCell>
                                        <TableCell>{op.autorite}</TableCell>
                                        <TableCell className="text-slate-600">{op.mode}</TableCell>
                                        <TableCell>{op.nature}</TableCell>
                                        <TableCell className="text-slate-600">{op.detail}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                aria-label="Voir le détail"
                                                title="Voir le détail"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => navigate(`/operations/passation-plans/${op.ref}`)}
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
                <div className="p-4 border-t border-slate-200 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Affiche 1 à 8 sur 15878 éléments</p>
                    <div className="flex items-center gap-1">
                        <Button size="sm" variant="outline" disabled>Précédent</Button>
                        <Button size="sm" variant="default">1</Button>
                        <Button size="sm" variant="outline">2</Button>
                        <Button size="sm" variant="outline">3</Button>
                        <span className="text-sm px-2">...</span>
                        <Button size="sm" variant="outline">1985</Button>
                        <Button size="sm" variant="outline">Suivant</Button>
                    </div>
                </div>
            </Card>
        </motion.div>

        {/* Plus de modale: navigation vers la page de détail */}
    </>
    );
};

export default PassationPlansPage;
