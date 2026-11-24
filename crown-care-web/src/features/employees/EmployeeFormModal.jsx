import { Field, FieldRow } from "../../components/ui/Field";
import { FormModal } from "../../components/ui/Modal";
import { DEFAULT_EMPLOYEE_PASSWORD } from "../../constants";
import { useData } from "../../context/data-context";
import { useToast } from "../../context/toast-context";

export function EmployeeFormModal({ onClose }) {
  const { createEmployee } = useData();
  const showToast = useToast();

  async function handleSubmit(values) {
    const employee = await createEmployee(values);
    showToast(`${employee.name} added · login: ${employee.email}`);
  }

  return (
    <FormModal title="Add employee" submitLabel="Add employee" onClose={onClose} onSubmit={handleSubmit}>
      <Field label="Full name" name="name" required placeholder="e.g. Imani Johnson" />
      <Field label="Role / Designation" name="role" required placeholder="e.g. Braider" />
      <FieldRow>
        <Field label="Phone" name="phone" type="tel" required placeholder="+1 (404) 555-0000" />
        <Field label="Email (login ID)" name="email" type="email" required placeholder="name@crowncare.com" />
      </FieldRow>
      <Field label="Skills / Services" name="skills" placeholder="e.g. Box Braids, Twists" />
      <Field label="Temporary password" name="password" required defaultValue={DEFAULT_EMPLOYEE_PASSWORD} />
    </FormModal>
  );
}
