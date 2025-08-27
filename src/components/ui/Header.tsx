"use client"

import { Bell, Search, Menu, Shield, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Input } from "./Input"

export function Header() {
  return (
    <header className="h-16 bg-sigomap-blanc flex items-center justify-between px-4 lg:px-8 border-b border-sigomap-gris-light relative z-50">
      <div className="flex items-center space-x-4 lg:space-x-6">
        <Button variant="ghost" size="icon" className="lg:hidden p-2 hover:bg-sigomap-vert/5 rounded-lg transition-colors duration-200 group">
          <Menu className="w-6 h-6 text-sigomap-gris-dark transition-transform duration-300" />
        </Button>
        <div className="flex lg:hidden items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-sigomap-blanc to-sigomap-bg-primary rounded-sm flex items-center justify-center p-1 border border-sigomap-orange/50">
            <img src="/assets/logo/logo_dgmp.ico" alt="SIGOMAP Logo" className="h-full w-auto object-contain" />
          </div>
          <div className="text-sm font-medium text-sigomap-gris-dark">SIGOMAP</div>
        </div>
        <div className="relative hidden lg:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sigomap-gris" />
          <Input
            className="flex rounded-md bg-sigomap-blanc px-4 py-3 text-sm placeholder:text-sigomap-gris focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-sigomap-blanc-gris w-80 xl:w-96 h-9 pl-11 font-light tracking-wide border border-sigomap-gris-light hover:border-sigomap-vert focus:border-sigomap-vert focus:ring-sigomap-vert/20 transition-colors duration-200"
            placeholder="Rechercher dans SIGOMAP..."
            type="search"
          />
        </div>
      </div>
      <div className="flex items-center space-x-3 lg:space-x-6">
        <Button variant="ghost" size="icon" className="lg:hidden hover:bg-sigomap-vert/5 h-9 w-9">
             <Search className="h-5 w-5 text-sigomap-gris" />
        </Button>

        <div className="hidden xl:flex items-center space-x-4">
          
          <div className="w-px h-8 bg-sigomap-gris-light"></div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-sigomap-vert/5 h-9 w-9 border border-transparent hover:border-sigomap-vert/20">
          <Bell className="h-5 w-5 text-sigomap-gris" />
          <div className="font-medium tracking-wide text-sigomap-blanc absolute -top-1 -right-1 h-5 w-5 rounded-sm p-0 text-xs bg-sigomap-orange hover:bg-sigomap-orange-dark border-0 flex items-center justify-center">
            3
          </div>
        </Button>
        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className="hidden lg:block text-right">
            <p className="text-sm font-light text-sigomap-gris-dark tracking-wide">Administrateur SIGOMAP</p>
            <p className="text-xs font-light text-sigomap-gris tracking-wide hidden xl:block">admin@sigomap.gouv.ci</p>
          </div>

          <div className="hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 h-8 px-3 text-xs font-medium border-sigomap-gris-light hover:border-sigomap-vert hover:bg-sigomap-bg-primary/20 transition-colors">
                  <Shield className="h-3 w-3 text-sigomap-vert" />
                  <span className="max-w-[120px] truncate">ADMIN_SYSTEM</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                    <DropdownMenuItem>Changer de rôle</DropdownMenuItem>
                    <DropdownMenuItem>Permissions</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-9 w-9 lg:h-10 lg:w-10 rounded-sm bg-gradient-to-br from-sigomap-vert to-sigomap-vert-dark flex items-center justify-center border-2 border-sigomap-blanc">
                    <span className="text-xs lg:text-sm font-light text-sigomap-blanc tracking-wide">AS</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin SIGOMAP</p>
                  <p className="text-xs leading-none text-sigomap-gris">admin@sigomap.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
