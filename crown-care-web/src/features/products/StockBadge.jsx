import { Badge } from "../../components/ui/Display";
import { STOCK_CRITICAL, STOCK_LOW } from "../../constants";

const stockTone = (stock) => (stock <= STOCK_CRITICAL ? "red" : stock <= STOCK_LOW ? "amber" : "green");

/** "14 in stock" — red when critical, amber when low, green otherwise. */
export const StockBadge = ({ stock, suffix = "in stock" }) => (
  <Badge tone={stockTone(stock)}>
    {stock} {suffix}
  </Badge>
);
