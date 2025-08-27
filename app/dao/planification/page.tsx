
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const procurementPlans = [
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

export default function ProcurementPlansPage() {
  const router = useRouter();

  const handleRowClick = (planId: string) => {
    router.push(`/dao/planification/${planId}`);
  };

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Plans de Passation des Marchés</CardTitle>
              <CardDescription>
                Consultez et gérez les plans de passation annuels.
              </CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Créer un plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre du Plan</TableHead>
                <TableHead>Année</TableHead>
                <TableHead>Type de Procédure</TableHead>
                <TableHead className="text-center">Opérations</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {procurementPlans.map((plan) => (
                <TableRow 
                  key={plan.id} 
                  onClick={() => handleRowClick(plan.id)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">{plan.title}</TableCell>
                  <TableCell>{plan.year}</TableCell>
                  <TableCell>{plan.procedureType}</TableCell>
                  <TableCell className="text-center">{plan.operationsCount}</TableCell>
                  <TableCell>
                    <Badge variant={plan.status === "Actif" ? "default" : "secondary"}>
                      {plan.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
