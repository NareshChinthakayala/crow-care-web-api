import { Link } from "react-router-dom";
import { Brand } from "../components/ui/Brand";
import { Icon } from "../components/ui/Icon";
import { ROUTES } from "../constants";

const ROLE_CARDS = [
  {
    to: ROUTES.adminLogin,
    icon: "shield",
    title: "Admin",
    text: "Products, employees, orders, assignment & progress tracking",
    cta: "Admin login →",
  },
  {
    to: ROUTES.employeeLogin,
    icon: "user",
    title: "Employee",
    text: "View assigned appointments and mark them as done",
    cta: "Employee login →",
  },
];

export default function Home() {
  return (
    <div className="landing">
      <Brand link={false} />
      <div className="landing-body">
        <h1>
          African Hair Studio
          <br />
          Management System
        </h1>
        <p>
          Manage services &amp; products, your styling team, and offline orders — and let every stylist see and
          update their own appointments.
        </p>
        <div className="role-grid">
          {ROLE_CARDS.map((card) => (
            <Link key={card.to} to={card.to} className="role">
              <div className="ri">
                <Icon name={card.icon} />
              </div>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <span>{card.cta}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="small landing-foot">© 2026 CrownCare · Prototype</div>
    </div>
  );
}
