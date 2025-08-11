import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface CardPaymentModalProps {
  open: boolean;
  amount: number;
  onClose: () => void;
  onSuccess: (payload: { token: string }) => void;
}

const CardPaymentModal: React.FC<CardPaymentModalProps> = ({ open, amount, onClose, onSuccess }) => {
  const [card, setCard] = React.useState("");
  const [mm, setMm] = React.useState("");
  const [yy, setYy] = React.useState("");
  const [name, setName] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  const canSubmit = card.length >= 12 && mm !== "" && yy !== "" && name.trim().length > 2 && cvv.length >= 3;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <div className="border-b px-4 py-3 flex items-center justify-between">
          <div>
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">preprod.sigomap.gouv.ci</DialogTitle>
            </DialogHeader>
            <p className="text-xs text-muted-foreground">{amount.toLocaleString('fr-FR')} XOF</p>
          </div>
          <div className="text-xs text-muted-foreground" aria-live="polite">Il vous reste 13:18 pour ce paiement</div>
        </div>

        <div className="px-4 py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Numéro de carte <span aria-hidden>*</span></label>
            <input value={card} onChange={(e)=>setCard(e.target.value)} className="w-full border rounded-md px-3 py-2" placeholder="•••• •••• •••• ••••" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mois d'expiration <span aria-hidden>*</span></label>
              <input value={mm} onChange={(e)=>setMm(e.target.value)} className="w-full border rounded-md px-3 py-2" placeholder="MM" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Année d'expiration <span aria-hidden>*</span></label>
              <input value={yy} onChange={(e)=>setYy(e.target.value)} className="w-full border rounded-md px-3 py-2" placeholder="AA" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Nom du titulaire de la carte <span aria-hidden>*</span></label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded-md px-3 py-2" placeholder="NOM PRÉNOM" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Code de sécurité <span aria-hidden>*</span></label>
            <input value={cvv} onChange={(e)=>setCvv(e.target.value)} className="w-28 border rounded-md px-3 py-2" placeholder="CVV" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={onClose}>Annuler</Button>
            <Button disabled={!canSubmit} onClick={()=> onSuccess({ token: 'mock-card-token' })}>Suivant</Button>
          </div>
          <p className="text-[10px] text-right text-muted-foreground">Powered by <span aria-hidden>VISA / Mastercard</span></p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardPaymentModal;


