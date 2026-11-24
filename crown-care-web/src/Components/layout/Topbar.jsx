import { useLogout } from "../../hooks/useLogout";
import { fullDate, TODAY } from "../../utils/date";
import { Brand } from "../ui/Brand";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Display";
import { Icon } from "../ui/Icon";

/**
 * Sticky header.
 *  - Phones: logo + avatar + Logout.
 *  - Desktop admin: "Wig Studio › <pageTitle>" on the left, today's date on the right
 *    (the user card + logout live in the sidebar there).
 */
export function Topbar({ name, subtitle, logoutTo, pageTitle }) {
  const logout = useLogout(logoutTo);

  return (
    <header className="topbar">
      <Brand link={false} />

      {pageTitle && (
        <div className="crumb">
          <span>Wig Studio</span>
          <Icon name="chevronRight" />
          <b>{pageTitle}</b>
        </div>
      )}

      <div className="topbar-right">
        <span className="date-chip">
          <Icon name="calendar" />
          {fullDate(TODAY)}
        </span>
        <div className="user-chip">
          <div className="meta">
            <div className="user-name">{name}</div>
            <div className="small muted">{subtitle}</div>
          </div>
          <Avatar name={name} />
          <Button variant="outline" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
