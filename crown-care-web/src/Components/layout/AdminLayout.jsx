import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../context/auth-context";
import { useData } from "../../context/data-context";
import { useToast } from "../../context/toast-context";
import { Brand } from "../ui/Brand";
import { Icon } from "../ui/Icon";
import { Topbar } from "./Topbar";

/** Admin menu — add a page here and in App.jsx routes. */
const NAV_ITEMS = [
  { to: ROUTES.dashboard, label: "Dashboard", icon: "home" },
  { to: ROUTES.orders, label: "Orders", icon: "clipboard" },
  { to: ROUTES.products, label: "Products", icon: "box" },
  { to: ROUTES.employees, label: "Employees", icon: "users" },
];

const NavLinks = () =>
  NAV_ITEMS.map((item) => (
    <NavLink key={item.to} to={item.to}>
      <Icon name={item.icon} />
      <span>{item.label}</span>
    </NavLink>
  ));

/** Sidebar on desktop, bottom tab bar on phones. Pages render in <Outlet />. */
export function AdminLayout() {
  const { user } = useAuth();
  const { resetDemo } = useData();
  const showToast = useToast();

  return (
    <>
      <div className="shell">
        <aside className="sidebar">
          <Brand link={false} />
          <nav>
            <NavLinks />
          </nav>
          <div className="side-foot">
            Admin Panel · v1.0 prototype
            <br />
            <button type="button" className="link-button" onClick={() => resetDemo().then(() => showToast("Demo data reset"))}>
              Reset demo data
            </button>
          </div>
        </aside>
        <div>
          <Topbar name={user.name} subtitle="Administrator" logoutTo={ROUTES.adminLogin} />
          <main className="main">
            <Outlet />
          </main>
        </div>
      </div>
      <nav className="bottom-nav">
        <NavLinks />
      </nav>
    </>
  );
}
