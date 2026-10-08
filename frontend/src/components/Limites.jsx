import { Info } from "lucide-react";

function Limites() {
  return (
    <details className="limites">
      <summary>
        <Info size={16} /> Limites d'utilisation
      </summary>
      <ul>
        <li>SportBot donne des informations générales sur le sport, pas un suivi personnalisé.</li>
        <li>Il ne pose aucun diagnostic et ne prescrit aucun traitement : pour une douleur ou une blessure, consulte un professionnel de santé.</li>
        <li>Les questions hors sport sont refusées.</li>
        <li>Il peut se tromper sur des dates, des scores ou des records : vérifie les infos importantes.</li>
      </ul>
    </details>
  );
}

export default Limites;