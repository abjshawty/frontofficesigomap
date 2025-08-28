"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ArrowRight, Eye } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog"
import { VueDetailsSessionCojo } from "@/components/cojo/VueDetailsSessionCojo"

export type CojoSession = {
  id: string
  reference: string
  object: string
  openingDate: string
  status: "À venir" | "En cours" | "En pré-validation" | "Clôturée"
  commission: { nom: string; fonction: string; structure: string }[]
}

export const columns: ColumnDef<CojoSession>[] = [
  {
    accessorKey: "reference",
    header: "Référence Appel d'Offres",
  },
  {
    accessorKey: "object",
    header: "Objet",
    cell: ({ row }) => <div className="max-w-xs truncate">{row.getValue("object")}</div>,
  },
  {
    accessorKey: "openingDate",
    header: "Date d'ouverture",
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as CojoSession["status"]
      let variant: "default" | "secondary" | "destructive" | "outline" = "secondary"

      switch (status) {
        case "En cours":
        case "En pré-validation":
          variant = "default"
          break
        case "Clôturée":
          variant = "outline"
          break
        case "À venir":
        default:
          variant = "secondary"
      }

      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const session = row.original
      return (
        <div className="text-right space-x-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 px-2">
                        <Eye className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[50%]">
                    <DialogHeader>
                        <DialogTitle>Détails de la session</DialogTitle>
                        <DialogDescription>
                            Informations générales sur la session et la commission.
                        </DialogDescription>
                    </DialogHeader>
                    <VueDetailsSessionCojo sessionDetails={session} />
                </DialogContent>
            </Dialog>
            <Button asChild size="sm" className="h-8">
                <Link href={`/cojo/${session.id}`}>
                    Accéder <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
            </Button>
        </div>
      )
    },
  },
]
