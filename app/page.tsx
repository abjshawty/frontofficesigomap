import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { MainLayout } from "@/components/ui/MainLayout";


export default function DashboardPage() { 
  return (
    <MainLayout>
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Tableau de Bord</h1>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Bienvenue sur SIGOMAP</CardTitle>
                <CardDescription>
                    Utilisez la navigation de gauche pour accéder aux différents modules fonctionnels de l'application.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Cette page servira de tableau de bord principal, affichant des statistiques clés et des raccourcis.</p>
            </CardContent>
        </Card>
    </MainLayout>
  )
}
