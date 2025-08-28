import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { MainLayout } from "@/components/ui/MainLayout";

export default function ValidationPage() {
  return (
    <MainLayout>
      <Card>
        <CardHeader>
          <CardTitle>Tableau de Bord - Validation DGMP</CardTitle>
          <CardDescription>Vue d'ensemble des dossiers de marché en attente de validation.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Ce tableau de bord affichera des indicateurs clés et des accès rapides aux dossiers nécessitant une action.</p>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
