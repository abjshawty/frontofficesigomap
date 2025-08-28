"use client"

import React, { useState, useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { CheckCircle, Clock, FileText, Loader, PlusCircle } from "lucide-react"
import Link from "next/link"

import { MainLayout } from "@/components/ui/MainLayout"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { DataTable } from "@/components/ui/DataTable"
import { Input } from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { CojoSession, columns } from "./columns"
import { cn } from "@/components/lib/utils"
import type { LucideIcon } from "lucide-react"

// --- Demo Data ---
const data: CojoSession[] = [
    {
      id: "COJO-001",
      reference: "AO-2023-012",
      object: "Construction d'un nouveau bâtiment administratif",
      openingDate: "2023-10-26 10:00",
      status: "À venir",
      commission: [
        { nom: "Alice Bertrand", fonction: "Président", structure: "Ministère de la Construction" },
        { nom: "Charles D.", fonction: "Secrétaire", structure: "AC Bâtiments" },
      ]
    },
    {
      id: "COJO-002",
      reference: "AO-2023-015",
      object: "Fourniture de matériel informatique pour les écoles",
      openingDate: "2023-10-28 14:30",
      status: "En cours",
      commission: [
        { nom: "Jean Dupont", fonction: "Président", structure: "Ministère de l'Éducation" },
        { nom: "Marie Dubois", fonction: "Secrétaire", structure: "Autorité Contractante A" },
        { nom: "Paul Martin", fonction: "Membre", structure: "Direction des Marchés Publics" },
        { nom: "Awa Traoré", fonction: "Membre", structure: "Contrôle Financier" },
      ]
    },
    {
        id: "COJO-003",
        reference: "AO-2023-011",
        object: "Réhabilitation du réseau routier section A",
        openingDate: "2023-10-25 09:00",
        status: "En pré-validation",
        commission: [
            { nom: "Fatou Keita", fonction: "Président", structure: "Ministère des Infrastructures" },
            { nom: "Moussa Diop", fonction: "Membre", structure: "AGEROUTE" },
        ]
    },
    {
        id: "COJO-004",
        reference: "AO-2023-009",
        object: "Services de nettoyage pour le siège social",
        openingDate: "2023-10-22 11:00",
        status: "Clôturée",
        commission: [
            { nom: "Adama Coulibaly", fonction: "Président", structure: "Direction Administrative" },
        ]
    },
];

// --- StatCard Component --- (Could be moved to a shared components file)
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
export default function CojoDashboardPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const stats = useMemo(() => {
        return {
            total: data.length,
            aVenir: data.filter(d => d.status === 'À venir').length,
            enCours: data.filter(d => d.status === 'En cours').length,
            cloturee: data.filter(d => d.status === 'Clôturée').length,
        }
    }, [data]);

    const filteredData = useMemo(() => {
        let filtered = data;
        if (statusFilter !== 'all') {
            filtered = filtered.filter(d => d.status === statusFilter);
        }
        if (searchTerm) {
            filtered = filtered.filter(d => 
                d.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.reference.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    }, [data, searchTerm, statusFilter]);

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                        title="Total Sessions"
                        value={stats.total}
                        description="Toutes les sessions confondues"
                        icon={FileText}
                        colorClass="text-sigomap-bleu"
                        bgColorClass="bg-sigomap-bleu/10"
                        borderColorClass="border-sigomap-bleu"
                    />
                    <StatCard 
                        title="À venir"
                        value={stats.aVenir}
                        description="Sessions planifiées"
                        icon={Clock}
                        colorClass="text-sigomap-gris-dark"
                        bgColorClass="bg-sigomap-gris-light/50"
                        borderColorClass="border-sigomap-gris"
                    />
                    <StatCard 
                        title="En Cours"
                        value={stats.enCours}
                        description="Sessions en cours de jugement"
                        icon={Loader}
                        colorClass="text-sigomap-orange"
                        bgColorClass="bg-sigomap-orange/10"
                        borderColorClass="border-sigomap-orange"
                    />
                    <StatCard 
                        title="Clôturées"
                        value={stats.cloturee}
                        description="Sessions terminées"
                        icon={CheckCircle}
                        colorClass="text-sigomap-vert-dark"
                        bgColorClass="bg-sigomap-vert/10"
                        borderColorClass="border-sigomap-vert-dark"
                    />
                </div>

                {/* Title and Actions */}
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">
                        Tableau de bord de la Commission (COJO)
                    </h1>
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
                                <SelectItem value="À venir">À venir</SelectItem>
                                <SelectItem value="En cours">En cours</SelectItem>
                                <SelectItem value="En pré-validation">En pré-validation</SelectItem>
                                <SelectItem value="Clôturée">Clôturée</SelectItem>
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
