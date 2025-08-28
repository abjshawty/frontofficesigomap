"use client"

import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Users, Calendar, Info, FileText } from "lucide-react"

// Mock data for session details
const sessionDetails = {
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
}

interface VueDetailsSessionCojoProps {
    sessionDetails: typeof sessionDetails;
}

export function VueDetailsSessionCojo({ sessionDetails }: VueDetailsSessionCojoProps) {
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                        <FileText className="h-5 w-5 mr-2" />
                        {sessionDetails.reference}
                    </CardTitle>
                    <CardDescription>{sessionDetails.object}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                        <strong>Statut:</strong>
                        <Badge variant="default" className="ml-2">{sessionDetails.status}</Badge>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <strong>Date d'ouverture:</strong>
                        <span className="ml-2">{new Date(sessionDetails.openingDate).toLocaleString('fr-FR')}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Composition de la Commission
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {sessionDetails.commission && sessionDetails.commission.length > 0 ? (
                        <ul className="space-y-3">
                            {sessionDetails.commission.map((membre, index) => (
                                <li key={index} className="flex items-center space-x-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{membre.nom.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{membre.nom}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {membre.fonction} - <span className="italic">{membre.structure}</span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">Aucune information sur la commission disponible.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
