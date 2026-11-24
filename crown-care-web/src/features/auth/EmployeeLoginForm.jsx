import { useEffect, useState } from "react";
import { authApi } from "../../api";
import { Button } from "../../Components/ui/Button";
import { Avatar, Badge } from "../../Components/ui/Display";
import { Field, FormError } from "../../Components/ui/Field";
import { EMPLOYEE_STATUS } from "../../constants";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../../context/toast-context";
import { useAsyncAction } from "../../hooks/useAsyncAction";

/**
 * Employee (stylist) login with email OR employee ID.
 * After a successful login the Login page redirects to "My appointments" automatically.
 */
export function EmployeeLoginForm() {
  const { loginEmployee } = useAuth();
  const showToast = useToast();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const { run, pending, error, clearError } = useAsyncAction(async () => {
    const employee = await loginEmployee({ identifier, password });
    showToast(`Welcome, ${employee.name.split(" ")[0]}`);
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
    <>
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
          {pending ? "Logging in…" : "Log in as Employee"}
        </Button>
      </form>

      <DemoAccounts onPick={fillDemoAccount} />
    </>
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
      {/* <div className="small strong mb-4">Demo accounts — tap one to fill</div> */}
      {/* {accounts.map((acct) => (
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
      ))} */}
    </div>
  );
}
