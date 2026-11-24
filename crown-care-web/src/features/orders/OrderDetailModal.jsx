import { Button } from "../../components/ui/Button";
import { Detail, ProgressBar } from "../../components/ui/Display";
import { Modal, ModalFooter } from "../../components/ui/Modal";
import { ORDER_TIMELINE, STATUS_META } from "../../constants";
import { useData } from "../../context/data-context";
import { relativeDay } from "../../utils/date";
import { cx, formatTime, money } from "../../utils/format";
import { isCompleted } from "../../utils/orders";
import { OrderStatusBadge } from "./OrderStatusBadge";

/** Read-only order view with a progress timeline. `onAssign` opens the assign modal. */
export function OrderDetailModal({ orderId, onClose, onAssign }) {
  const { orders, getProduct, getEmployee } = useData();
  const order = orders.find((o) => o.id === orderId);
  const service = getProduct(order.serviceId);
  const employee = getEmployee(order.employeeId);
  const currentStep = STATUS_META[order.status].step;

  return (
    <Modal title={order.id} onClose={onClose}>
      <div className="row-between mb-14">
        <OrderStatusBadge status={order.status} />
        <span className="small muted">{order.progress}% complete</span>
      </div>
      <div className="mb-16">
        <ProgressBar value={order.progress} />
      </div>

      <div className="detail-grid">
        <Detail label="Customer">{order.customer}</Detail>
        <Detail label="Phone">{order.phone}</Detail>
        <Detail label="Service">{service.service}</Detail>
        <Detail label="Price">{money(service.servicePrice)}</Detail>
        <Detail label="Date & time">
          {relativeDay(order.date)}, {formatTime(order.time)}
        </Detail>
        <Detail label="Employee">{employee?.name ?? "Not assigned"}</Detail>
        <Detail label="Product">{service.product}</Detail>
        <Detail label="Source">{order.source}</Detail>
      </div>

      {order.notes && <div className="note-box mb-14">Note: {order.notes}</div>}

      <h3 className="subheading">Progress timeline</h3>
      <ul className="timeline">
        {ORDER_TIMELINE.map((step, i) => (
          <li key={step} className={cx(i <= currentStep && "on")}>
            {step}
            {i > currentStep && <span className="muted"> (pending)</span>}
          </li>
        ))}
      </ul>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {!isCompleted(order) && <Button onClick={onAssign}>{employee ? "Reassign" : "Assign"}</Button>}
      </ModalFooter>
    </Modal>
  );
}
