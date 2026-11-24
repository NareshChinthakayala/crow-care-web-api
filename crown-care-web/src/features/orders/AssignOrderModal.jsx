import { Avatar } from "../../Components/ui/Display";
import { FormModal } from "../../Components/ui/Modal";
import { EMPLOYEE_STATUS, ORDER_STATUS } from "../../constants";
import { useData } from "../../context/data-context";
import { useToast } from "../../context/toast-context";
import { relativeDay } from "../../utils/date";
import { cx, formatTime } from "../../utils/format";

/** Pick a stylist for an order. Shows how busy each one is that day. */
export function AssignOrderModal({ orderId, onClose }) {
  const { orders, employees, getProduct, getEmployee, assignOrder } = useData();
  const showToast = useToast();
  const order = orders.find((o) => o.id === orderId);
  const service = getProduct(order.serviceId);

  const openJobsOn = (employeeId) =>
    orders.filter((o) => o.employeeId === employeeId && o.date === order.date && o.status !== ORDER_STATUS.COMPLETED)
      .length;

  async function handleSubmit({ employeeId }) {
    if (!employeeId) throw new Error("Select an employee");
    await assignOrder(order.id, employeeId);
    showToast(`Assigned to ${getEmployee(employeeId).name}`);
  }

  return (
    <FormModal title="Assign order" submitLabel="Assign" onClose={onClose} onSubmit={handleSubmit}>
      <div className="card card-pad summary-box">
        <div className="strong">
          {order.customer} · {order.id}
        </div>
        <div className="small muted">
          {service.service} · {relativeDay(order.date)}, {formatTime(order.time)}
        </div>
      </div>

      {employees.map((e) => {
        const onLeave = e.status !== EMPLOYEE_STATUS.ACTIVE;
        return (
          <label key={e.id} className={cx("pick", onLeave && "disabled")}>
            <input type="radio" name="employeeId" value={e.id} defaultChecked={order.employeeId === e.id} disabled={onLeave} />
            <Avatar name={e.name} />
            <div className="grow">
              <div className="strong">{e.name}</div>
              <div className="small muted">
                {e.role} · {onLeave ? "On leave" : `${openJobsOn(e.id)} open on ${relativeDay(order.date)}`}
              </div>
            </div>
          </label>
        );
      })}
    </FormModal>
  );
}
