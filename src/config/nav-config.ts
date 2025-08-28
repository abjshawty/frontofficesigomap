import {
    LayoutDashboard, CalendarCheck, ClipboardList, FileText,
    FileWarning, FileStack, FileSignature, Users, GanttChartSquare,
    Gavel, Handshake, Stamp, Rocket, Building2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// --- Type Definitions ---

export interface NavLink {
    label: string;
    href: string;
    icon: LucideIcon;
}

interface NavItemBase {
    label: string;
    icon: LucideIcon;
}

interface NavItemLink extends NavItemBase {
    type: 'link';
    href: string;
}

interface NavItemAccordion extends NavItemBase {
    type: 'accordion';
    children: NavLink[];
}

export type SidebarNavItem = NavItemLink | NavItemAccordion;

export interface ModuleConfig {
    name: string;
    label: string;
    icon: LucideIcon;
    href: string;
    activeFor: string[];
    sidebarNav?: {
        title: string;
        items: SidebarNavItem[];
    }
}

// --- Navigation Configuration ---

export const navConfig: Record<string, ModuleConfig> = {
    MARCHES: {
        name: "Marchés",
        label: "Gestion des Marchés",
        icon: GanttChartSquare,
        href: "/",
        activeFor: ["/", "/dao", "/procedures-derogatoires"],
        sidebarNav: {
            title: "Commande Publique",
            items: [
                { type: 'link', label: "Tableau de bord", href: "/", icon: LayoutDashboard },
                {
                    type: 'accordion',
                    label: "Planification",
                    icon: CalendarCheck,
                    children: [
                        { label: "Plans de Passation", href: "/dao/planification", icon: FileStack },
                        { label: "Opérations", href: "/dao/planification/operations", icon: ClipboardList },
                    ]
                },
                {
                    type: 'accordion',
                    label: "Procédures de Passation",
                    icon: FileSignature,
                    children: [
                        { label: "Dossiers d'Appel d'Offres", href: "/dao", icon: FileText },
                        { label: "Procédures Dérogatoires", href: "/procedures-derogatoires", icon: FileWarning },
                    ]
                }
            ]
        }
    },
    COJO: {
        name: "COJO",
        label: "Travaux COJO",
        icon: Gavel,
        href: "/cojo",
        activeFor: ["/cojo"],
        sidebarNav: {
            title: "Espace Commission",
            items: [
                { type: 'link', label: "Tableau de bord COJO", href: "/cojo", icon: Users }
            ]
        }
    },
    CONTRACT: {
        name: "CONTRACT",
        label: "Contractualisation",
        icon: Handshake,
        href: "/contractualisation",
        activeFor: ["/contractualisation"],
        // No sub-menu for this module yet
    },
    VALIDATION: {
        name: "VALIDATION",
        label: "Validation DGMP",
        icon: Stamp,
        href: "/validation",
        activeFor: ["/validation"],
        // No sub-menu for this module yet
    },
    DEMARRAGE: {
        name: "START",
        label: "Démarrage Marché",
        icon: Rocket,
        href: "/demarrage",
        activeFor: ["/demarrage"],
        // No sub-menu for this module yet
    },
    OE: {
        name: "OE",
        label: "Portail Opérateur",
        icon: Building2,
        href: "/portail-oe",
        activeFor: ["/portail-oe"],
        // No sub-menu for this module yet
    },
};

export const modules: ModuleConfig[] = Object.values(navConfig);
