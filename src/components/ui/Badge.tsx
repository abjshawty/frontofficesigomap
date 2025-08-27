import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/components/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Statuts
        actif: "border-transparent bg-sigomap-vert text-sigomap-blanc",
        inactif: "border-transparent bg-sigomap-gris text-sigomap-blanc",
        'en-attente': "border-transparent bg-sigomap-orange text-sigomap-blanc",
        
        // Rôles
        user: "border-sigomap-bleu/50 text-sigomap-bleu-dark bg-sigomap-bleu/10",
        admin: "border-sigomap-vert/50 text-sigomap-vert-dark bg-sigomap-vert/10",
        super_admin: "border-sigomap-orange/50 text-sigomap-orange-dark bg-sigomap-orange/10",

        // Default / Outline
        default: "border-transparent bg-sigomap-gris-dark text-sigomap-blanc",
        secondary: "border-transparent bg-sigomap-gris-light text-sigomap-gris-dark",
        destructive: "border-transparent bg-red-500 text-white",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
