import { cx } from "../../utils/format";

/**
 * A little wig drawing: crown on top, cap + bangs, long hair on both sides.
 * Pass `animated` to make the hair sway and the crown bounce (used by the loader).
 *
 *   <WigArt size={64} animated />
 */
export function WigArt({ size = 64, animated = false }) {
  return (
    <svg className={cx("wig-art", animated && "wig-animated")} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {/* crown */}
      <path className="wig-crown" d="M24 13 L26 5 L29.5 9.5 L32 4 L34.5 9.5 L38 5 L40 13 Z" />

      {/* left side hair */}
      <g className="wig-hair wig-hair-left">
        <path d="M17 26 C12 36 18 44 13 58" />
        <path d="M21 24 C16 37 22 46 18 60" />
      </g>

      {/* right side hair */}
      <g className="wig-hair wig-hair-right">
        <path d="M47 26 C52 36 46 44 51 58" />
        <path d="M43 24 C48 37 42 46 46 60" />
      </g>

      {/* cap with bangs cut out for the face */}
      <path
        className="wig-cap"
        d="M13 36 C11 20 21 13 32 13 C43 13 53 20 51 36 C48 29 44 25 38 24 C33 27 27 27 22 25 C18 27 15 31 13 36 Z"
      />
    </svg>
  );
}

/**
 * Decorative flowing "hair strand" lines for dark banners (login, dashboard).
 * Purely visual: sits behind the content, ignored by screen readers.
 */
export function HairWaves() {
  return (
    <svg className="hair-waves" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-20 250 C 120 180, 220 300, 360 210 S 560 120, 640 170" />
      <path d="M-20 270 C 140 200, 240 320, 380 230 S 570 140, 640 195" />
      <path d="M-20 290 C 160 220, 260 330, 400 250 S 580 165, 640 220" />
      <path d="M-20 60 C 100 10, 200 120, 330 60 S 520 -10, 640 40" />
      <path d="M-20 80 C 120 30, 220 140, 350 80 S 540 10, 640 62" />
    </svg>
  );
}

/**
 * Wig-themed loading indicator.
 *   <WigLoader />                                   inline, default message
 *   <WigLoader fullScreen message="Loading…" />     centred on the whole screen
 */
export function WigLoader({ message = "Styling your wigs…", fullScreen = false }) {
  return (
    <div className={cx("wig-loader", fullScreen && "wig-loader-full")} role="status" aria-live="polite">
      <WigArt size={72} animated />
      <div className="wig-loader-text">{message}</div>
    </div>
  );
}
