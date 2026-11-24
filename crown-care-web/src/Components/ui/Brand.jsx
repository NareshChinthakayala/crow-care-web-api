import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";

/** "C CrownCare" logo. Links to the start page unless `link={false}`. */
export function Brand({ link = true }) {
  const content = (
    <>
      <span className="logo">C</span>CrownCare
    </>
  );
  return link ? (
    <Link to={ROUTES.home} className="brand">
      {content}
    </Link>
  ) : (
    <div className="brand">{content}</div>
  );
}
