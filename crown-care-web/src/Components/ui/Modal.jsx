import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import { Button } from "./Button";
import { formValues } from "../../utils/format";
import { FormError } from "./Field";

/** Dialog (bottom sheet on phones). Closes on Esc, backdrop click or ×. */
export function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-bg" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="modal-x" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}

/** Buttons row at the bottom of a modal. */
export const ModalFooter = ({ children }) => <div className="modal-foot">{children}</div>;

/**
 * A modal containing a form with Cancel / Submit buttons.
 * `onSubmit(values)` receives the form fields as an object. If it throws,
 * the error is shown in the modal; if it succeeds, the modal closes.
 */
export function FormModal({ title, submitLabel, onClose, onSubmit, children }) {
  const { run, pending, error } = useAsyncAction(onSubmit);

  async function handleSubmit(e) {
    e.preventDefault();
    if (await run(formValues(e.currentTarget))) onClose();
  }

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {children}
        <FormError message={error} />
        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : submitLabel}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
