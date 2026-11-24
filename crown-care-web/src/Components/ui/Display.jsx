/**
 * Small presentational pieces used across many screens.
 */
import { cx, initials } from "../../utils/format";
import { Icon } from "./Icon";
import { Sparkline } from "./Sparkline";
import { WigArt } from "./WigLoader";

/** Coloured pill. tone: red | blue | amber | green | gray */
export const Badge = ({ tone = "gray", children }) => <span className={cx("badge", `badge-${tone}`)}>{children}</span>;

/**
 * Thin progress bar (0–100). Turns green at 100.
 * showLabel adds the "75%" text on the right.
 */
export const ProgressBar = ({ value, showLabel = false }) => {
  const bar = (
    <div className={cx("progress", value >= 100 && "done")} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
  if (!showLabel) return bar;
  return (
    <div className="progress-wrap">
      {bar}
      <span className="progress-label">{value}%</span>
    </div>
  );
};

/** Circle with a person's initials. size: sm | md | lg */
export const Avatar = ({ name, size = "md" }) => <div className={cx("avatar", `avatar-${size}`)}>{initials(name)}</div>;

/**
 * White box. Pass `title` (and optional `subtitle` / `action`) to get a header row.
 *   <Card title="Today's orders" subtitle="5 orders" action={<Link…/>}>…</Card>
 */
export function Card({ title, subtitle, action, className, children }) {
  return (
    <div className={cx("card", className)}>
      {title && (
        <div className="card-head">
          <div>
            <h2>{title}</h2>
            {subtitle && <div className="card-sub">{subtitle}</div>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * Number tile on dashboards.
 *   <StatCard icon="clipboard" tone="red" label="Unassigned" value={3} hint="Need an employee" />
 *   <StatCard … trend={[3, 5, 2, 6]} />   ← adds a small 7-day trend line
 * tone colours the icon + trend (primary | red | amber | green | blue); hintTone colours the hint text.
 */
export const StatCard = ({ label, value, hint, icon, tone = "primary", hintTone = "muted", trend }) => (
  <div className={cx("card stat", `stat-${tone}`)}>
    <div className="stat-top">
      <div className="label">{label}</div>
      {icon && (
        <div className="stat-icon">
          <Icon name={icon} />
        </div>
      )}
    </div>
    <div className="value">{value}</div>
    <div className="stat-bottom">
      {hint && <div className={cx("hint", `text-${hintTone}`)}>{hint}</div>}
      {trend && <Sparkline values={trend} />}
    </div>
  </div>
);

export const StatGrid = ({ children }) => <div className="stats">{children}</div>;

/** Page title row with optional button(s) on the right. */
export const PageHeader = ({ title, subtitle, action }) => (
  <div className="page-head">
    <div>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
    {action && <div className="page-actions">{action}</div>}
  </div>
);

/** "Nothing here" message with a small wig drawing. */
export const EmptyState = ({ children }) => (
  <div className="empty">
    <WigArt size={44} />
    <div>{children}</div>
  </div>
);

/** Label / value pair, e.g. in the order details grid. */
export const Detail = ({ label, children }) => (
  <div className="detail">
    <span>{label}</span>
    {children}
  </div>
);
