import { useId } from "react";

/**
 * Label + input in one line of JSX. Any extra props go to the control.
 *   <Field label="Email" name="email" type="email" required />
 *   <Field label="Source" as="select" name="source">{options}</Field>
 *   <Field label="Notes" as="textarea" name="notes" rows={2} />
 */
export function Field({ label, as: Control = "input", hint, children, ...controlProps }) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Control id={id} className="input" {...controlProps}>
        {children}
      </Control>
      {hint && <div className="field-hint">{hint}</div>}
    </div>
  );
}

/** Two fields side by side on wider screens. */
export const FieldRow = ({ children }) => <div className="row2">{children}</div>;

/** Red error box shown under a form. Renders nothing when there is no message. */
export const FormError = ({ message }) =>
  message ? (
    <div className="form-error" role="alert">
      {message}
    </div>
  ) : null;
