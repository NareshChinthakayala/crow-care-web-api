import { Field, FieldRow } from "../../components/ui/Field";
import { FormModal } from "../../components/ui/Modal";
import { useData } from "../../context/data-context";
import { useToast } from "../../context/toast-context";

const BLANK = { service: "", product: "", duration: "", servicePrice: "", productPrice: "", stock: "" };

/** Add a product, or edit one when `product` is passed. */
export function ProductFormModal({ product, onClose }) {
  const { saveProduct } = useData();
  const showToast = useToast();
  const isEdit = Boolean(product);
  const p = product ?? BLANK;

  async function handleSubmit(values) {
    await saveProduct(product?.id, {
      ...values,
      servicePrice: Number(values.servicePrice) || 0,
      productPrice: Number(values.productPrice) || 0,
      stock: Number(values.stock) || 0,
    });
    showToast(isEdit ? "Product updated" : "Product added");
  }

  return (
    <FormModal
      title={isEdit ? "Edit product" : "Add product"}
      submitLabel={isEdit ? "Save changes" : "Add product"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Field label="Hair style / Service" name="service" required defaultValue={p.service} placeholder="e.g. Knotless Braids" />
      <Field label="Product name" name="product" required defaultValue={p.product} placeholder="e.g. Eco Style Gel" />
      <FieldRow>
        <Field label="Duration" name="duration" defaultValue={p.duration} placeholder="e.g. 2 hrs" />
        <Field label="Stock qty" name="stock" type="number" min="0" defaultValue={p.stock} placeholder="0" />
        <Field label="Service price ($)" name="servicePrice" type="number" min="0" step="0.01" defaultValue={p.servicePrice} placeholder="0.00" />
        <Field label="Product price ($)" name="productPrice" type="number" min="0" step="0.01" defaultValue={p.productPrice} placeholder="0.00" />
      </FieldRow>
    </FormModal>
  );
}
