"use client"

import { Input } from "@/components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"

export function UserFilters() {
  return (
    <div className="p-6 pt-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-light">Recherche</label>
                <Input placeholder="Nom, email, téléphone..." />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-light">Statut</label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="actif">Actif</SelectItem>
                        <SelectItem value="inactif">Inactif</SelectItem>
                        <SelectItem value="en-attente">En attente</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-light">Rôle</label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Tous les rôles" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les rôles</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-light">Genre</label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Tous les genres" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les genres</SelectItem>
                        <SelectItem value="male">Homme</SelectItem>
                        <SelectItem value="female">Femme</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
  )
}
