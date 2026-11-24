import { useState } from "react";
import { Field, FieldRow } from "../../Components/ui/Field";
import { FormModal } from "../../Components/ui/Modal";
import { EMPLOYEE_STATUS, ORDER_SOURCES } from "../../constants";
import { useData } from "../../context/data-context";
import { useToast } from "../../context/toast-context";
import { TODAY } from "../../utils/date";
import { money } from "../../utils/format";

/** "+ New order" form. Calls onCreated(order) after saving. */
export function OrderFormModal({ onClose, onCreated }) {
  const { products, employees, getProduct, createOrder } = useData();
  const showToast = useToast();
  const [serviceId, setServiceId] = useState(products[0]?.id);
  const service = getProduct(serviceId);
  const activeEmployees = employees.filter((e) => e.status === EMPLOYEE_STATUS.ACTIVE);

  async function handleSubmit(values) {
    const order = await createOrder({ ...values, serviceId: Number(values.serviceId) });
    showToast(`Order ${order.id} created`);
    onCreated?.(order);
  }

  return (
    <FormModal title="Add offline order" submitLabel="Create order" onClose={onClose} onSubmit={handleSubmit}>
      <FieldRow>
        <Field label="Customer name" name="customer" required placeholder="e.g. Lola Adeyemi" />
        <Field label="Phone" name="phone" type="tel" required placeholder="+1 (404) 555-0000" />
      </FieldRow>

      <Field
        label="Hair style / Service"
        as="select"
        name="serviceId"
        value={serviceId}
        onChange={(e) => setServiceId(Number(e.target.value))}
        hint={
          service && (
            <>
              Recommended product: <b className="text-primary">{service.product}</b> · {service.duration}
            </>
          )
        }
      >
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.service} — {money(p.servicePrice)}
          </option>
        ))}
      </Field>

      <FieldRow>
        <Field label="Date" name="date" type="date" defaultValue={TODAY} required />
        <Field label="Time" name="time" type="time" defaultValue="16:00" required />
        <Field label="Order source" as="select" name="source">
          {ORDER_SOURCES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Field>
        <Field label="Assign to employee" as="select" name="employeeId">
          <option value="">Assign later</option>
          {activeEmployees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} ({e.role})
            </option>
          ))}
        </Field>
      </FieldRow>

      <Field label="Notes" as="textarea" name="notes" rows={2} placeholder="Length, colour, special requests…" />
    </FormModal>
  );
}
