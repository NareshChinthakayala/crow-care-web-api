import { Link } from "react-router-dom";
import { Icon } from "../../Components/ui/Icon";
import { ORDER_STATUS, ROUTES, STATUS_META } from "../../constants";
import { countCompleted } from "../../utils/orders";

/**
 * "Where are today's orders?" — one stacked colour bar + one clickable row per status.
 * Clicking a row opens the Orders page filtered to that status.
 */
export function OrderPipeline({ orders }) {
  const total = orders.length;
  const done = countCompleted(orders);
  const percentDone = total ? Math.round((done / total) * 100) : 0;

  const steps = Object.values(ORDER_STATUS).map((status) => {
    const count = orders.filter((o) => o.status === status).length;
    return {
      status,
      count,
      label: STATUS_META[status].label,
      tone: STATUS_META[status].tone,
      percent: total ? (count / total) * 100 : 0,
    };
  });

  return (
    <div className="pipeline">
      <div className="pipeline-head">
        <div>
          <div className="pipeline-big">{percentDone}%</div>
          <div className="small muted">
            of today&apos;s orders completed ({done} of {total})
          </div>
        </div>
      </div>

      {/* Stacked bar: each colour's width = share of orders in that status */}
      <div className="pipeline-bar" aria-hidden="true">
        {steps.map((s) => s.count > 0 && <span key={s.status} className={`bg-${s.tone}`} style={{ width: `${s.percent}%` }} />)}
      </div>

      <ul className="pipeline-list">
        {steps.map((s) => (
          <li key={s.status}>
            <Link to={`${ROUTES.orders}?status=${s.status}`} className="pipeline-row">
              <span className={`dot bg-${s.tone}`} />
              <span className="grow">{s.label}</span>
              <b>{s.count}</b>
              <Icon name="chevronRight" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
