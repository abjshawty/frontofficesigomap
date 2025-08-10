// src/views/tenders/TenderPaymentOptionsPage.tsx
import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { CreditCard, Smartphone, ShieldCheck, HelpCircle, Lock, ArrowRight } from "lucide-react";
import CardPaymentModal from "../../components/payments/CardPaymentModal";
import OrangeMoneyModal from "../../components/payments/OrangeMoneyModal";

const TenderPaymentOptionsPage = () => {
  const { tenderId } = useParams();
  const navigate = useNavigate();
  const [openCard, setOpenCard] = React.useState(false);
  const [openOM, setOpenOM] = React.useState(false);

  // go conservé si besoin de deep-link sans modale

  return (
    <div className="max-w-screen-2xl mx-auto py-8 px-0">
      <Link to="/tenders" className="text-primary hover:underline text-sm">&larr; Retour à la liste</Link>

      {/* Stepper d'avancement */}
      <div className="mt-4 mb-6 flex items-center gap-3 text-xs text-muted-foreground" aria-label="Progression de l'achat">
        <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-light-gray-7 border border-border">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-white text-[10px]">1</span>
          Choix du mode de paiement
        </span>
        <span className="h-px w-6 bg-border" aria-hidden="true" />
        <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white border border-border opacity-60">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-300 text-white text-[10px]">2</span>
          Confirmation
        </span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Achat du dossier d'appel à la concurrence</h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="xl:col-span-2 space-y-6" role="region" aria-labelledby="section-options">
          {/* Informations clés */}
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle id="section-options" className="text-base">Informations clés</CardTitle>
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
            <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><CreditCard className="w-4 h-4" /> Achat par carte bancaire</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Saisie sécurisée de vos informations de carte.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                  <li>Traitement chiffré <span className="inline-flex items-center gap-1"><Lock className="w-3 h-3" />SSL</span></li>
                  <li>Reçu immédiat</li>
                  <li>Support 24/7</li>
                </ul>
                <button
                  onClick={() => setOpenCard(true)}
                  aria-label="Payer le dossier par carte bancaire"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  Payer par carte bancaire
                  <ArrowRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Smartphone className="w-4 h-4" /> Achat par Orange Money</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Confirmation rapide via votre wallet mobile.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                  <li>Validation instantanée</li>
                  <li>Sans frais supplémentaires</li>
                  <li>Reçu par SMS</li>
                </ul>
                <button
                  onClick={() => setOpenOM(true)}
                  aria-label="Payer le dossier par Orange Money"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  Payer par Orange Money
                  <ArrowRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Colonne latérale */}
        <aside className="space-y-6" aria-label="Aide et sécurité">
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Résumé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">Prix du dossier</span>
                <span className="font-semibold">50 000 FCFA</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Taxes et frais inclus. Aucun coût caché.
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="p-6 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Paiement sécurisé</p>
                <p className="text-muted-foreground">Données chiffrées et protégées. Conformes aux bonnes pratiques.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="p-6 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-slate-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Besoin d'aide ?</p>
                <p className="text-muted-foreground">Consultez la FAQ ou contactez le support.</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Modales de paiement */}
      <CardPaymentModal
        open={openCard}
        amount={50000}
        onClose={() => {
          setOpenCard(false);
          navigate(`/tenders/${tenderId}/purchase/failure?method=card&reason=cancel`);
        }}
        onSuccess={({ token }) => {
          setOpenCard(false);
          navigate(`/tenders/${tenderId}/purchase/confirm?method=card&token=${token}`);
        }}
      />
      <OrangeMoneyModal
        open={openOM}
        amount={50000}
        beneficiaryRef={tenderId || ''}
        onClose={() => {
          setOpenOM(false);
          navigate(`/tenders/${tenderId}/purchase/failure?method=orange&reason=cancel`);
        }}
        onSuccess={({ reference }) => {
          setOpenOM(false);
          navigate(`/tenders/${tenderId}/purchase/confirm?method=orange&ref=${reference}`);
        }}
      />
    </div>
  );
};

export default TenderPaymentOptionsPage;


