/**
 * Tiny trend line (no axes) for stat cards.
 *   <Sparkline values={[3, 5, 2, 4, 6]} />
 * Colour comes from the parent's CSS `color`, so it matches the card's tone.
 */
const WIDTH = 100;
const HEIGHT = 32;

export function Sparkline({ values }) {
  if (!values?.length) return null;

  const max = Math.max(...values, 1);
  const stepX = values.length > 1 ? WIDTH / (values.length - 1) : WIDTH;
  // Leave 3px at top/bottom so the line is never cut off
  const points = values.map((v, i) => [i * stepX, HEIGHT - 3 - (v / max) * (HEIGHT - 6)]);
  const line = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg className="sparkline" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" aria-hidden="true">
      <polygon className="sparkline-area" points={`0,${HEIGHT} ${line} ${WIDTH},${HEIGHT}`} />
      <polyline className="sparkline-line" points={line} />
      <circle className="sparkline-dot" cx={lastX} cy={lastY} r="2.6" />
    </svg>
  );
}
