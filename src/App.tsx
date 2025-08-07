import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './views/auth/LoginPage';
import AdhesionPage from './views/auth/AdhesionPage';
import PublicationsPage from './views/publications/PublicationsPage';
import DashboardPage from './views/dashboard/DashboardPage';
import TenderListPage from './views/tenders/TenderListPage';
import TenderDetailPage from './views/tenders/TenderDetailPage';
import TenderPurchasePage from './views/tenders/TenderPurchasePage';
import UserListPage from './views/admin/UserListPage';
import CreateUserPage from './views/admin/CreateUserPage';
import AdminSettingsPage from './views/admin/AdminSettingsPage';
import UserDetailPage from './views/admin/UserDetailPage';
import CompanyPage from './views/company/CompanyPage';
import ModernLayout from './components/layout/ModernLayout';

// Import des nouvelles pages SIGOMAP
import CreateUserAccountPage from './views/account/CreateUserPage';
import UserListAccountPage from './views/account/UserListPage';
import UserDetailAccountPage from './views/account/UserDetailPage';
import AcquisitionsPage from './views/account/AcquisitionsPage';
import PassationPlansPage from './views/operations/PassationPlansPage';
import InvitationsPage from './views/my-offers/InvitationsPage';
import MyMarketsPage from './views/my-markets/MyMarketsPage';

// Import des nouvelles pages "Mes marchés"
import MarketDetailsPage from './views/my-markets/MarketDetailsPage';
import MarketExecutionPage from './views/my-markets/MarketExecutionPage';
import MarketDocumentsPage from './views/my-markets/MarketDocumentsPage';
import MarketReportsPage from './views/my-markets/MarketReportsPage';

// Import des nouvelles pages pour les modules du header
import MarchesPage from './views/marches/MarchesPage';
import SoumissionsPage from './views/soumissions/SoumissionsPage';
import DocumentsPage from './views/documents/DocumentsPage';
import NotificationsPage from './views/notifications/NotificationsPage';

export type AppSection = 'DASHBOARD' | 'ACCOUNT' | 'OPERATIONS' | 'TENDERS' | 'MY_OFFERS' | 'MY_MARKETS' | 'ADMIN' | 'COMPANY';

function App() {
  const isAuthenticated = true;

  return (
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
  );
}

export default App;
