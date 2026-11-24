import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/Display";
import { EMPLOYEE_STATUS } from "../../constants";
import { useData } from "../../context/data-context";
import { EmployeeCard } from "../../features/employees/EmployeeCard";
import { EmployeeFormModal } from "../../features/employees/EmployeeFormModal";

export default function Employees() {
  const { employees, orders } = useData();
  const [showForm, setShowForm] = useState(false);
  const activeCount = employees.filter((e) => e.status === EMPLOYEE_STATUS.ACTIVE).length;

  return (
    <>
      <PageHeader
        title="Employees"
        subtitle={`${employees.length} team members · ${activeCount} active`}
        action={<Button onClick={() => setShowForm(true)}>+ Add employee</Button>}
      />

      <div className="emp-grid">
        {employees.map((e) => (
          <EmployeeCard key={e.id} employee={e} orders={orders.filter((o) => o.employeeId === e.id)} />
        ))}
      </div>

      {showForm && <EmployeeFormModal onClose={() => setShowForm(false)} />}
    </>
  );
}
