import { Link } from "react-router-dom";
import { cx } from "../../utils/format";

/**
 * <Button>Save</Button>
 * <Button variant="outline" size="sm">Edit</Button>
 * <Button to="/admin/orders">Go</Button>          ← renders a router Link
 *
 * variant: primary | outline | green | blue      size: sm      block: full width
 */
export function Button({ variant = "primary", size, block, to, className, type = "button", ...props }) {
  const classes = cx("btn", `btn-${variant}`, size && `btn-${size}`, block && "btn-block", className);
  if (to) return <Link to={to} className={classes} {...props} />;
  return <button type={type} className={classes} {...props} />;
}
