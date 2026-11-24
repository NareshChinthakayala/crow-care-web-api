import { useState } from "react";
import { Button } from "../../Components/ui/Button";
import { DataTable } from "../../Components/ui/DataTable";
import { Avatar, Badge, Card, PageHeader, StatCard, StatGrid } from "../../Components/ui/Display";
import { SearchBox } from "../../Components/ui/Filters";
import { EMPLOYEE_STATUS } from "../../constants";
import { useData } from "../../context/data-context";
import { EmployeeDetailModal } from "../../features/employees/EmployeeDetailModal";
import { EmployeeFormModal } from "../../features/employees/EmployeeFormModal";
import { plural } from "../../utils/format";
import { countCompleted, isCompleted } from "../../utils/orders";

export default function Employees() {
  const { employees, orders } = useData();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [viewingId, setViewingId] = useState(null); // id of the employee whose details popup is open

  // ---- Search by name, ID, role, phone or email ----
  const query = search.trim().toLowerCase();
  const visible = employees.filter((e) =>
    `${e.name} ${e.id} ${e.role} ${e.phone} ${e.email}`.toLowerCase().includes(query),
  );

  // ---- Numbers ----
  const activeCount = employees.filter((e) => e.status === EMPLOYEE_STATUS.ACTIVE).length;
  const ordersOf = (employeeId) => orders.filter((o) => o.employeeId === employeeId);
  const openOrders = orders.filter((o) => o.employeeId && !isCompleted(o)).length; // assigned but not finished

  // ---- Table columns ----
  const columns = [
    {
      key: "name",
      header: "Employee",
      main: true,
      render: (e) => (
        <div className="person">
          <Avatar name={e.name} size="sm" />
          <div>
            <div className="cell-title">{e.name}</div>
            <div className="cell-sub">{e.role}</div>
          </div>
        </div>
      ),
    },
    { key: "id", header: "ID", nowrap: true },
    {
      key: "contact",
      header: "Contact",
      hideOnMobile: true,
      render: (e) => (
        <>
          <div>{e.phone}</div>
          <div className="cell-sub">{e.email}</div>
        </>
      ),
    },
    { key: "joined", header: "Joined", nowrap: true, hideOnMobile: true },
    {
      key: "orders",
      header: "Orders",
      label: "Orders (open / done)",
      align: "right",
      render: (e) => {
        const mine = ordersOf(e.id);
        const done = countCompleted(mine);
        return (
          <span className="nowrap">
            <b>{mine.length - done}</b> open · <span className="muted">{done} done</span>
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (e) => <Badge tone={e.status === EMPLOYEE_STATUS.ACTIVE ? "green" : "gray"}>{e.status}</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (e) => (
        <Button
          variant="outline"
          size="sm"
          icon="eye"
          className="btn-icon"
          title="View details"
          aria-label={`View ${e.name}`}
          onClick={() => setViewingId(e.id)}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Employees"
        subtitle="Your styling team — contact details, status and workload."
        action={
          <Button icon="plus" onClick={() => setShowForm(true)}>
            Add employee
          </Button>
        }
      />

      <StatGrid>
        <StatCard icon="users" label="Team members" value={employees.length} hint="Total employees" />
        <StatCard icon="check" tone="green" label="Active" value={activeCount} hint="Can take orders" />
        <StatCard icon="clock" tone="amber" label="On leave" value={employees.length - activeCount} hint="Not available" />
        <StatCard icon="clipboard" tone="blue" label="Open orders" value={openOrders} hint="Assigned, not finished" />
      </StatGrid>

      <Card
        title="All employees"
        subtitle={query ? `${plural(visible.length, "result")} for "${search.trim()}"` : plural(employees.length, "employee")}
        action={<SearchBox value={search} onChange={setSearch} placeholder="Search name, ID, phone or email…" />}
      >
        <DataTable columns={columns} rows={visible} emptyMessage="No employees match your search." />
      </Card>

      {showForm && <EmployeeFormModal onClose={() => setShowForm(false)} />}
      {viewingId && <EmployeeDetailModal employeeId={viewingId} onClose={() => setViewingId(null)} />}
    </>
  );
}
