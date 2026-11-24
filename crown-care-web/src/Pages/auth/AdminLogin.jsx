import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Field, FormError } from "../../components/ui/Field";
import { ROUTES } from "../../constants";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../../context/toast-context";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import { formValues } from "../../utils/format";

export default function AdminLogin() {
  const { loginAdmin } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();

  const { run, pending, error } = useAsyncAction(async ({ email, password, remember }) => {
    await loginAdmin({ email, password }, remember === "on");
    navigate(ROUTES.dashboard);
  });

  function handleSubmit(e) {
    e.preventDefault();
    run(formValues(e.currentTarget));
  }

  return (
    <AuthLayout
      heading="Welcome back, Admin"
      intro="Log in to manage today's orders and your styling team."
      cardTitle="Admin login"
    >
      <div className="demo-note">Demo: admin@crowncare.com / admin123</div>

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
          {pending ? "Logging in…" : "Log in"}
        </Button>
      </form>

      <div className="auth-foot">
        New salon? <Link to={ROUTES.adminRegister}>Register as admin</Link>
      </div>
      <div className="auth-foot">
        <Link to={ROUTES.employeeLogin} className="muted">
          Employee login →
        </Link>
      </div>
    </AuthLayout>
  );
}
