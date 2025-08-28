"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Lock, Timer } from "lucide-react"

interface VueSessionCojoScelleeProps {
    openingDate: string;
}

function calculateTimeLeft(endDate: Date) {
    const difference = +endDate - +new Date();
    let timeLeft = {
        jours: 0,
        heures: 0,
        minutes: 0,
        secondes: 0,
    };

    if (difference > 0) {
        timeLeft = {
            jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
            heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            secondes: Math.floor((difference / 1000) % 60),
        };
    }

    return timeLeft;
}

export function VueSessionCojoScellee({ openingDate }: VueSessionCojoScelleeProps) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(new Date(openingDate)));
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(new Date(openingDate)));
        }, 1000);

        return () => clearTimeout(timer);
    });
    
    return (
        <Card className="text-center">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-3 w-fit">
                    <Lock className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4">Session d'ouverture scellée</CardTitle>
                <CardDescription>
                    Les offres ne sont pas encore accessibles. L'ouverture du coffre-fort numérique est programmée pour le 
                    <br />
                    {isClient && <strong>{new Date(openingDate).toLocaleString('fr-FR')}</strong>}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center space-x-4 text-center">
                    <Timer className="h-6 w-6 text-primary" />
                    <div className="text-2xl font-mono tracking-widest space-x-2">
                        <span>{String(timeLeft.jours).padStart(2, '0')}j</span>
                        <span>:</span>
                        <span>{String(timeLeft.heures).padStart(2, '0')}h</span>
                        <span>:</span>
                        <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                        <span>:</span>
                        <span>{String(timeLeft.secondes).padStart(2, '0')}s</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
