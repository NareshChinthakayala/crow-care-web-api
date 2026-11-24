import { Button } from "../../Components/ui/Button";
import { Avatar, EmptyState } from "../../Components/ui/Display";
import { STATUS_META } from "../../constants";
import { useData } from "../../context/data-context";
import { formatTime, money } from "../../utils/format";
import { isCompleted } from "../../utils/orders";
import { OrderStatusBadge } from "../orders/OrderStatusBadge";

/**
 * Today's appointments as a vertical timeline (time on the left, booking card on the right).
 * The coloured dot on the line matches the order status.
 *
 *   <TodaySchedule orders={todaysOrders} onView={(id) => …} onAssign={(id) => …} />
 */
export function TodaySchedule({ orders, onView, onAssign }) {
  const { getProduct, getEmployee } = useData();

  if (!orders.length) return <EmptyState>No appointments booked for today.</EmptyState>;

  return (
    <ol className="schedule">
      {orders.map((o) => {
        const service = getProduct(o.serviceId);
        const employee = getEmployee(o.employeeId);
        const tone = STATUS_META[o.status]?.tone ?? "gray";

        return (
          <li key={o.id} className={`slot slot-${tone}`}>
            <div className="slot-time">
              <b>{formatTime(o.time)}</b>
              <span>{service?.duration}</span>
            </div>

            <div className="slot-card">
              <div className="slot-main">
                <div className="slot-title">{o.customer}</div>
                <div className="slot-sub">
                  {service?.service} · {money(service?.servicePrice ?? 0)}
                </div>
              </div>

              <div className="slot-who">
                {employee ? (
                  <>
                    <Avatar name={employee.name} size="sm" />
                    <span>{employee.name}</span>
                  </>
                ) : (
                  <span className="text-red strong small">Needs a stylist</span>
                )}
              </div>

              <OrderStatusBadge status={o.status} />

              <div className="slot-actions">
                {!employee && !isCompleted(o) && (
                  <Button size="sm" onClick={() => onAssign(o.id)}>
                    Assign
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  icon="eye"
                  className="btn-icon"
                  title="View order"
                  aria-label={`View order ${o.id}`}
                  onClick={() => onView(o.id)}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
