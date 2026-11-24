import { Badge } from "../../Components/ui/Display";
import { STATUS_META } from "../../constants";

export function OrderStatusBadge({ status }) {
  const meta = STATUS_META[status] ?? { label: status, tone: "gray" };
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}
