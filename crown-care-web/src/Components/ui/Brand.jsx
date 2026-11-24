import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import { Icon } from "./Icon";

/** Crown logo + "CrownCare / Wig Studio". Links to the login screen unless `link={false}`. */
export function Brand({ link = true }) {
  const content = (
    <>
      <span className="logo">
        <Icon name="crown" />
      </span>
      <span className="brand-text">
        CrownCare
        <small>Wig Studio</small>
      </span>
    </>
  );
  return link ? (
    <Link to={ROUTES.login} className="brand">
      {content}
    </Link>
  ) : (
    <div className="brand">{content}</div>
  );
}
