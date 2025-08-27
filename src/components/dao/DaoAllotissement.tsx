"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { PlusCircle, MoreHorizontal, Pencil, Trash2, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const demoLots = [
    {
        id: "LOT01",
        number: "Lot 1",
        label: "Gros Œuvre",
        estimatedAmount: 75000000,
        guarantee: 1000000,
        deadline: 120,
    },
    {
        id: "LOT02",
        number: "Lot 2",
        label: "Électricité & Plomberie",
        estimatedAmount: 40000000,
        guarantee: 500000,
        deadline: 90,
    },
    {
        id: "LOT03",
        number: "Lot 3",
        label: "Aménagements extérieurs",
        estimatedAmount: 35000000,
        guarantee: 500000,
        deadline: 60,
    }
];

export default function DaoAllotissement({ daoId }: { daoId: string | string[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [montantEstimatif, setMontantEstimatif] = useState("");
  const [garantieOffre, setGarantieOffre] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const montant = parseFloat(montantEstimatif);
    const garantie = parseFloat(garantieOffre);

    if (montant > 0 && garantie > 0) {
      const minGarantie = montant * 0.01;
      const maxGarantie = montant * 0.015;

      if (garantie < minGarantie || garantie > maxGarantie) {
        setValidationError(`La garantie doit être entre ${minGarantie.toLocaleString()} et ${maxGarantie.toLocaleString()} FCFA.`);
      } else {
        setValidationError("");
      }
    } else {
      setValidationError("");
    }
  }, [montantEstimatif, garantieOffre]);

  const handleCloseModal = () => {
    // Réinitialiser les états à la fermeture
    setMontantEstimatif("");
    setGarantieOffre("");
    setValidationError("");
    setIsModalOpen(false);
  }

  const handleAddLot = () => {
    const montant = parseFloat(montantEstimatif);
    const garantie = parseFloat(garantieOffre);

    if (montant > 0 && garantie > 0) {
      const minGarantie = montant * 0.01;
      const maxGarantie = montant * 0.015;

      if (garantie < minGarantie || garantie > maxGarantie) {
        setValidationError(`La garantie doit être entre ${minGarantie.toLocaleString()} et ${maxGarantie.toLocaleString()} FCFA.`);
      } else {
        setValidationError("");
        // Here you would typically add the new lot to your data source
        // For now, we'll just close the modal
        setIsModalOpen(false);
      }
    } else {
      setValidationError("Le montant estimatif et la garantie d'offre doivent être supérieurs à 0.");
    }
  };

  const minGarantie = montantEstimatif ? montantEstimatif * 0.01 : 0;
  const maxGarantie = montantEstimatif ? montantEstimatif * 0.015 : 0;

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Gestion de l'Allotissement</CardTitle>
            <CardDescription>
            Définissez les différents lots qui composent ce marché.
            </CardDescription>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau lot</DialogTitle>
              <DialogDescription>
                Renseignez les informations du lot. Cliquez sur "Enregistrer" pour l'ajouter.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="lot-number">Numéro de lot</Label>
                <Input id="lot-number" placeholder="Ex: Lot 1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lot-execution-delay">Délai d'exécution (jours)</Label>
                <Input id="lot-execution-delay" type="number" placeholder="Ex: 90" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="lot-label">Libellé du lot</Label>
                <Input id="lot-label" placeholder="Ex: Travaux de gros oeuvre" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lot-estimated-amount">Montant estimatif (FCFA)</Label>
                <Input 
                  id="lot-estimated-amount" 
                  type="number" 
                  placeholder="Ex: 50000000"
                  value={montantEstimatif || ''}
                  onChange={(e) => setMontantEstimatif(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lot-guarantee">Garantie d'offre (FCFA)</Label>
                <Input 
                  id="lot-guarantee" 
                  type="number" 
                  placeholder="Ex: 750000"
                  value={garantieOffre || ''}
                  onChange={(e) => setGarantieOffre(Number(e.target.value))}
                />
                 {montantEstimatif > 0 && (
                  <p className="text-xs text-muted-foreground pt-1">
                    Recommandé: {minGarantie.toLocaleString()} - {maxGarantie.toLocaleString()} FCFA
                  </p>
                )}
              </div>

              {validationError && (
                <div className="md:col-span-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
              <Button onClick={handleAddLot} disabled={!!validationError}>
                Enregistrer le lot
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Numéro</TableHead>
                    <TableHead>Libellé</TableHead>
                    <TableHead className="text-right">Montant Estimatif (FCFA)</TableHead>
                    <TableHead className="text-right">Garantie d'offre (FCFA)</TableHead>
                    <TableHead className="text-right">Délai d'exécution (jours)</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {demoLots.map((lot) => (
                    <TableRow key={lot.id}>
                        <TableCell className="font-medium">{lot.number}</TableCell>
                        <TableCell>{lot.label}</TableCell>
                        <TableCell className="text-right">{lot.estimatedAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{lot.guarantee.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{lot.deadline}</TableCell>
                        <TableCell className="text-right">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Ouvrir le menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Modifier</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Supprimer</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
