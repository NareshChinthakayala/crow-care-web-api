import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Field, FieldRow, FormError } from "../../components/ui/Field";
import { ROUTES } from "../../constants";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../../context/toast-context";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import { formValues } from "../../utils/format";

export default function AdminRegister() {
  const { registerAdmin } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();

  const { run, pending, error } = useAsyncAction(async (values) => {
    await registerAdmin(values);
    showToast("Account created successfully");
    navigate(ROUTES.dashboard);
  });

  function handleSubmit(e) {
    e.preventDefault();
    run(formValues(e.currentTarget));
  }

  // Default values are demo data so the flow can be clicked through quickly.
  return (
    <AuthLayout
      heading="Create your admin account"
      intro="Register your salon to start managing products, employees and orders."
      cardTitle="Admin registration"
    >
      <form onSubmit={handleSubmit}>
        <Field label="Salon / Business name" name="salon" required defaultValue="CrownCare African Hair Studio" />
        <Field label="Full name" name="name" required defaultValue="Naomi Adebayo" />
        <FieldRow>
          <Field label="Email" name="email" type="email" required defaultValue="admin@crowncare.com" />
          <Field label="Phone" name="phone" type="tel" required defaultValue="+1 (404) 555-0100" />
        </FieldRow>
        <Field label="Salon address" name="address" defaultValue="214 Peachtree St NW, Atlanta, GA" />
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
        Already registered? <Link to={ROUTES.adminLogin}>Log in</Link>
      </div>
    </AuthLayout>
  );
}
