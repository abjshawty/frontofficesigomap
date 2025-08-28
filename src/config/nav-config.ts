import {
    LayoutDashboard, CalendarCheck, ClipboardList, FileText,
    FileWarning, FileStack, FileSignature, Users, GanttChartSquare,
    Gavel, Handshake, Stamp, Rocket, Building2, FolderGit2, Edit
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
        name: "Contractualisation",
        label: "Contractualisation",
        icon: Handshake,
        href: "/contractualisation",
        activeFor: ["/contractualisation"],
        sidebarNav: {
            title: "Suivi des Marchés",
            items: [
                { type: 'link', label: "Tableau de bord", href: "/contractualisation", icon: LayoutDashboard },
                {
                    type: 'accordion',
                    label: "Contractualisation",
                    icon: FileSignature,
                    children: [
                        { label: "Attributions", href: "/contractualisation/attributions", icon: ClipboardList },
                        { label: "Marchés", href: "/contractualisation/marches", icon: FileText },
                    ]
                }
            ]
        }
    },
    VALIDATION: {
        name: "VALIDATION",
        label: "Validation DGMP",
        icon: Stamp,
        href: "/validation",
        activeFor: ["/validation"],
        sidebarNav: {
            title: "Contrôle des Marchés",
            items: [
                { type: 'link', label: "Tableau de bord", href: "/validation", icon: LayoutDashboard },
                { type: 'link', label: "Dossiers en cours", href: "/validation/dossiers", icon: FolderGit2 },
            ]
        }
    },
    DEMARRAGE: {
        name: "Démarrage",
        label: "Démarrage Marché",
        icon: Rocket,
        href: "/demarrage",
        activeFor: ["/demarrage"],
        sidebarNav: {
            title: "Finalisation",
            items: [
                { type: 'link', label: "Marchés à finaliser", href: "/demarrage", icon: Edit },
            ]
        }
    },
};

export const modules: ModuleConfig[] = Object.values(navConfig);
