import { Button } from "../../Components/ui/Button";
import { ProgressBar } from "../../Components/ui/Display";
import { ORDER_STATUS, PROGRESS_STEP } from "../../constants";
import { useData } from "../../context/data-context";
import { useToast } from "../../context/toast-context";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import { relativeDay, TODAY } from "../../utils/date";
import { cx, formatTime } from "../../utils/format";
import { OrderStatusBadge } from "../orders/OrderStatusBadge";

/** One appointment on the stylist's screen, with Start / +progress / Done buttons. */
export function AppointmentCard({ order }) {
  const { getProduct, startOrder, addOrderProgress, completeOrder } = useData();
  const showToast = useToast();
  const service = getProduct(order.serviceId);

  // Every button runs through the same wrapper so they all disable while saving.
  const { run, pending, error } = useAsyncAction(async (action, message) => {
    const updated = await action(order.id);
    showToast(typeof message === "function" ? message(updated) : message);
  });

  const isFuture = order.date > TODAY;

  function renderActions() {
    if (order.status === ORDER_STATUS.ASSIGNED && isFuture) {
      return <div className="appt-wait">You can start this on {relativeDay(order.date)}</div>;
    }
    if (order.status === ORDER_STATUS.ASSIGNED) {
      return (
        <Button variant="blue" disabled={pending} onClick={() => run(startOrder, "Service started")}>
          Start service
        </Button>
      );
    }
    if (order.status === ORDER_STATUS.IN_PROGRESS) {
      return (
        <>
          <Button variant="outline" disabled={pending} onClick={() => run(addOrderProgress, (o) => `Progress updated to ${o.progress}%`)}>
            +{PROGRESS_STEP}% progress
          </Button>
          <Button variant="green" disabled={pending} onClick={() => run(completeOrder, "Appointment marked as done ✓")}>
            Mark as done
          </Button>
        </>
      );
    }
    return null;
  }

  const actions = renderActions();

  return (
    <div className={cx("card appt", order.date < TODAY && "appt-past")}>
      <div className="appt-top">
        <div>
          <div className="appt-time">{formatTime(order.time)}</div>
          <div className="small muted">
            {relativeDay(order.date)} · {service.duration}
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="appt-service">{service.service}</div>
      <div className="appt-meta">
        <div>
          Customer: <b>{order.customer}</b>
        </div>
        <div>
          Phone: <b>{order.phone}</b>
        </div>
        <div>
          Order: <b>{order.id}</b> · {order.source}
        </div>
        {order.notes && (
          <div>
            Note: <b>{order.notes}</b>
          </div>
        )}
      </div>

      <div className="note-box mt-10">
        Use: <b>{service.product}</b>
      </div>

      {order.status !== ORDER_STATUS.ASSIGNED && (
        <div className="appt-progress">
          <ProgressBar value={order.progress} />
          <span className="small muted">{order.progress}%</span>
        </div>
      )}

      {actions && <div className="appt-actions">{actions}</div>}
      {error && <div className="form-error mt-10">{error}</div>}
    </div>
  );
}
