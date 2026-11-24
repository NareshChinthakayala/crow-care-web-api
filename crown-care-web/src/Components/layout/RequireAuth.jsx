import { Navigate } from "react-router-dom";
import { loginUrl } from "../../constants";
import { useAuth } from "../../context/auth-context";

/** Only renders children if someone with `role` is logged in; otherwise opens the login screen on that role's tab. */
export function RequireAuth({ role, children }) {
  const auth = useAuth();
  if (auth.role !== role) return <Navigate to={loginUrl(role)} replace />;
  return children;
}
