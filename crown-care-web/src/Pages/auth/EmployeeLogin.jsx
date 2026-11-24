import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../api";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Avatar, Badge } from "../../components/ui/Display";
import { Field, FormError } from "../../components/ui/Field";
import { EMPLOYEE_STATUS, ROUTES } from "../../constants";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../../context/toast-context";
import { useAsyncAction } from "../../hooks/useAsyncAction";

export default function EmployeeLogin() {
  const { loginEmployee } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const { run, pending, error, clearError } = useAsyncAction(async () => {
    const employee = await loginEmployee({ identifier, password });
    showToast(`Welcome, ${employee.name.split(" ")[0]}`);
    navigate(ROUTES.myAppointments);
  });

  function handleSubmit(e) {
    e.preventDefault();
    run();
  }

  function fillDemoAccount(account) {
    setIdentifier(account.email);
    setPassword(account.password);
    clearError();
  }

  return (
    <AuthLayout
      heading="Stylist login"
      intro="See the appointments assigned to you and update them when done."
      cardTitle="Employee login"
    >
      <ol className="steps-help">
        <li>
          Enter the <b>email</b> or <b>Employee ID</b> given by your admin
        </li>
        <li>
          Enter your <b>password</b> and tap Log in
        </li>
      </ol>

      <form onSubmit={handleSubmit}>
        <Field
          label="Email or Employee ID"
          required
          autoComplete="username"
          placeholder="e.g. amara@crowncare.com or E101"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <Field
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormError message={error} />
        <Button type="submit" block disabled={pending}>
          {pending ? "Logging in…" : "Log in"}
        </Button>
      </form>

      <DemoAccounts onPick={fillDemoAccount} />

      <div className="auth-foot">
        <Link to={ROUTES.adminLogin} className="muted">
          Admin login →
        </Link>
      </div>
    </AuthLayout>
  );
}

/** Demo only: one-tap logins for presenting the prototype. Delete when real accounts exist. */
function DemoAccounts({ onPick }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    authApi.demoAccounts().then(setAccounts);
  }, []);

  return (
    <div className="demo-box">
      <div className="small strong mb-4">Demo accounts (for presentation) — tap one to fill</div>
      {accounts.map((acct) => (
        <button key={acct.id} type="button" className="acct" onClick={() => onPick(acct)}>
          <Avatar name={acct.name} size="sm" />
          <div className="grow">
            <div className="acct-name">
              {acct.name} <span className="muted small">· {acct.id}</span>
            </div>
            <code>
              {acct.email} / {acct.password}
            </code>
          </div>
          {acct.status === EMPLOYEE_STATUS.ACTIVE ? (
            <span className="small strong text-primary">Use</span>
          ) : (
            <Badge>On leave</Badge>
          )}
        </button>
      ))}
    </div>
  );
}
