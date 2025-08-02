import React from 'react';
import { useParams, Link } from 'react-router-dom';


const mockUser = {
  id: 1, 
  name: 'Jean Dupont', 
  email: 'jean.dupont@example.com', 
  status: 'active',
  role: 'Administrateur',
  lastLogin: '21/07/2025 11:53',
  createdAt: '15/01/2024',
  permissions: ['Gestion des utilisateurs', 'Administration système', 'Lecture des rapports'],
  functions: [
    { id: 'f1', name: 'EMA_ADMIN - Administrateur du compte Espace Entreprise', date: '21/07/2025 11:53' },
  ]
};

const UserDetailPage: React.FC = () => {
  const { userId: _userId } = useParams<{ userId: string }>();

  // Dans une vraie application, vous feriez un appel API ici avec userId
  const user = mockUser; 

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link to="/admin/users" className="text-emerald-600 hover:underline text-sm">
          &larr; Retour à la liste
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Détails de l'utilisateur</h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations générales</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                  <dd className="text-sm text-gray-900">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Rôle</dt>
                  <dd className="text-sm text-gray-900">{user.role}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Statut</dt>
                  <dd className="text-sm text-gray-900">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {user.status === "active" ? "Actif" : "Inactif"}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations de connexion</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Dernière connexion</dt>
                  <dd className="text-sm text-gray-900">{user.lastLogin}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Compte créé le</dt>
                  <dd className="text-sm text-gray-900">{user.createdAt}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Permissions</dt>
                  <dd className="text-sm text-gray-900">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="inline-flex px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button className="bg-emerald-600 text-white py-2 px-4 border border-transparent rounded-md text-sm font-medium hover:bg-emerald-700">
              Modifier l'utilisateur
            </button>
            <button className="bg-gray-200 text-gray-700 py-2 px-4 border border-transparent rounded-md text-sm font-medium hover:bg-gray-300">
              Réinitialiser le mot de passe
            </button>
            <button className="bg-red-600 text-white py-2 px-4 border border-transparent rounded-md text-sm font-medium hover:bg-red-700">
              Désactiver l'utilisateur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;