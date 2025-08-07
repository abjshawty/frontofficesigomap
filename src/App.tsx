import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ModernLayout from './components/layout/ModernLayout';

const LoadingIndicator = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="text-xl text-gray-500">Chargement de la page...</div>
  </div>
);

// --- Importations "paresseuses" des pages ---
const LoginPage = lazy(() => import('./views/auth/LoginPage'));
const AdhesionPage = lazy(() => import('./views/auth/AdhesionPage'));
const PublicationsPage = lazy(() => import('./views/publications/PublicationsPage'));
const DashboardPage = lazy(() => import('./views/dashboard/DashboardPage'));
const TenderListPage = lazy(() => import('./views/tenders/TenderListPage'));
const TenderDetailPage = lazy(() => import('./views/tenders/TenderDetailPage'));
const TenderPurchasePage = lazy(() => import('./views/tenders/TenderPurchasePage'));
const UserListPage = lazy(() => import('./views/admin/UserListPage'));
const CreateUserPage = lazy(() => import('./views/admin/CreateUserPage'));
const AdminSettingsPage = lazy(() => import('./views/admin/AdminSettingsPage'));
const UserDetailPage = lazy(() => import('./views/admin/UserDetailPage'));
const CompanyPage = lazy(() => import('./views/company/CompanyPage'));
const CreateUserAccountPage = lazy(() => import('./views/account/CreateUserPage'));
const UserListAccountPage = lazy(() => import('./views/account/UserListPage'));
const UserDetailAccountPage = lazy(() => import('./views/account/UserDetailPage'));
const AcquisitionsPage = lazy(() => import('./views/account/AcquisitionsPage'));
const PassationPlansPage = lazy(() => import('./views/operations/PassationPlansPage'));
const InvitationsPage = lazy(() => import('./views/my-offers/InvitationsPage'));
const MyMarketsPage = lazy(() => import('./views/my-markets/MyMarketsPage'));
const MarketDetailsPage = lazy(() => import('./views/my-markets/MarketDetailsPage'));
const MarketExecutionPage = lazy(() => import('./views/my-markets/MarketExecutionPage'));
const MarketDocumentsPage = lazy(() => import('./views/my-markets/MarketDocumentsPage'));
const MarketReportsPage = lazy(() => import('./views/my-markets/MarketReportsPage'));
const MarchesPage = lazy(() => import('./views/marches/MarchesPage'));
const SoumissionsPage = lazy(() => import('./views/soumissions/SoumissionsPage'));
const DocumentsPage = lazy(() => import('./views/documents/DocumentsPage'));
const NotificationsPage = lazy(() => import('./views/notifications/NotificationsPage'));

export type AppSection = 'DASHBOARD' | 'ACCOUNT' | 'OPERATIONS' | 'TENDERS' | 'MY_OFFERS' | 'MY_MARKETS' | 'ADMIN' | 'COMPANY';

function App() {
  const isAuthenticated = true;

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Routes>
        {/* Routes publiques sans layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adhesion" element={<AdhesionPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        {/* Route directe vers le dashboard, qui fonctionnera aussi dans le layout */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* --- Layout principal pour toutes les pages de l'espace connecté --- */}
        <Route 
          path="/" 
          element={isAuthenticated ? <ModernLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate to="/dashboard" />} />
          
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* Routes Gestion du Compte */}
          <Route path="account/create-user" element={<CreateUserAccountPage />} />
          <Route path="account/users" element={<UserListAccountPage />} />
          <Route path="account/users/:userId" element={<UserDetailAccountPage />} />
          <Route path="account/acquisitions" element={<AcquisitionsPage />} />
          
          {/* Routes Opérations de Marché */}
          <Route path="operations/passation-plans" element={<PassationPlansPage />} />
          <Route path="operations/general-plans" element={<PassationPlansPage />} />
          
          {/* Routes Avis d'Appel d'Offres */}
          <Route path="tenders" element={<TenderListPage />} />
          <Route path="tenders/:tenderId" element={<TenderDetailPage />} />
          <Route path="tenders/:tenderId/purchase" element={<TenderPurchasePage />} />
          
          {/* Routes Mes Offres */}
          <Route path="my-offers/invitations" element={<InvitationsPage />} />
          <Route path="my-offers/procedures" element={<InvitationsPage />} />
          
          {/* Routes Mes Marchés */}
          <Route path="my-markets" element={<MyMarketsPage />} />
          <Route path="my-markets/details" element={<MarketDetailsPage />} />
          <Route path="my-markets/execution" element={<MarketExecutionPage />} />
          <Route path="my-markets/documents" element={<MarketDocumentsPage />} />
          <Route path="my-markets/reports" element={<MarketReportsPage />} />
          
          {/* Routes Administration */}
          <Route path="admin/users" element={<UserListPage />} />
          <Route path="admin/users/create" element={<CreateUserPage />} />
          <Route path="admin/users/:userId" element={<UserDetailPage />} />
          <Route path="admin/settings" element={<AdminSettingsPage />} />
          
          {/* Routes Entreprise */}
          <Route path="company" element={<CompanyPage />} />

          {/* Routes pour les modules du header - Marchés */}
          <Route path="marches" element={<MarchesPage />} />
          <Route path="marches/liste" element={<MarchesPage />} />
          <Route path="marches/details" element={<MarchesPage />} />
          <Route path="marches/execution" element={<MarchesPage />} />

          {/* Routes pour les modules du header - Soumissions */}
          <Route path="soumissions" element={<SoumissionsPage />} />
          <Route path="soumissions/liste" element={<SoumissionsPage />} />
          <Route path="soumissions/nouvelle" element={<SoumissionsPage />} />
          <Route path="soumissions/suivi" element={<SoumissionsPage />} />

          {/* Routes pour les modules du header - Documents */}
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="documents/liste" element={<DocumentsPage />} />
          <Route path="documents/upload" element={<DocumentsPage />} />
          <Route path="documents/templates" element={<DocumentsPage />} />

          {/* Routes pour les modules du header - Notifications */}
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="notifications/liste" element={<NotificationsPage />} />
          <Route path="notifications/parametres" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
