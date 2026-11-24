import { Button } from "../../Components/ui/Button";
import { Field, FormError } from "../../Components/ui/Field";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../../context/toast-context";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import { formValues } from "../../utils/format";

/**
 * Admin email + password form.
 * After a successful login the Login page redirects to the dashboard automatically.
 */
export function AdminLoginForm({ onCreateAccount }) {
  const { loginAdmin } = useAuth();
  const showToast = useToast();

  const { run, pending, error } = useAsyncAction(async ({ email, password, remember }) => {
    await loginAdmin({ email, password }, remember === "on");
  });

  function handleSubmit(e) {
    e.preventDefault();
    run(formValues(e.currentTarget));
  }

  return (
    <>
      <div className="demo-note">Demo login: admin@crowncare.com / admin123</div>

      <form onSubmit={handleSubmit}>
        <Field label="Email" name="email" type="email" required autoComplete="username" defaultValue="admin@crowncare.com" />
        <Field label="Password" name="password" type="password" required autoComplete="current-password" defaultValue="admin123" />

        <div className="row-between mb-16 small">
          <label className="checkbox">
            <input type="checkbox" name="remember" defaultChecked /> Remember me
          </label>
          <button type="button" className="link-button" onClick={() => showToast("Password reset isn't available in the demo")}>
            Forgot password?
          </button>
        </div>

        <FormError message={error} />
        <Button type="submit" block disabled={pending}>
          {pending ? "Logging in…" : "Log in as Admin"}
        </Button>
      </form>

      <div className="auth-foot">
        New wig studio?{" "}
        <button type="button" className="link-button strong" onClick={onCreateAccount}>
          Create an admin account
        </button>
      </div>
    </>
  );
}
