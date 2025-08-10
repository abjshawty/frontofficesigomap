// src/views/tenders/TenderPurchasePage.tsx
import React from 'react';
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowLeft, ShieldCheck, CreditCard, Smartphone } from "lucide-react";
import CardPaymentModal from "../../components/payments/CardPaymentModal";
import OrangeMoneyModal from "../../components/payments/OrangeMoneyModal";

const TenderPurchasePage = () => {
  const { tenderId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const method = searchParams.get("method");

  const methodLabel = method === "card"
    ? "Carte bancaire"
    : method === "orange"
      ? "Orange Money"
      : "Méthode non spécifiée";

  const [openCard, setOpenCard] = React.useState(false);
  const [openOM, setOpenOM] = React.useState(false);

  const confirm = () => {
    // Simulation d'un paiement réussi: redirection vers la page de succès
    const amount = 50000;
    const tx = `TX-${Date.now()}`;
    navigate(`/tenders/${tenderId}/purchase/success?method=${method || 'card'}&amount=${amount}&tx=${tx}`);
  };

  const cancel = () => {
    navigate(`/tenders/${tenderId}/purchase/failure?method=${method || 'card'}&reason=cancel`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-8 px-0">
      <Link to={`/tenders/${tenderId}`} className="inline-flex items-center gap-2 text-primary hover:underline text-sm">
        <ArrowLeft className="w-4 h-4" /> Retour au détail
      </Link>

      {/* Stepper d'avancement */}
      <div className="mt-4 mb-6 flex items-center gap-3 text-xs text-muted-foreground" aria-label="Progression de l'achat">
        <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white border border-border opacity-80">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-300 text-white text-[10px]">1</span>
          Choix du mode de paiement
        </span>
        <span className="h-px w-6 bg-border" aria-hidden="true" />
        <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-light-gray-7 border border-border">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-white text-[10px]">2</span>
          Confirmation
        </span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Confirmation de l'achat du dossier</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Référence de l'appel d'offres</span>
            <div className="font-mono">{tenderId}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Montant de l'achat</span>
            <div className="font-semibold">50 000 FCFA</div>
          </div>
          <div>
            <span className="text-muted-foreground">Méthode de paiement</span>
            <div className="font-medium">{methodLabel}</div>
          </div>
        </div>

        {method === null && (
          <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
            Aucune méthode n'a été sélectionnée. Veuillez choisir un mode de paiement.
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4" /> Paiement chiffré et sécurisé
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => (method === 'card' ? setOpenCard(true) : setOpenOM(true))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {method === 'card' ? <CreditCard className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />} Modifier la méthode
            </button>
            <Link to={`/tenders/${tenderId}/purchase`} className="px-3 py-2 rounded-lg text-xs text-muted-foreground hover:underline">
              Changer de mode
            </Link>
          </div>
          <button
            onClick={confirm}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40"
            disabled={!method}
          >
            <CheckCircle2 className="w-4 h-4" /> Confirmer et payer
          </button>
          <button
            onClick={cancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenderPurchasePage;

// Modales contextualisées
// Placées après l'export pour conserver la logique de la page simple
// mais rendues dans le JSX via Portals contenus dans Dialog