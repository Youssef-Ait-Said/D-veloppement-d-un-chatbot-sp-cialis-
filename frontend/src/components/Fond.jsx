import { useEffect, useMemo, useRef } from "react";
import {
  Dumbbell, Trophy, Bike, Footprints, Goal, Medal, Timer, Flame,
} from "lucide-react";

// Optionnel : vidéo/GIF dans frontend/public/ (ex. "/fond.mp4")
const FOND_MEDIA = "/fond.mp4";

const ICONES = [
  { Icone: Dumbbell,   x: 6,  taille: 56, duree: 22, delai: 0 },
  { Icone: Trophy,     x: 20, taille: 48, duree: 26, delai: -6 },
  { Icone: Bike,       x: 36, taille: 64, duree: 30, delai: -12 },
  { Icone: Footprints, x: 50, taille: 44, duree: 20, delai: -3 },
  { Icone: Goal,       x: 64, taille: 60, duree: 28, delai: -9 },
  { Icone: Medal,      x: 78, taille: 46, duree: 24, delai: -15 },
  { Icone: Timer,      x: 90, taille: 52, duree: 27, delai: -18 },
  { Icone: Flame,      x: 13, taille: 42, duree: 25, delai: -20 },
];

function Fond() {
  const ref = useRef(null);

  // 28 particules, tirées une seule fois (useMemo évite de les changer à chaque affichage)
  const particules = useMemo(
    () =>
      Array.from({ length: 28 }, () => ({
        x: Math.random() * 100,
        taille: 2 + Math.random() * 4,
        duree: 8 + Math.random() * 12,
        delai: -Math.random() * 20,
      })),
    []
  );

  // Le halo suit la souris
  useEffect(() => {
    function bouger(e) {
      ref.current?.style.setProperty("--mx", `${e.clientX}px`);
      ref.current?.style.setProperty("--my", `${e.clientY}px`);
    }
    window.addEventListener("mousemove", bouger);
    return () => window.removeEventListener("mousemove", bouger);
  }, []);

  return (
    <div className="fond" ref={ref} aria-hidden="true">
      <div className="blob blob1" />
      <div className="blob blob2" />

      {FOND_MEDIA &&
        (FOND_MEDIA.endsWith(".gif") ? (
          <img className="fond-media" src={FOND_MEDIA} alt="" />
        ) : (
          <video className="fond-media" src={FOND_MEDIA} autoPlay loop muted playsInline />
        ))}

      <div className="sol" />

      {particules.map((p, i) => (
        <span
          key={i}
          className="particule"
          style={{
            "--x": `${p.x}%`,
            "--t": `${p.taille}px`,
            "--duree": `${p.duree}s`,
            "--delai": `${p.delai}s`,
          }}
        />
      ))}

      {ICONES.map(({ Icone, x, taille, duree, delai }, i) => (
        <span
          key={i}
          className="flottant"
          style={{ "--x": `${x}%`, "--duree": `${duree}s`, "--delai": `${delai}s` }}
        >
          <Icone size={taille} strokeWidth={1.5} />
        </span>
      ))}

      <div className="balle-trajet">
        <div className="balle" />
      </div>
    </div>
  );
}

export default Fond;