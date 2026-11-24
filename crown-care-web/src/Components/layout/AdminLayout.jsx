import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ORDER_STATUS, ROLES, ROUTES, loginUrl } from "../../constants";
import { useAuth } from "../../context/auth-context";
import { useData } from "../../context/data-context";
import { useToast } from "../../context/toast-context";
import { useLogout } from "../../hooks/useLogout";
import { Brand } from "../ui/Brand";
import { Avatar } from "../ui/Display";
import { Icon } from "../ui/Icon";
import { Topbar } from "./Topbar";

/** Admin menu — add a page here and in App.jsx routes. */
const NAV_ITEMS = [
  { to: ROUTES.dashboard, label: "Dashboard", icon: "home" },
  { to: ROUTES.orders, label: "Orders", icon: "clipboard" },
  { to: ROUTES.products, label: "Products", icon: "box" },
  { to: ROUTES.employees, label: "Employees", icon: "users" },
];

/** Menu links. `badges` = { "/admin/orders": 3 } shows a small count next to a link. */
function NavLinks({ badges = {} }) {
  return NAV_ITEMS.map((item) => (
    <NavLink key={item.to} to={item.to}>
      <Icon name={item.icon} />
      <span>{item.label}</span>
      {badges[item.to] > 0 && <em className="nav-badge">{badges[item.to]}</em>}
    </NavLink>
  ));
}

/** Dark sidebar on desktop, bottom tab bar on phones. Pages render in <Outlet />. */
export function AdminLayout() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const { orders, resetDemo } = useData();
  const showToast = useToast();
  const logout = useLogout(loginUrl(ROLES.ADMIN));

  const pageTitle = NAV_ITEMS.find((item) => item.to === pathname)?.label;
  const unassignedCount = orders.filter((o) => o.status === ORDER_STATUS.NEW).length;
  const badges = { [ROUTES.orders]: unassignedCount }; // "needs attention" counter on Orders

  return (
    <>
      <div className="shell">
        <aside className="sidebar">
          <Brand link={false} />

          <div className="side-label">Studio</div>
          <nav>
            <NavLinks badges={badges} />
          </nav>

          <div className="side-foot">
            <div className="side-user">
              <Avatar name={user.name} size="sm" />
              <div className="grow">
                <div className="side-user-name">{user.name}</div>
                <div className="side-user-role">Administrator</div>
              </div>
              <button type="button" className="side-logout" onClick={logout} title="Log out" aria-label="Log out">
                <Icon name="logout" />
              </button>
            </div>
            <button
              type="button"
              className="side-reset"
              onClick={() => resetDemo().then(() => showToast("Demo data reset"))}
            >
              Reset demo data
            </button>
          </div>
        </aside>

        <div className="shell-main">
          <Topbar name={user.name} subtitle="Administrator" logoutTo={loginUrl(ROLES.ADMIN)} pageTitle={pageTitle} />
          <main className="main">
            {/* key = page URL, so each new page re-runs the "page-enter" slide-up animation */}
            <div key={pathname} className="page-enter">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <nav className="bottom-nav">
        <NavLinks badges={badges} />
      </nav>
    </>
  );
}
