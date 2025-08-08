// src/views/tenders/TenderPaymentOptionsPage.tsx
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";

const TenderPaymentOptionsPage = () => {
  const { tenderId } = useParams();
  const navigate = useNavigate();

  const go = (method: "card" | "orange") => {
    navigate(`/tenders/${tenderId}/purchase/confirm?method=${method}`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Link to="/tenders" className="text-primary hover:underline text-sm">&larr; Retour à la liste</Link>

      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">Achat du dossier d'appel à la concurrence</h1>

      {/* Informations clés */}
      <Card className="rounded-2xl border-slate-200 shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="text-base">Informations clés</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Référence de l'appel d'offres</span>
            <div className="font-mono">{tenderId}</div>
          </div>
          <div className="md:col-span-2">
            <span className="text-muted-foreground">Objet de l'appel d'offres</span>
            <div>Équipement des établissements primaires publics de la Région en mobiliers scolaires ...</div>
          </div>
          <div>
            <span className="text-muted-foreground">Montant de l'achat</span>
            <div className="font-semibold">50 000 FCFA</div>
          </div>
        </CardContent>
      </Card>

      {/* Choix de paiement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Achat par carte bancaire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Cliquez sur le bouton pour être redirigé vers la page de saisie de vos informations.
            </p>
            <button onClick={() => go("card")} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">
              Payer par carte bancaire
            </button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Achat par Orange Money</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Cliquez sur le bouton pour être redirigé vers la page de confirmation Orange Money.
            </p>
            <button onClick={() => go("orange")} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">
              Payer par Orange Money
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenderPaymentOptionsPage;


