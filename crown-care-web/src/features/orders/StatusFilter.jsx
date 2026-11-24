import { cx } from "../../utils/format";

/**
 * Row of big clickable tiles, one per order status, each with its count.
 * Works like tabs: the selected tile is highlighted.
 *
 *   items: [{ value, label, count, tone }]   tone = red | blue | amber | green | primary
 */
export function StatusFilter({ items, value, onChange }) {
  return (
    <div className="status-board" role="tablist" aria-label="Filter by status">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={value === item.value}
          className={cx("status-tile", `tile-${item.tone}`, value === item.value && "active")}
          onClick={() => onChange(item.value)}
        >
          <span className="status-tile-label">
            <span className={`dot bg-${item.tone}`} />
            {item.label}
          </span>
          <span className="status-tile-count">{item.count}</span>
        </button>
      ))}
    </div>
  );
}
