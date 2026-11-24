import { Link } from "react-router-dom";
import { cx } from "../../utils/format";
import { Icon } from "./Icon";

/**
 * <Button>Save</Button>
 * <Button icon="plus">New order</Button>         ← icon on the left
 * <Button variant="outline" size="sm">Edit</Button>
 * <Button to="/admin/orders">Go</Button>          ← renders a router Link
 *
 * variant: primary | outline | green | blue      size: sm      block: full width
 */
export function Button({ variant = "primary", size, block, to, icon, className, type = "button", children, ...props }) {
  const classes = cx("btn", `btn-${variant}`, size && `btn-${size}`, block && "btn-block", className);
  const content = (
    <>
      {icon && <Icon name={icon} />}
      {children}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
