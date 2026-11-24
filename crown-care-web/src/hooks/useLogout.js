import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useToast } from "../context/toast-context";

/**
 * Returns a function that logs out, shows a toast and opens the login screen.
 *   const logout = useLogout(loginUrl(ROLES.ADMIN));
 *   <button onClick={logout}>Log out</button>
 */
export function useLogout(redirectTo) {
  const { logout } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();

  return () => {
    logout();
    showToast("Logged out");
    navigate(redirectTo);
  };
}
