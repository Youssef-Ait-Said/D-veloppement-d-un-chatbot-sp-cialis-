import { useState } from "react";
import { ChevronDown } from "lucide-react";

function Limites() {
  const [ouvert, setOuvert] = useState(
    () => window.matchMedia("(min-width: 900px)").matches
  );

  return (
    <section className="limites">
      <button
        type="button"
        className="limites-titre"
        onClick={() => setOuvert(!ouvert)}
        aria-expanded={ouvert}
      >
        <span>Limites d'utilisation</span>
        <ChevronDown size={16} className={ouvert ? "tourne" : ""} />
      </button>
      {ouvert && (
        <ul>
          <li>Informations générales sur le sport, pas de suivi personnalisé.</li>
          <li>Aucun diagnostic ni traitement : pour une douleur ou une blessure, consulte un professionnel de santé.</li>
          <li>Les questions hors sport sont refusées.</li>
          <li>Des erreurs sont possibles sur les dates, scores et records : vérifie les infos importantes.</li>
        </ul>
      )}
    </section>
  );
}

export default Limites;