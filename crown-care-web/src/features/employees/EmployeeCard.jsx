import { Avatar, Badge } from "../../components/ui/Display";
import { EMPLOYEE_STATUS } from "../../constants";
import { countCompleted } from "../../utils/orders";

/** Team member card with contact info and order counts. `orders` = this employee's orders. */
export function EmployeeCard({ employee, orders }) {
  const done = countCompleted(orders);
  const isActive = employee.status === EMPLOYEE_STATUS.ACTIVE;

  return (
    <div className="card emp-card">
      <div className="emp-top">
        <Avatar name={employee.name} size="lg" />
        <div className="grow">
          <div className="strong">{employee.name}</div>
          <div className="small muted">{employee.role}</div>
        </div>
        <Badge tone={isActive ? "green" : "gray"}>{employee.status}</Badge>
      </div>

      <div className="emp-contact">
        <div>
          ID: <b>{employee.id}</b> · Joined {employee.joined}
        </div>
        <div>{employee.phone}</div>
        <div>{employee.email}</div>
        {employee.skills && <div>Skills: {employee.skills}</div>}
      </div>

      <div className="emp-stats">
        <div>
          <b>{orders.length}</b>
          <span>Total</span>
        </div>
        <div>
          <b>{orders.length - done}</b>
          <span>Open</span>
        </div>
        <div>
          <b>{done}</b>
          <span>Done</span>
        </div>
      </div>
    </div>
  );
}
