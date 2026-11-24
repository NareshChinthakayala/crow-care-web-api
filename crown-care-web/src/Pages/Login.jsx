import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { Brand } from "../Components/ui/Brand";
import { Icon } from "../Components/ui/Icon";
import { WigArt } from "../Components/ui/WigLoader";
import { ROLES, ROUTES } from "../constants";
import { useAuth } from "../context/auth-context";
import { AdminLoginForm } from "../features/auth/AdminLoginForm";
import { AdminRegisterForm } from "../features/auth/AdminRegisterForm";
import { EmployeeLoginForm } from "../features/auth/EmployeeLoginForm";

/** The two tabs at the top of the login card. */
const TABS = [
  { role: ROLES.ADMIN, label: "Admin", icon: "shield" },
  { role: ROLES.EMPLOYEE, label: "Employee", icon: "user" },
];

/** Bullet points on the left (brand) side. */
const FEATURES = [
  "Wig & hair product inventory with low-stock alerts",
  "Book orders and assign them to your stylists",
  "Track every install from start to finish",
];

/**
 * Single login screen for everyone.
 *   /               → Admin tab
 *   /?tab=employee  → Employee tab
 * Once someone is logged in, this page sends them to their home screen.
 */
export default function Login() {
  const { role } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showRegister, setShowRegister] = useState(false); // Admin tab: login form or sign-up form

  const activeTab = searchParams.get("tab") === ROLES.EMPLOYEE ? ROLES.EMPLOYEE : ROLES.ADMIN;

  // Already logged in? Go straight to the right place.
  if (role === ROLES.ADMIN) return <Navigate to={ROUTES.dashboard} replace />;
  if (role === ROLES.EMPLOYEE) return <Navigate to={ROUTES.myAppointments} replace />;

  function changeTab(tabRole) {
    setSearchParams({ tab: tabRole }, { replace: true });
    setShowRegister(false);
  }

  // Card heading changes with the tab.
  let title = "Welcome back";
  let subtitle = "Log in to manage your wig studio.";
  if (activeTab === ROLES.EMPLOYEE) {
    title = "Stylist login";
    subtitle = "See the installs and orders assigned to you.";
  } else if (showRegister) {
    title = "Create your admin account";
    subtitle = "Set up your wig studio in a minute.";
  }

  return (
    <div className="login">
      {/* ---------- Left: brand side ---------- */}
      <section className="login-hero">
        <Brand link={false} />

        <div className="login-hero-body">
          <div className="login-art">
            <WigArt size={120} />
          </div>
          <h1>Every crown, perfectly styled.</h1>
          <p>One place for your wig collection, your stylists and every customer order.</p>
          <ul className="login-features">
            {FEATURES.map((text) => (
              <li key={text}>
                <Icon name="check" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="small login-foot">© 2026 CrownCare Wig Studio</div>
      </section>

      {/* ---------- Right: login card ---------- */}
      <section className="login-side">
        <div className="login-card">
          <div className="role-tabs" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.role}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.role}
                className={activeTab === tab.role ? "role-tab active" : "role-tab"}
                onClick={() => changeTab(tab.role)}
              >
                <Icon name={tab.icon} />
                {tab.label}
              </button>
            ))}
          </div>

          <h2 className="login-title">{title}</h2>
          <p className="login-subtitle">{subtitle}</p>

          {/* key changes with the tab, so the form fades in on every switch */}
          <div key={activeTab + showRegister} className="tab-panel">
            {activeTab === ROLES.EMPLOYEE && <EmployeeLoginForm />}
            {activeTab === ROLES.ADMIN && !showRegister && <AdminLoginForm onCreateAccount={() => setShowRegister(true)} />}
            {activeTab === ROLES.ADMIN && showRegister && <AdminRegisterForm onBackToLogin={() => setShowRegister(false)} />}
          </div>
        </div>
      </section>
    </div>
  );
}
