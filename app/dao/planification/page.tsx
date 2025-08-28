"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlusCircle, Search, FileStack, CheckCircle, Archive, MoreHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { cn } from "@/components/lib/utils";
import type { LucideIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import Link from "next/link";

export type ProcurementPlan = {
  id: string;
  title: string;
  year: number;
  procedureType: "Classique" | "Simplifiée";
  status: "Actif" | "Archivé";
  operationsCount: number;
};

const procurementPlans: ProcurementPlan[] = [
  {
    id: "plan-001",
    title: "Plan de passation 2024 - Procédures Classiques",
    year: 2024,
    procedureType: "Classique",
    status: "Actif",
    operationsCount: 12,
  },
  {
    id: "plan-002",
    title: "Plan de passation 2024 - Procédures Simplifiées",
    year: 2024,
    procedureType: "Simplifiée",
    status: "Actif",
    operationsCount: 5,
  },
  {
    id: "plan-003",
    title: "Plan de passation 2023 - Procédures Classiques",
    year: 2023,
    procedureType: "Classique",
    status: "Archivé",
    operationsCount: 38,
  },
];

export const columns: ColumnDef<ProcurementPlan>[] = [
    {
        accessorKey: "title",
        header: "Titre du Plan",
        cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "year",
        header: "Année",
    },
    {
        accessorKey: "procedureType",
        header: "Type de Procédure",
    },
    {
        accessorKey: "operationsCount",
        header: () => <div className="text-center">Opérations</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("operationsCount")}</div>,
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return <Badge variant={status === "Actif" ? "actif" : "secondary"}>{status}</Badge>;
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const plan = row.original;
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
                                <Link href={`/dao/planification/${plan.id}`}>Voir les détails</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Modifier</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:text-red-600">Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]

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

export default function ProcurementPlansPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = useMemo(() => {
    return {
        total: procurementPlans.length,
        actifs: procurementPlans.filter(p => p.status === 'Actif').length,
        archives: procurementPlans.filter(p => p.status === 'Archivé').length,
    }
  }, []);

  const years = useMemo(() => {
    const allYears = procurementPlans.map(p => p.year.toString());
    return ['all', ...Array.from(new Set(allYears))];
  }, []);

  const statuses = useMemo(() => {
    const allStatuses = procurementPlans.map(p => p.status);
    return ['all', ...Array.from(new Set(allStatuses))];
  }, []);

  const filteredPlans = useMemo(() => {
    return procurementPlans.filter(plan => {
      const searchMatch = plan.title.toLowerCase().includes(searchTerm.toLowerCase());
      const yearMatch = yearFilter === 'all' || plan.year.toString() === yearFilter;
      const statusMatch = statusFilter === 'all' || plan.status === statusFilter;
      return searchMatch && yearMatch && statusMatch;
    });
  }, [searchTerm, yearFilter, statusFilter]);

  return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard 
                title="Total Plans"
                value={stats.total}
                description="Nombre total de plans"
                icon={FileStack}
                colorClass="text-sigomap-bleu"
                bgColorClass="bg-sigomap-bleu/10"
                borderColorClass="border-sigomap-bleu"
            />
            <StatCard 
                title="Plans Actifs"
                value={stats.actifs}
                description="Plans en cours d'exécution"
                icon={CheckCircle}
                colorClass="text-sigomap-vert-dark"
                bgColorClass="bg-sigomap-vert/10"
                borderColorClass="border-sigomap-vert-dark"
            />
            <StatCard 
                title="Plans Archivés"
                value={stats.archives}
                description="Plans des exercices précédents"
                icon={Archive}
                colorClass="text-sigomap-gris-dark"
                bgColorClass="bg-sigomap-gris-light/50"
                borderColorClass="border-sigomap-gris"
            />
        </div>

        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
                Plans de Passation des Marchés
            </h1>
            <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Créer un plan
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="text-base">Filtres</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Rechercher par titre..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filtrer par année" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map(year => (
                            <SelectItem key={year} value={year}>
                                {year === 'all' ? 'Toutes les années' : year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                        {statuses.map(status => (
                            <SelectItem key={status} value={status}>
                                {status === 'all' ? 'Tous les statuts' : status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <DataTable columns={columns} data={filteredPlans} />
          </CardContent>
        </Card>
      </div>
  );
}