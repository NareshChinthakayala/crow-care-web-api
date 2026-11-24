import { Outlet, useLocation } from "react-router-dom";
import { ROLES, loginUrl } from "../../constants";
import { useAuth } from "../../context/auth-context";
import { Topbar } from "./Topbar";

/** Simple header + content area for stylists. */
export function EmployeeLayout() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  return (
    <>
      <Topbar name={user.name} subtitle={user.role} logoutTo={loginUrl(ROLES.EMPLOYEE)} />
      <main className="main main-narrow">
        {/* key = page URL, so each new page re-runs the "page-enter" slide-up animation */}
        <div key={pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
    </>
  );
}
