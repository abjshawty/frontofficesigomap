"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Fragment } from "react"

const breadcrumbTranslations: { [key: string]: string } = {
    'cojo': 'Espace COJO',
    'evaluer': 'Évaluation',
    'dao': "Appels d'Offres",
    'planification': 'Planification',
    'operations': 'Opérations',
    'procedures-derogatoires': 'Procédures Dérogatoires',
    'new': 'Nouveau',
    'edit': 'Modification',
};

export function Breadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment);

    if (pathSegments.length === 0) {
        return null;
    }

    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                    <Link href="/" className="hover:text-foreground">
                        Tableau de bord
                    </Link>
                </li>
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathSegments.length - 1;
                    const translatedLabel = breadcrumbTranslations[segment] || segment;

                    return (
                        <Fragment key={href}>
                            <li>
                                <ChevronRight className="h-4 w-4" />
                            </li>
                            <li>
                                {isLast ? (
                                    <span className="font-medium text-foreground">
                                        {translatedLabel}
                                    </span>
                                ) : (
                                    <Link href={href} className="hover:text-foreground">
                                        {translatedLabel}
                                    </Link>
                                )}
                            </li>
                        </Fragment>
                    )
                })}
            </ol>
        </nav>
    )
}
