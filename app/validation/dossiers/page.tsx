"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, FolderGit2 } from "lucide-react"
import React, { useMemo, useState } from "react"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { DataTable } from "@/components/ui/DataTable"
import { MainLayout } from "@/components/ui/MainLayout"
import { Badge } from "@/components/ui/Badge"
import Link from "next/link"
import { Input } from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"

// Placeholder type
export type DossierValidation = {
  reference: string
  objet: string
  autoriteContractante: string
  statut: 'À affecter' | 'Instruction en cours' | 'En attente de validation N+1' | 'Validé'
  assigneA: string
}

const columns: ColumnDef<DossierValidation>[] = [
    { accessorKey: 'reference', header: 'Référence Marché' },
    { accessorKey: 'objet', header: 'Objet' },
    { accessorKey: 'autoriteContractante', header: 'Autorité Contractante' },
    { 
        accessorKey: 'statut', 
        header: 'Statut',
        cell: ({ row }) => <Badge>{row.original.statut}</Badge>
    },
    { accessorKey: 'assigneA', header: 'Assigné à' },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Ouvrir le menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/validation/dossiers/${row.original.reference}`}>Voir le dossier</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Affecter</DropdownMenuItem>
                        <DropdownMenuItem>Valider</DropdownMenuItem>
                        <DropdownMenuItem>Renvoyer</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];

const data: DossierValidation[] = [
    { reference: 'MAR-2023-001', objet: 'Fourniture de matériel informatique', autoriteContractante: 'Ministère de la Santé', statut: 'À affecter', assigneA: 'N/A' },
    { reference: 'MAR-2023-002', objet: 'Entretien des locaux', autoriteContractante: 'Ministère de l\'Éducation', statut: 'Instruction en cours', assigneA: 'Jean Dupont' },
    { reference: 'MAR-2023-003', objet: 'Construction de pont', autoriteContractante: 'Ministère des Infrastructures', statut: 'En attente de validation N+1', assigneA: 'Aïssata Traoré' },
];


export default function DossiersValidationPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredData = useMemo(() => {
        return data.filter(dossier => {
            const searchMatch = searchTerm.toLowerCase() === '' ||
                dossier.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dossier.objet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dossier.autoriteContractante.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dossier.assigneA.toLowerCase().includes(searchTerm.toLowerCase());

            const statusMatch = statusFilter === 'all' || dossier.statut === statusFilter;

            return searchMatch && statusMatch;
        });
    }, [searchTerm, statusFilter]);

    return (
        <MainLayout>
            <div className="space-y-6">
                 <div>
                    <h1 className="text-lg font-semibold md:text-2xl flex items-center">
                        <FolderGit2 className="mr-2 h-6 w-6" />
                        Dossiers en Cours de Validation
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Liste des dossiers de marché soumis à la validation de la DGMP.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Filtres</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Input
                            placeholder="Rechercher par référence, objet, AC..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrer par statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                <SelectItem value="À affecter">À affecter</SelectItem>
                                <SelectItem value="Instruction en cours">Instruction en cours</SelectItem>
                                <SelectItem value="En attente de validation N+1">En attente de validation N+1</SelectItem>
                                <SelectItem value="Validé">Validé</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <DataTable columns={columns} data={filteredData} />
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}
