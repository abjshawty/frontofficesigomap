import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { MainLayout } from "@/components/ui/MainLayout";

export default function CojoPage() {
  return (
    <MainLayout>
      <Card>
        <CardHeader>
          <CardTitle>Module 2 : Travaux de la Commission d'Ouverture et de Jugement (COJO)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Cette page contiendra le tableau de bord et les outils pour les membres de la commission.</p>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
