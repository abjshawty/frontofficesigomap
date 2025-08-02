// src/views/tenders/TenderPurchasePage.tsx
import { Link } from "react-router-dom";

const TenderPurchasePage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Link to="/tenders" className="text-emerald-600 hover:underline text-sm">&larr; Retour à la liste</Link>

      <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-6">Acquisition du dossier d'appel d'offres</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Paiement par carte bancaire</h3>
            <p className="text-sm text-gray-600 mb-4">Paiement sécurisé via notre partenaire de paiement.</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Paiement sécurisé SSL</li>
              <li>• Reçu immédiat</li>
              <li>• Support 24/7</li>
            </ul>
          </div>
          <button className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold mt-4">
            Payer par carte (50 000 FCFA)
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Paiement par mobile money</h3>
            <p className="text-sm text-gray-600 mb-4">Paiement rapide via Orange Money ou MTN Mobile Money.</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Paiement instantané</li>
              <li>• Pas de frais supplémentaires</li>
              <li>• Reçu par SMS</li>
            </ul>
          </div>
          <button className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold mt-4">
            Payer par mobile money (50 000 FCFA)
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenderPurchasePage; 