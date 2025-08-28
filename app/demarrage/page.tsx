"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { MoreHorizontal, Edit } from "lucide-react"
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

// Placeholder type
export type MarcheAFinaliser = {
  reference: string
  objet: string
  statut: 'Signature en cours' | 'Marché approuvé'
}

const columns: ColumnDef<MarcheAFinaliser>[] = [
    { accessorKey: 'reference', header: 'Référence Marché' },
    { accessorKey: 'objet', header: 'Objet' },
    { 
        accessorKey: 'statut', 
        header: 'Statut',
        cell: ({ row }) => <Badge>{row.original.statut}</Badge>
    },
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
                           <Link href={`/demarrage/${row.original.reference}`}>Finaliser le processus</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];

const data: MarcheAFinaliser[] = [
    { reference: 'MAR-2023-001', objet: 'Fourniture de matériel informatique', statut: 'Signature en cours' },
    { reference: 'MAR-2023-004', objet: 'Réhabilitation de centre de santé', statut: 'Marché approuvé' },
];


export default function DemarragePage() {
    return (
        <MainLayout>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Edit className="mr-2 h-6 w-6" />
                        Marchés à Finaliser
                    </CardTitle>
                    <CardDescription>
                        Liste des marchés validés par la DGMP en attente des dernières étapes avant démarrage.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </MainLayout>
    )
}
