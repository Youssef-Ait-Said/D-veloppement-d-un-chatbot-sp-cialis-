const POSE =
  "M35 21 L29 34 M35 23 L42 29 L46 24 M35 23 L27 26 L24 33 M29 34 L38 38 L35 49 M29 34 L24 43 L15 41";

function Coureur({ decalage = 0, opacite = 1, couleur }) {
  return (
    <g
      transform={`translate(${decalage} 0)`}
      opacity={opacite}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.6"
      style={{ stroke: couleur, fill: "none" }}
    >
      <circle cx="37" cy="14" r="3.8" style={{ fill: couleur, stroke: "none" }} />
      <path d={POSE} />
    </g>
  );
}

function Logo({ size = 44 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="Logo SportBot">
      <rect width="64" height="64" rx="16" style={{ fill: "var(--surface-2)", stroke: "var(--line)" }} />
      <ellipse cx="33" cy="52" rx="15" ry="2.6" opacity="0.35" style={{ fill: "var(--accent)" }} />
      <Coureur decalage={-12} opacite={0.2} couleur="var(--accent)" />
      <Coureur decalage={-6} opacite={0.42} couleur="var(--accent)" />
      <Coureur couleur="var(--text)" />
    </svg>
  );
}

export default Logo;