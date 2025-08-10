// src/views/tenders/TenderPaymentSuccessPage.tsx
import { Link, useParams, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowLeft, Download, FileText, CreditCard, Smartphone } from "lucide-react";

const TenderPaymentSuccessPage = () => {
  const { tenderId } = useParams();
  const [searchParams] = useSearchParams();
  const method = searchParams.get("method") || "unknown";
  const amount = searchParams.get("amount") || "50000";
  const tx = searchParams.get("tx") || `TX-${Date.now()}`;

  const methodLabel = method === "card" ? "Carte bancaire" : method === "orange" ? "Orange Money" : "Inconnu";

  const downloadReceipt = () => {
    // Pour l'instant, nous utilisons la boîte d'impression du navigateur (PDF possible)
    window.print();
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
        <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-light-gray-7 border border-border">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-white text-[10px]">3</span>
          Succès
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm print:shadow-none print:border-0">
        <div className="flex items-start gap-3 mb-6">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Paiement effectué avec succès</h1>
            <p className="text-sm text-muted-foreground mt-1">Conservez ce reçu pour vos dossiers.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Référence AO</p>
                <p className="font-mono">{tenderId}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Montant</p>
                <p className="font-semibold">{Number(amount).toLocaleString('fr-FR')} FCFA</p>
              </div>
              <div>
                <p className="text-muted-foreground">Méthode</p>
                <p className="inline-flex items-center gap-2">
                  {method === 'card' ? (<CreditCard className="w-4 h-4" />) : (<Smartphone className="w-4 h-4" />)}
                  {methodLabel}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Transaction</p>
                <p className="font-mono">{tx}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Date</p>
                <p>{new Date().toLocaleString('fr-FR')}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={downloadReceipt}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
            >
              <Download className="w-4 h-4" /> Télécharger le reçu (PDF)
            </button>
            <a
              href={`/tenders/${tenderId}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <FileText className="w-4 h-4" /> Revenir au détail de l'AO
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          Ce reçu est généré automatiquement. Pour une facture officielle, consultez la rubrique Mes achats.
        </div>
      </div>
    </div>
  );
};

export default TenderPaymentSuccessPage;


