import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface OrangeMoneyModalProps {
  open: boolean;
  amount: number;
  beneficiaryRef: string;
  onClose: () => void;
  onSuccess: (payload: { reference: string }) => void;
}

const OrangeMoneyModal: React.FC<OrangeMoneyModalProps> = ({ open, amount, beneficiaryRef, onClose, onSuccess }) => {
  const [msisdn, setMsisdn] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const canSubmit = msisdn.length === 10 && otp.length === 4;

  return (
    <Dialog open={open} onOpenChange={(v)=> !v && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-base">Votre commande</DialogTitle>
          <p className="text-xs text-muted-foreground">Montant: {amount.toLocaleString('fr-FR')} FCFA | Bénéficiaire: {beneficiaryRef}</p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Confirmation de paiement</h3>
            <div className="space-y-2">
              <label className="text-sm">Numéro de mobile (10 chiffres) *</label>
              <input value={msisdn} onChange={(e)=>setMsisdn(e.target.value)} className="w-full border rounded-md px-3 py-2" placeholder="07XXXXXXXX" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Code de paiement (4 chiffres) *</label>
              <input value={otp} onChange={(e)=>setOtp(e.target.value)} className="w-32 border rounded-md px-3 py-2" placeholder="1234" />
              <p className="text-xs text-muted-foreground">Ouvrez l'app Orange Money Afrique ► Mon compte, ou composez le #144*82# pour générer un code.</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={onClose}>Annuler la transaction</Button>
              <Button disabled={!canSubmit} onClick={()=> onSuccess({ reference: `OM-${Date.now()}` })}>Confirmer</Button>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="font-semibold mb-2">Gerer votre argent simplement avec l'application Orange Money</h3>
            <div className="h-48 bg-light-gray-7 flex items-center justify-center">QR Code</div>
            <div className="mt-3 text-xs text-muted-foreground">Flashez le QR Code et téléchargez l'application Orange Money ici.</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrangeMoneyModal;


