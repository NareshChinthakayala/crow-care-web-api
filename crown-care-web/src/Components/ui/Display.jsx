/**
 * Small presentational pieces used across many screens.
 */
import { cx, initials } from "../../utils/format";

/** Coloured pill. tone: red | blue | amber | green | gray */
export const Badge = ({ tone = "gray", children }) => <span className={cx("badge", `badge-${tone}`)}>{children}</span>;

/** Thin progress bar (0–100). Turns green at 100. */
export const ProgressBar = ({ value }) => (
  <div className={cx("progress", value >= 100 && "done")} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
    <span style={{ width: `${value}%` }} />
  </div>
);

/** Circle with a person's initials. size: sm | md | lg */
export const Avatar = ({ name, size = "md" }) => <div className={cx("avatar", `avatar-${size}`)}>{initials(name)}</div>;

/** White box. Pass `title` (and optional `action`) to get a header row. */
export function Card({ title, action, className, children }) {
  return (
    <div className={cx("card", className)}>
      {title && (
        <div className="card-head">
          <h2>{title}</h2>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

/** Number tile on dashboards. tone colours the value; hintTone colours the hint. */
export const StatCard = ({ label, value, hint, tone, hintTone = "muted" }) => (
  <div className="card stat">
    <div className="label">{label}</div>
    <div className={cx("value", tone && `text-${tone}`)}>{value}</div>
    {hint && <div className={cx("hint", `text-${hintTone}`)}>{hint}</div>}
  </div>
);

export const StatGrid = ({ children }) => <div className="stats">{children}</div>;

/** Page title row with an optional button on the right. */
export const PageHeader = ({ title, subtitle, action }) => (
  <div className="page-head">
    <div>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const EmptyState = ({ children }) => <div className="empty">{children}</div>;

/** Label / value pair, e.g. in the order details grid. */
export const Detail = ({ label, children }) => (
  <div className="detail">
    <span>{label}</span>
    {children}
  </div>
);
