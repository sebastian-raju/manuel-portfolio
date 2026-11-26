// Small, quiet illustrations for the project cards, drawn in SVG.
// Placeholders that hint at each project; swap for real screenshots later.

const stroke = "rgba(244,241,238,0.18)";

function Shots() {
  // Half a pitch with shots sized by chance quality.
  const shots = [
    [62, 30, 6], [70, 44, 9], [58, 52, 4], [76, 36, 12], [66, 60, 5], [80, 48, 15],
    [52, 40, 3], [72, 54, 7], [84, 42, 18], [60, 24, 3], [68, 38, 8], [78, 62, 4],
  ];
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      <rect x="40" y="6" width="56" height="68" fill="none" stroke={stroke} strokeWidth="0.4" />
      <rect x="78" y="22" width="18" height="36" fill="none" stroke={stroke} strokeWidth="0.4" />
      <rect x="90" y="32" width="6" height="16" fill="none" stroke={stroke} strokeWidth="0.4" />
      <path d="M78 32 A9 9 0 0 0 78 48" fill="none" stroke={stroke} strokeWidth="0.4" />
      {shots.map(([x, y, q], i) => (
        <circle key={i} cx={x} cy={y} r={0.6 + q / 9} fill={q > 10 ? "#f44849" : "rgba(244,241,238,0.55)"} fillOpacity={q > 10 ? 0.9 : 0.5} />
      ))}
    </svg>
  );
}

function Radar() {
  const axes = 6;
  const a = [0.9, 0.6, 0.75, 0.45, 0.85, 0.55];
  const b = [0.6, 0.8, 0.5, 0.7, 0.55, 0.65];
  const pt = (v: number, i: number) => {
    const ang = (Math.PI * 2 * i) / axes - Math.PI / 2;
    return `${50 + Math.cos(ang) * v * 34},${40 + Math.sin(ang) * v * 34}`;
  };
  return (
    <svg viewBox="0 0 100 80" className="h-full w-full">
      {[0.33, 0.66, 1].map((r) => (
        <polygon key={r} points={Array.from({ length: axes }, (_, i) => pt(r, i)).join(" ")} fill="none" stroke={stroke} strokeWidth="0.4" />
      ))}
      <polygon points={b.map(pt).join(" ")} fill="rgba(244,241,238,0.08)" stroke="rgba(244,241,238,0.45)" strokeWidth="0.5" />
      <polygon points={a.map(pt).join(" ")} fill="rgba(244,72,73,0.18)" stroke="#f44849" strokeWidth="0.6" />
    </svg>
  );
}

function Load() {
  const v = [42, 55, 38, 70, 62, 48, 88, 52, 44, 66, 58, 40, 74, 50];
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="h-full w-full">
      <line x1="0" y1="24" x2="100" y2="24" stroke="#f44849" strokeWidth="0.3" strokeDasharray="1.5 1.5" />
      {v.map((h, i) => (
        <rect
          key={i}
          x={i * 7.1 + 1}
          y={80 - h * 0.8}
          width="4.6"
          height={h * 0.8}
          fill={h > 70 ? "#f44849" : "rgba(244,241,238,0.22)"}
        />
      ))}
    </svg>
  );
}

export default function ProjectVisual({ index }: { index: number }) {
  const V = [Shots, Radar, Load][index % 3];
  return <V />;
}
