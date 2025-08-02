// src/navigation.data.ts
import { CompanyIcon, SettingsIcon, TendersIcon, UsersIcon, DashboardIcon, AdminMainIcon, FileTextIcon, ShoppingCartIcon, UserPlusIcon, BuildingIcon } from "./components/icons.tsx";
import { NavModule } from "./components/SecondarySidebar";

// --- Navigation Principale (Sidebar gauche) ---
export const primaryNavigation = [
    { id: 'DASHBOARD', text: 'ACCUEIL', icon: DashboardIcon },
    { id: 'ACCOUNT', text: 'GESTION COMPTE', icon: UsersIcon },
    { id: 'OPERATIONS', text: 'OPÉRATIONS MARCHÉ', icon: FileTextIcon },
    { id: 'TENDERS', text: 'AVIS APPELS OFFRES', icon: TendersIcon },
    { id: 'MY_OFFERS', text: 'MES OFFRES', icon: ShoppingCartIcon },
    { id: 'MY_MARKETS', text: 'MES MARCHÉS', icon: BuildingIcon },
    { id: 'ADMIN', text: 'ADMIN', icon: AdminMainIcon },
    { id: 'COMPANY', text: 'ENTREPRISE', icon: CompanyIcon },
];

// --- Navigation Secondaire (dépend de la sélection principale) ---
export const secondaryNavigationData: NavModule[] = [
    {
        id: 'DASHBOARD',
        title: 'Tableau de Bord',
        subItems: [] // Le tableau de bord n'a pas de sous-menu
    },
    {
        id: 'ACCOUNT',
        title: 'Gestion du Compte',
        subItems: [
            { id: 'create-user', text: 'Créer un utilisateur', icon: UserPlusIcon, path: '/account/create-user' },
            { id: 'users-list', text: 'Liste des utilisateurs', icon: UsersIcon, path: '/account/users' },
            { id: 'acquisitions', text: 'Acquisitions réalisées', icon: ShoppingCartIcon, path: '/account/acquisitions' },
        ]
    },
    {
        id: 'OPERATIONS',
        title: 'Opérations de Marché à Venir',
        subItems: [
            { id: 'passation-plans', text: 'Plans de passation', icon: FileTextIcon, path: '/operations/passation-plans' },
            { id: 'general-plans', text: 'Plans généraux', icon: FileTextIcon, path: '/operations/general-plans' },
        ]
    },
    {
        id: 'TENDERS',
        title: 'Avis d\'Appel d\'Offres',
        subItems: [
            { id: 'tenders-list', text: 'Liste des A.O.', icon: TendersIcon, path: '/tenders' },
        ]
    },
    {
        id: 'MY_OFFERS',
        title: 'Mes Offres',
        subItems: [
            { id: 'invitations', text: 'Invitations restreintes', icon: TendersIcon, path: '/my-offers/invitations' },
            { id: 'procedures', text: 'Mes procédures en cours', icon: FileTextIcon, path: '/my-offers/procedures' },
        ]
    },
    {
        id: 'MY_MARKETS',
        title: 'Mes Marchés',
        subItems: [
            { id: 'my-markets-list', text: 'Liste de mes marchés', icon: BuildingIcon, path: '/my-markets' },
            { id: 'market-details', text: 'Détails des marchés', icon: BuildingIcon, path: '/my-markets/details' },
            { id: 'market-execution', text: 'Exécution des marchés', icon: BuildingIcon, path: '/my-markets/execution' },
            { id: 'market-documents', text: 'Documents contractuels', icon: FileTextIcon, path: '/my-markets/documents' },
            { id: 'market-reports', text: 'Rapports d\'exécution', icon: FileTextIcon, path: '/my-markets/reports' },
        ]
    },
    {
        id: 'ADMIN',
        title: 'Administration',
        subItems: [
            { id: 'admin-settings', text: 'Paramètres', icon: SettingsIcon, path: '/admin/settings' },
            { id: 'admin-users', text: 'Utilisateurs', icon: UsersIcon, path: '/admin/users' },
        ]
    },
    {
        id: 'COMPANY',
        title: 'Compte Entreprise',
        subItems: [
            { id: 'company-details', text: 'Informations', icon: CompanyIcon, path: '/company' },
        ]
    },
]; 