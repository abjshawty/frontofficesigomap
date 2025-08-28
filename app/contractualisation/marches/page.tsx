import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { MainLayout } from "@/components/ui/MainLayout";

// TODO: Remplacer par les vraies colonnes et données
const marchesColumns = [
    { accessorKey: 'reference', header: 'Référence Marché' },
    { accessorKey: 'objet', header: 'Objet' },
    { accessorKey: 'attributaire', header: 'Attributaire' },
    { accessorKey: 'montant', header: 'Montant' },
    { accessorKey: 'statut', header: 'Statut' },
];

const marchesData = [
    { reference: 'MAR-2023-001', objet: 'Fourniture de matériel informatique', attributaire: 'Tech Solutions SARL', montant: '150,000,000 XOF', statut: 'En cours de signature' },
    { reference: 'MAR-2023-002', objet: 'Entretien des locaux', attributaire: 'PropreNet SA', montant: '75,000,000 XOF', statut: 'Brouillon' },
];


export default function MarchesPage() {
    return (
        <MainLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Suivi des Marchés</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable columns={marchesColumns} data={marchesData} />
                </CardContent>
            </Card>
        </MainLayout>
    )
}
