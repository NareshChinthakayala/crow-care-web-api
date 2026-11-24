import { Navigate } from "react-router-dom";
import { ROLES, ROUTES } from "../../constants";
import { useAuth } from "../../context/auth-context";

const LOGIN_PAGE = { [ROLES.ADMIN]: ROUTES.adminLogin, [ROLES.EMPLOYEE]: ROUTES.employeeLogin };

/** Only renders children if someone with `role` is logged in; otherwise sends them to that role's login. */
export function RequireAuth({ role, children }) {
  const auth = useAuth();
  if (auth.role !== role) return <Navigate to={LOGIN_PAGE[role]} replace />;
  return children;
}
