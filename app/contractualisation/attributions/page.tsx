"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, FileUp, FileCheck, Landmark } from "lucide-react"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { MainLayout } from "@/components/ui/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// This type is a placeholder
export type Attribution = {
  id: string
  reference: string
  objet: string
  statut: string
}

const attributionsAPublierColumns: ColumnDef<Attribution>[] = [
    { accessorKey: 'reference', header: 'Référence Procédure' },
    { accessorKey: 'objet', header: 'Objet' },
    { accessorKey: 'statut', header: 'Statut' },
    {
        id: "actions",
        cell: ({ row }) => {
            const attribution = row.original;
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
                            <Link href={`/contractualisation/attributions/${attribution.id}/publier`}>
                                <FileUp className="mr-2 h-4 w-4" />
                                Publier les résultats
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];

const attributionsAPublierData: Attribution[] = [
    { id: "1", reference: 'DAO-2023-001', objet: 'Construction de bureaux', statut: 'Attribution en attente de publication' },
];

const attributionsPublieesColumns: ColumnDef<Attribution>[] = [
    { accessorKey: 'reference', header: 'Référence Procédure' },
    { accessorKey: 'objet', header: 'Objet' },
    { accessorKey: 'statut', header: 'Statut' },
    {
        id: "actions",
        cell: ({ row }) => {
            const attribution = row.original;
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
                            <Link href={`/contractualisation/marches/new?attributionId=${attribution.id}`}>
                                <Landmark className="mr-2 h-4 w-4" />
                                Créer le marché
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];
const attributionsPublieesData: Attribution[] = [
    { id: "2", reference: 'DAO-2023-002', objet: 'Fourniture de matériel informatique', statut: 'Attribution publiée' },
];


export default function AttributionsPage() {
    return (
        <MainLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Gestion des Attributions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="a-publier">
                        <TabsList>
                            <TabsTrigger value="a-publier">
                                <FileUp className="mr-2 h-4 w-4" />
                                En attente de publication
                            </TabsTrigger>
                            <TabsTrigger value="publiees">
                                <FileCheck className="mr-2 h-4 w-4" />
                                Publiées
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="a-publier">
                            <DataTable columns={attributionsAPublierColumns} data={attributionsAPublierData} />
                        </TabsContent>
                        <TabsContent value="publiees">
                            <DataTable columns={attributionsPublieesColumns} data={attributionsPublieesData} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </MainLayout>
    )
}
