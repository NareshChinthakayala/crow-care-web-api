import { Button } from "../../Components/ui/Button";
import { Avatar, ProgressBar } from "../../Components/ui/Display";
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
        return (
          <>
            <div className="cell-title">{o.customer}</div>
            <div className="cell-sub">
              {o.id} · {service?.service}
              {!compact && ` · ${money(service?.servicePrice ?? 0)}`}
            </div>
          </>
        );
      },
    },
    { key: "time", header: "Time", nowrap: true, render: (o) => formatTime(o.time) },
    {
      key: "employee",
      header: "Employee",
      render: (o) => {
        const employee = getEmployee(o.employeeId);
        if (!employee) return <span className="muted">Not assigned</span>;
        return (
          <div className="person">
            <Avatar name={employee.name} size="sm" />
            <span>{employee.name}</span>
          </div>
        );
      },
    },
    { key: "progress", header: "Progress", render: (o) => <ProgressBar value={o.progress} showLabel /> },
    { key: "status", header: "Status", render: (o) => <OrderStatusBadge status={o.status} /> },
  ].filter((col) => !(compact && col.key === "progress")); // dashboard card is narrow: status is enough there

  if (onView || onAssign) {
    columns.push({
      key: "actions",
      header: "Actions",
      label: "Actions",
      align: "right",
      render: (o) => (
        <div className="row-actions">
          {/* Unassigned → a clear "Assign" button (the main job on this page) */}
          {onAssign && !isCompleted(o) && !o.employeeId && (
            <Button size="sm" icon="userPlus" onClick={() => onAssign(o.id)}>
              Assign
            </Button>
          )}
          {/* Already assigned → a small icon button to change the stylist */}
          {onAssign && !isCompleted(o) && o.employeeId && (
            <Button
              variant="outline"
              size="sm"
              icon="userPlus"
              className="btn-icon"
              title="Reassign stylist"
              aria-label={`Reassign ${o.id}`}
              onClick={() => onAssign(o.id)}
            />
          )}
          {onView && (
            <Button
              variant="outline"
              size="sm"
              icon="eye"
              className="btn-icon"
              title="View details"
              aria-label={`View ${o.id}`}
              onClick={() => onView(o.id)}
            />
          )}
        </div>
      ),
    });
  }

  return columns;
}
