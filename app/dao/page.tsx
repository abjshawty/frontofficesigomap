"use client"

import React, { useState, useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, PlusCircle, FileText, CheckCircle, Loader, Pencil } from "lucide-react"
import Link from "next/link"

import { MainLayout } from "@/components/ui/MainLayout"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { DataTable } from "@/components/ui/DataTable"
import { Badge } from "@/components/ui/Badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Input } from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/components/lib/utils"


// --- Type Definitions ---
export type DAO = {
  id: string
  reference: string
  objet: string
  statut: "Brouillon" | "En validation" | "Validé" | "Rejeté"
  createdAt: string
}

// --- Demo Data ---
const data: DAO[] = [
  {
    id: "DAO001",
    reference: "DAO/2025/001",
    objet: "Construction d'un nouveau centre administratif",
    statut: "Validé",
    createdAt: "10/07/2025",
  },
  {
    id: "DAO002",
    reference: "DAO/2025/002",
    objet: "Fourniture de matériel informatique pour les écoles",
    statut: "En validation",
    createdAt: "15/07/2025",
  },
  {
    id: "DAO003",
    reference: "DAO/2025/003",
    objet: "Réhabilitation du réseau routier secteur nord",
    statut: "Brouillon",
    createdAt: "20/07/2025",
  },
    {
    id: "DAO004",
    reference: "DAO/2025/004",
    objet: "Service de nettoyage des bâtiments publics",
    statut: "Rejeté",
    createdAt: "01/08/2025",
  },
]

// --- Badge Variants ---
const statusVariants = {
    "Brouillon": "secondary",
    "En validation": "en-attente",
    "Validé": "actif",
    "Rejeté": "destructive",
} as const;

// --- Columns Definition ---
export const columns: ColumnDef<DAO>[] = [
  {
    accessorKey: "reference",
    header: "Référence",
  },
  {
    accessorKey: "objet",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Objet
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="max-w-xs truncate">{row.getValue("objet")}</div>,
  },
  {
    accessorKey: "statut",
    header: "Statut",
    cell: ({ row }) => {
        const statut = row.getValue("statut") as DAO["statut"];
        const variant = statusVariants[statut] || "default";
        return <Badge variant={variant as any}>{statut}</Badge>
    }
  },
  {
    accessorKey: "createdAt",
    header: "Créé le",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const dao = row.original
      const isDraft = dao.statut === "Brouillon";
      return (
        <div className="text-right">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <Link href={`/dao/${dao.id}`}>Voir les détails</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isDraft && (
                    <DropdownMenuItem asChild>
                        <Link href={`/dao/edit/${dao.id}`}>Modifier</Link>
                    </DropdownMenuItem>
                )}
                {isDraft && <DropdownMenuItem>Soumettre pour validation</DropdownMenuItem>}
                <DropdownMenuItem className="text-red-600 focus:text-red-600">Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    },
  },
]

// --- StatCard Component ---
interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  colorClass: string;
  bgColorClass: string;
  borderColorClass: string;
}

function StatCard({ title, value, description, icon: Icon, colorClass, bgColorClass, borderColorClass }: StatCardProps) {
  return (
    <Card className={cn("border-l-4", borderColorClass)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-sigomap-gris uppercase tracking-wider">{title}</CardTitle>
        <div className={cn("w-8 h-8 rounded flex items-center justify-center", bgColorClass)}>
            <Icon className={cn("h-4 w-4", colorClass)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", colorClass)}>{value}</div>
        <p className="text-xs text-sigomap-gris mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}


// --- Main Page Component ---
export default function DaoDashboardPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const stats = useMemo(() => {
        return {
            total: data.length,
            valide: data.filter(d => d.statut === 'Validé').length,
            enValidation: data.filter(d => d.statut === 'En validation').length,
            brouillon: data.filter(d => d.statut === 'Brouillon').length,
        }
    }, [data]);

    const filteredData = useMemo(() => {
        let filtered = data;

        if (statusFilter !== 'all') {
            filtered = filtered.filter(d => d.statut === statusFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(d => 
                d.objet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.reference.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    }, [data, searchTerm, statusFilter]);

  return (
    <MainLayout>
        <div className="w-full max-w-7xl mx-auto space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="Total DAO"
                    value={stats.total}
                    description="Total des dossiers créés"
                    icon={FileText}
                    colorClass="text-sigomap-bleu"
                    bgColorClass="bg-sigomap-bleu/10"
                    borderColorClass="border-sigomap-bleu"
                />
                <StatCard 
                    title="Validés"
                    value={stats.valide}
                    description="Dossiers approuvés"
                    icon={CheckCircle}
                    colorClass="text-sigomap-vert-dark"
                    bgColorClass="bg-sigomap-vert/10"
                    borderColorClass="border-sigomap-vert-dark"
                />
                <StatCard 
                    title="En Validation"
                    value={stats.enValidation}
                    description="Soumis pour approbation"
                    icon={Loader}
                    colorClass="text-sigomap-orange"
                    bgColorClass="bg-sigomap-orange/10"
                    borderColorClass="border-sigomap-orange"
                />
                <StatCard 
                    title="Brouillons"
                    value={stats.brouillon}
                    description="En cours de rédaction"
                    icon={Pencil}
                    colorClass="text-sigomap-gris-dark"
                    bgColorClass="bg-sigomap-gris-light/50"
                    borderColorClass="border-sigomap-gris"
                />
            </div>

            {/* Title and Actions */}
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    Liste des Dossiers d'Appel d'Offres
                </h1>
                <Link href="/dao/new">
                    <Button size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Nouveau DAO
                    </Button>
                </Link>
            </div>
            
            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Filtres</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input 
                        placeholder="Rechercher par objet, référence..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                     <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filtrer par statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="Brouillon">Brouillon</SelectItem>
                            <SelectItem value="En validation">En validation</SelectItem>
                            <SelectItem value="Validé">Validé</SelectItem>
                            <SelectItem value="Rejeté">Rejeté</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Data Table */}
            <Card>
                <CardContent className="pt-6">
                    <DataTable columns={columns} data={filteredData} />
                </CardContent>
            </Card>
        </div>
    </MainLayout>
  )
}
