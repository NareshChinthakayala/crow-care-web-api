import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../../context/toast-context";
import { Brand } from "../ui/Brand";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Display";

/** Sticky header with the signed-in user and a Logout button. */
export function Topbar({ name, subtitle, logoutTo }) {
  const { logout } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    showToast("Logged out");
    navigate(logoutTo);
  }

  return (
    <header className="topbar">
      <Brand link={false} />
      <div className="user-chip">
        <div className="meta">
          <div className="user-name">{name}</div>
          <div className="small muted">{subtitle}</div>
        </div>
        <Avatar name={name} />
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
