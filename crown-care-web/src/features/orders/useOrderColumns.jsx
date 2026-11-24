import { Button } from "../../components/ui/Button";
import { ProgressBar } from "../../components/ui/Display";
import { useData } from "../../context/data-context";
import { formatTime, money } from "../../utils/format";
import { isCompleted } from "../../utils/orders";
import { OrderStatusBadge } from "./OrderStatusBadge";

/**
 * Column setup for <DataTable> showing orders. Shared by Dashboard and Orders.
 * Pass onView / onAssign to add an actions column; compact = shorter first column.
 */
export function useOrderColumns({ onView, onAssign, compact = false } = {}) {
  const { getProduct, getEmployee } = useData();

  const columns = [
    {
      key: "order",
      header: compact ? "Customer" : "Order",
      label: "Order",
      main: true,
      render: (o) => {
        const service = getProduct(o.serviceId);
        if (compact) {
          return (
            <>
              <div className="cell-title">{o.customer}</div>
              <div className="cell-sub">
                {o.id} · {service?.service}
              </div>
            </>
          );
        }
        return (
          <>
            <div className="cell-title">
              {o.customer} <span className="cell-sub">· {o.id}</span>
            </div>
            <div className="cell-sub">
              {service?.service} · {money(service?.servicePrice ?? 0)} · {o.source}
            </div>
          </>
        );
      },
    },
    { key: "time", header: "Time", nowrap: true, render: (o) => formatTime(o.time) },
    {
      key: "employee",
      header: "Employee",
      render: (o) => getEmployee(o.employeeId)?.name ?? <span className="muted">Not assigned</span>,
    },
    { key: "progress", header: "Progress", render: (o) => <ProgressBar value={o.progress} /> },
    { key: "status", header: "Status", render: (o) => <OrderStatusBadge status={o.status} /> },
  ];

  if (onView || onAssign) {
    columns.push({
      key: "actions",
      header: "",
      label: "Actions",
      render: (o) => (
        <div className="row-actions">
          {onView && (
            <Button variant="outline" size="sm" onClick={() => onView(o.id)}>
              View
            </Button>
          )}
          {onAssign && !isCompleted(o) && (
            <Button variant={o.employeeId ? "outline" : "primary"} size="sm" onClick={() => onAssign(o.id)}>
              {o.employeeId ? "Reassign" : "Assign"}
            </Button>
          )}
        </div>
      ),
    });
  }

  return columns;
}
