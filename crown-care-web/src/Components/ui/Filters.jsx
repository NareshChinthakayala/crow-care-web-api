import { isCustomDate } from "../../utils/date";
import { cx } from "../../utils/format";

/**
 * Row of pill buttons. items: [{ value, label, count? }]
 *   <Tabs items={...} value={status} onChange={setStatus} />
 */
export function Tabs({ items, value, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={value === item.value}
          className={cx("tab", value === item.value && "active")}
          onClick={() => onChange(item.value)}
        >
          {item.label}
          {item.count !== undefined && <span className="count">{item.count}</span>}
        </button>
      ))}
    </div>
  );
}

/**
 * Date picker + quick chips ("Today", "Upcoming", ...).
 * value is a chip value or a "YYYY-MM-DD" picked from the calendar.
 */
export function DateFilter({ options, value, onChange }) {
  const custom = isCustomDate(value);
  return (
    <div className="datebar">
      <input
        type="date"
        className={cx("date-pick", custom && "active")}
        value={custom ? value : ""}
        onChange={(e) => onChange(e.target.value || "all")}
        title="Pick a date"
        aria-label="Pick a date"
      />
      <Tabs items={options} value={value} onChange={onChange} />
    </div>
  );
}

export const FilterLabel = ({ children }) => <div className="filter-label">{children}</div>;

export function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="toolbar">
      <input
        type="search"
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}
