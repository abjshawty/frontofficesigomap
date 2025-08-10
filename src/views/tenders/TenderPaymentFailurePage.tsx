// src/views/tenders/TenderPaymentFailurePage.tsx
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, RefreshCcw, LifeBuoy, Smartphone, CreditCard } from "lucide-react";

const TenderPaymentFailurePage = () => {
  const { tenderId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const method = searchParams.get("method") || "unknown";
  const reason = searchParams.get("reason") || "cancel"; // cancel | failed

  const methodLabel = method === "card" ? "Carte bancaire" : method === "orange" ? "Orange Money" : "Méthode inconnue";

  const retry = () => {
    navigate(`/tenders/${tenderId}/purchase/confirm?method=${method}`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-8 px-0">
      <Link to={`/tenders/${tenderId}`} className="inline-flex items-center gap-2 text-primary hover:underline text-sm">
        <ArrowLeft className="w-4 h-4" /> Retour au détail
      </Link>

      {/* Stepper */}
      <div className="mt-4 mb-6 flex items-center gap-3 text-xs text-muted-foreground" aria-label="Progression de l'achat">
        <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white border border-border opacity-80">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-300 text-white text-[10px]">1</span>
          Choix du mode
        </span>
        <span className="h-px w-6 bg-border" aria-hidden="true" />
        <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white border border-border opacity-80">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-300 text-white text-[10px]">2</span>
          Confirmation
        </span>
        <span className="h-px w-6 bg-border" aria-hidden="true" />
        <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-red-50 border border-red-200 text-red-700">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-600 text-white text-[10px]">3</span>
          Échec / Annulation
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paiement non finalisé</h1>
            <p className="text-sm text-muted-foreground mt-1">{reason === 'cancel' ? 'Vous avez annulé la transaction.' : 'La transaction a échoué.'} Méthode: {methodLabel}.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="text-sm bg-light-gray-7 border border-border rounded-md p-4">
              <p className="font-medium mb-1">Conseils pour réussir votre paiement</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Vérifiez votre connexion et réessayez.</li>
                <li>Assurez-vous des informations saisies (numéro de carte, date, CVV ou code OM).</li>
                <li>Si besoin, changez de méthode de paiement.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={retry}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
            >
              <RefreshCcw className="w-4 h-4" /> Réessayer avec {methodLabel}
            </button>
            <Link
              to={`/tenders/${tenderId}/purchase`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {method === 'card' ? <Smartphone className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />} Changer de mode
            </Link>
            <div className="text-xs text-muted-foreground inline-flex items-center gap-2">
              <LifeBuoy className="w-4 h-4" /> Besoin d'aide ? Contactez le support.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderPaymentFailurePage;


