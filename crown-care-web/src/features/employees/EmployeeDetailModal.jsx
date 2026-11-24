import { Button } from "../../Components/ui/Button";
import { Avatar, Badge, Detail, EmptyState } from "../../Components/ui/Display";
import { Modal, ModalFooter } from "../../Components/ui/Modal";
import { EMPLOYEE_STATUS } from "../../constants";
import { useData } from "../../context/data-context";
import { relativeDay } from "../../utils/date";
import { formatTime } from "../../utils/format";
import { countCompleted, sortOrders } from "../../utils/orders";
import { OrderStatusBadge } from "../orders/OrderStatusBadge";

const RECENT_ORDERS_LIMIT = 5;

/** Read-only popup with one employee's profile, order counts and latest orders. */
export function EmployeeDetailModal({ employeeId, onClose }) {
  const { employees, orders, getProduct } = useData();
  const employee = employees.find((e) => e.id === employeeId);

  const myOrders = orders.filter((o) => o.employeeId === employeeId);
  const done = countCompleted(myOrders);
  const recentOrders = sortOrders(myOrders, true).slice(0, RECENT_ORDERS_LIMIT);
  const isActive = employee.status === EMPLOYEE_STATUS.ACTIVE;

  // Skills are saved as "Box Braids, Twists" → show each one as a tag
  const skills = employee.skills ? employee.skills.split(",").map((s) => s.trim()) : [];

  return (
    <Modal title="Employee details" onClose={onClose}>
      {/* ---- Profile ---- */}
      <div className="profile-head">
        <Avatar name={employee.name} size="lg" />
        <div className="grow">
          <div className="profile-name">{employee.name}</div>
          <div className="small muted">{employee.role}</div>
        </div>
        <Badge tone={isActive ? "green" : "gray"}>{employee.status}</Badge>
      </div>

      {/* ---- Order counts ---- */}
      <div className="mini-stats">
        <div>
          <b>{myOrders.length}</b>
          <span>Total orders</span>
        </div>
        <div>
          <b>{myOrders.length - done}</b>
          <span>Open</span>
        </div>
        <div>
          <b>{done}</b>
          <span>Completed</span>
        </div>
      </div>

      {/* ---- Contact & info ---- */}
      <div className="detail-grid">
        <Detail label="Employee ID">{employee.id}</Detail>
        <Detail label="Joined">{employee.joined}</Detail>
        <Detail label="Phone">{employee.phone}</Detail>
        <Detail label="Email (login ID)">{employee.email}</Detail>
      </div>

      {skills.length > 0 && (
        <div className="mb-16">
          <div className="detail-label">Skills</div>
          <div className="tag-list">
            {skills.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ---- Latest orders ---- */}
      <h3 className="subheading">Latest orders</h3>
      {recentOrders.length ? (
        <div className="mini-list">
          {recentOrders.map((o) => (
            <div key={o.id} className="mini-list-item">
              <div className="grow">
                <div className="strong">{o.customer}</div>
                <div className="small muted">
                  {getProduct(o.serviceId)?.service} · {relativeDay(o.date)}, {formatTime(o.time)}
                </div>
              </div>
              <OrderStatusBadge status={o.status} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState>No orders assigned yet.</EmptyState>
      )}

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
