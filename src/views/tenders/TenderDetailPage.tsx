
import { Link, useParams } from "react-router-dom";
import InfoCard from "../../components/InfoCard";

const TenderDetailPage = () => {
  const { tenderId } = useParams();

  // TODO: fetch data; temporary mock
  const data = {
    ref: tenderId,
    object: "Réhabilitation de six (06) bâtiments de trois (03) salles de classe …",
    authority: "CONSEIL RÉGIONAL DU BAFING",
    budget: "50 000 FCFA",
    deadline: "08/08/2025 09:00",
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Link to="/tenders" className="text-primary hover:underline text-sm">&larr; Retour à la liste</Link>

      <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-6">Détail de l'appel d'offres</h1>

      <InfoCard title="Informations clés">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Référence :</span> {data.ref}
          </div>
          <div>
            <span className="font-medium">Autorité :</span> {data.authority}
          </div>
          <div className="md:col-span-2">
            <span className="font-medium">Objet :</span> {data.object}
          </div>
          <div>
            <span className="font-medium">Budget :</span> {data.budget}
          </div>
          <div>
            <span className="font-medium">Date limite :</span> {data.deadline}
          </div>
        </div>
      </InfoCard>

      {/* Purchase banner (simplifié) */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-8 flex items-center justify-between">
        <p className="text-sm text-gray-800">Pour consulter le dossier d'appel d'offres complet, veuillez l'acquérir.</p>
        <Link
          to="purchase"
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
        >
          Acquérir le dossier ({data.budget})
        </Link>
      </div>
    </div>
  );
};

export default TenderDetailPage; 