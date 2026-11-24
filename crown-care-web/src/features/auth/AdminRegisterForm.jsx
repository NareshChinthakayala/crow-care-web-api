import { Button } from "../../Components/ui/Button";
import { Field, FieldRow, FormError } from "../../Components/ui/Field";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../../context/toast-context";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import { formValues } from "../../utils/format";

/**
 * New admin sign-up. Shown inside the Admin tab of the Login page.
 * Default values are demo data so the flow can be clicked through quickly.
 */
export function AdminRegisterForm({ onBackToLogin }) {
  const { registerAdmin } = useAuth();
  const showToast = useToast();

  const { run, pending, error } = useAsyncAction(async (values) => {
    await registerAdmin(values);
    showToast("Account created — welcome to CrownCare!");
  });

  function handleSubmit(e) {
    e.preventDefault();
    run(formValues(e.currentTarget));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field label="Store / Business name" name="salon" required defaultValue="CrownCare Wig Studio" />
        <Field label="Full name" name="name" required defaultValue="Naomi Adebayo" />
        <FieldRow>
          <Field label="Email" name="email" type="email" required defaultValue="admin@crowncare.com" />
          <Field label="Phone" name="phone" type="tel" required defaultValue="+1 (404) 555-0100" />
        </FieldRow>
        <Field label="Store address" name="address" defaultValue="214 Peachtree St NW, Atlanta, GA" />
        <FieldRow>
          <Field label="Password" name="password" type="password" required minLength={6} defaultValue="admin123" />
          <Field label="Confirm password" name="confirmPassword" type="password" required defaultValue="admin123" />
        </FieldRow>

        <FormError message={error} />
        <Button type="submit" block disabled={pending}>
          {pending ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <div className="auth-foot">
        Already registered?{" "}
        <button type="button" className="link-button strong" onClick={onBackToLogin}>
          Log in
        </button>
      </div>
    </>
  );
}
