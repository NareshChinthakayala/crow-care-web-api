import { Outlet } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../context/auth-context";
import { Topbar } from "./Topbar";

/** Simple header + content area for stylists. */
export function EmployeeLayout() {
  const { user } = useAuth();
  return (
    <>
      <Topbar name={user.name} subtitle={user.role} logoutTo={ROUTES.employeeLogin} />
      <main className="main main-narrow">
        <Outlet />
      </main>
    </>
  );
}
