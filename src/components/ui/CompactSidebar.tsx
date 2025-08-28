"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CircleHelp, LogOut } from "lucide-react"
import { modules } from "@/config/nav-config"

const logoSrc = "/assets/armoiries_ci.png"

export function CompactSidebar() {
  const pathname = usePathname()

  // Détermine le module actif en trouvant la correspondance la plus spécifique (le plus long chemin)
  const activeModule = modules
    .map(item => {
        const matchingPath = item.activeFor
            .filter(path => pathname.startsWith(path))
            .sort((a, b) => b.length - a.length)[0]; // Trouve le plus long préfixe correspondant
        
        return {
            name: item.name,
            matchLength: matchingPath ? matchingPath.length : 0
        };
    })
    .filter(item => item.matchLength > 0)
    .sort((a, b) => b.matchLength - a.matchLength)[0]?.name;

  return (
    <div className="w-28 bg-sigomap-bg-secondary border-r border-sigomap-gris-light flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-sigomap-gris-light bg-gradient-to-b from-sigomap-blanc to-sigomap-bg-secondary">
        <div className="w-10 h-10 bg-gradient-to-br from-sigomap-blanc to-sigomap-bg-primary rounded-sm flex items-center justify-center p-1 border border-sigomap-orange/50">
          <Image src={logoSrc} alt="Armoiries de Côte d'Ivoire" width={32} height={32} />
        </div>
      </div>
      <div className="flex-1 py-4 space-y-2">
        {modules.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            title={item.label}
            className={`w-full px-2 py-3 flex flex-col items-center transition-all duration-200 group relative ${
              activeModule === item.name
                ? "bg-sigomap-vert text-sigomap-blanc"
                : "text-sigomap-gris-dark hover:bg-sigomap-vert/10 hover:text-sigomap-vert-dark"
            }`}
          >
            <item.icon
              className={`h-7 w-7 mb-1.5 transition-colors duration-200 ${
                activeModule === item.name
                  ? "text-sigomap-blanc"
                  : "text-sigomap-gris group-hover:text-sigomap-vert-dark"
              }`}
            />
            <span
              className={`text-[10px] font-semibold tracking-wider text-center leading-tight ${
                activeModule === item.name
                  ? "text-sigomap-blanc"
                  : "text-sigomap-gris group-hover:text-sigomap-vert-dark"
              }`}
            >
              {item.name}
            </span>
            {activeModule === item.name && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-sigomap-blanc rounded-r"></div>
            )}
          </Link>
        ))}
      </div>
      <div className="border-t border-sigomap-gris-light py-3 space-y-1">
        <Link
          href="/help"
          className="w-full px-2 py-2 flex flex-col items-center text-sigomap-gris hover:text-sigomap-vert-dark transition-colors duration-200 group"
        >
          <CircleHelp className="h-5 w-5 mb-1 text-sigomap-gris group-hover:text-sigomap-vert-dark transition-colors duration-200" />
          <span className="text-[7px] font-light text-center leading-tight">Aide</span>
        </Link>
        <Link
          href="/logout"
          className="w-full px-2 py-2 flex flex-col items-center text-sigomap-gris hover:text-sigomap-vert-dark transition-colors duration-200 group"
        >
          <LogOut className="h-5 w-5 mb-1 text-sigomap-gris group-hover:text-sigomap-vert-dark transition-colors duration-200" />
          <span className="text-[7px] font-light text-center leading-tight">
            Déconnexion
          </span>
        </Link>
      </div>
    </div>
  )
}
