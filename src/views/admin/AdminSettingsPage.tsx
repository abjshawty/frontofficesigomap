import React from 'react';
import InfoCard from '../../components/InfoCard';

const AdminSettingsPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Paramètres de l'Administration
      </h1>

      <div className="space-y-6">
        <InfoCard title="Configuration Générale">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-gray-900">Mode Maintenance</h3>
                <p className="text-sm text-gray-500">Activer pour suspendre l'accès public à la plateforme.</p>
              </div>
              <button className="bg-red-600 text-white py-2 px-4 border border-transparent rounded-md text-sm font-medium hover:bg-red-700">
                Activer le mode maintenance
              </button>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Sécurité et Accès">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-gray-900">Politique de mots de passe</h3>
                <p className="text-sm text-gray-500">Définir les exigences pour les mots de passe des utilisateurs.</p>
              </div>
              <button className="bg-white py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Configurer la politique
              </button>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-gray-900">Journaux d'audit</h3>
                <p className="text-sm text-gray-500">Consulter les actions critiques effectuées sur la plateforme.</p>
              </div>
              <button className="bg-white py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Voir les journaux
              </button>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default AdminSettingsPage;