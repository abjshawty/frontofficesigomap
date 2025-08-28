"use client";

import React, { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle, FileText, CheckCircle, Loader, Pencil } from "lucide-react";
import Link from "next/link";

import { MainLayout } from "@/components/ui/MainLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/components/lib/utils";

// --- Type Definitions ---
export type Procedure = {
  id: string;
  reference: string;
  operationObjet: string;
  type: "Gré à gré" | "Consultation restreinte" | "Autorisation d'anticipation";
  statut: "Brouillon" | "En validation" | "Approuvée" | "Rejetée";
  createdAt: string;
};

// --- Demo Data ---
const data: Procedure[] = [
  {
    id: "PD001",
    reference: "PD/2025/001",
    operationObjet: "Acquisition de logiciels spécifiques pour la DSI",
    type: "Gré à gré",
    statut: "Approuvée",
    createdAt: "12/07/2025",
  },
  {
    id: "PD002",
    reference: "PD/2025/002",
    operationObjet: "Prestation de maintenance sur équipement lourd",
    type: "Consultation restreinte",
    statut: "En validation",
    createdAt: "18/07/2025",
  },
  {
    id: "PD003",
    reference: "PD/2025/003",
    operationObjet: "Réfection urgente de la toiture du bâtiment A",
    type: "Autorisation d'anticipation",
    statut: "Brouillon",
    createdAt: "22/07/2025",
  },
];

const procedureTypes = ["Tous les types", ...Array.from(new Set(data.map(p => p.type)))];
const procedureStatuses = ["Tous les statuts", ...Array.from(new Set(data.map(p => p.statut)))];

// --- Badge Variants ---
const statusVariants = {
  "Brouillon": "secondary",
  "En validation": "en-attente",
  "Approuvée": "actif",
  "Rejetée": "destructive",
} as const;

// --- Columns Definition ---
const columns: ColumnDef<Procedure>[] = [
  {
    accessorKey: "reference",
    header: "Référence",
  },
  {
    accessorKey: "operationObjet",
    header: "Objet de l'Opération",
    cell: ({ row }) => <div className="max-w-xs truncate">{row.getValue("operationObjet")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type de Demande",
  },
  {
    accessorKey: "statut",
    header: "Statut",
    cell: ({ row }) => {
      const statut = row.getValue("statut") as Procedure["statut"];
      const variant = statusVariants[statut] || "default";
      return <Badge variant={variant as any}>{statut}</Badge>;
    }
  },
  {
    accessorKey: "createdAt",
    header: "Créé le",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const procedure = row.original;
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
                <Link href={`/procedures-derogatoires/${procedure.id}`}>Voir les détails</Link>
              </DropdownMenuItem>
              {procedure.statut === "Brouillon" && <DropdownMenuItem>Modifier</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

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

function StatCard ({ title, value, description, icon: Icon, colorClass, bgColorClass, borderColorClass }: StatCardProps) {
  return (
    <Card className={cn("border-l-4", borderColorClass)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-sigomap-gris uppercase tracking-wider">{title}</CardTitle>
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", bgColorClass)}>
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
export default function ProceduresDerogatoiresPage () {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous les statuts");
  const [typeFilter, setTypeFilter] = useState("Tous les types");

  const stats = useMemo(() => {
    return {
      total: data.length,
      approuvee: data.filter(d => d.statut === 'Approuvée').length,
      enValidation: data.filter(d => d.statut === 'En validation').length,
      brouillon: data.filter(d => d.statut === 'Brouillon').length,
    };
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(p => {
      const searchMatch = searchTerm === "" ||
        p.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.operationObjet.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch = statusFilter === "Tous les statuts" || p.statut === statusFilter;
      const typeMatch = typeFilter === "Tous les types" || p.type === typeFilter;

      return searchMatch && statusMatch && typeMatch;
    });
  }, [searchTerm, statusFilter, typeFilter]);


  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Demandes"
            value={stats.total}
            description="Total des demandes créées"
            icon={FileText}
            colorClass="text-sigomap-bleu"
            bgColorClass="bg-sigomap-bleu/10"
            borderColorClass="border-sigomap-bleu"
          />
          <StatCard
            title="Approuvées"
            value={stats.approuvee}
            description="Demandes acceptées"
            icon={CheckCircle}
            colorClass="text-sigomap-vert-dark"
            bgColorClass="bg-sigomap-vert/10"
            borderColorClass="border-sigomap-vert-dark"
          />
          <StatCard
            title="En Validation"
            value={stats.enValidation}
            description="Soumises pour approbation"
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
            Liste des Procédures Dérogatoires
          </h1>
          <Link href="/procedures-derogatoires/select-operation">
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nouvelle Demande
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filtres</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              placeholder="Rechercher par référence, objet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                {procedureStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                {procedureTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
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
  );
}
