import { Badge } from "../../Components/ui/Display";
import { STOCK_CRITICAL, STOCK_FULL, STOCK_LOW } from "../../constants";

const stockTone = (stock) => (stock <= STOCK_CRITICAL ? "red" : stock <= STOCK_LOW ? "amber" : "green");

/** "14 in stock" — red when critical, amber when low, green otherwise. */
export const StockBadge = ({ stock, suffix = "in stock" }) => (
  <Badge tone={stockTone(stock)}>
    {stock} {suffix}
  </Badge>
);

/**
 * Stock as a small bar + number. The bar is full at STOCK_FULL units.
 *   <StockMeter stock={14} />
 */
export function StockMeter({ stock }) {
  const percent = Math.min(100, Math.round((stock / STOCK_FULL) * 100));
  const tone = stockTone(stock);
  return (
    <div className="meter" title={`${stock} in stock`}>
      <div className="meter-track">
        <span className={`bg-${tone}`} style={{ width: `${percent}%` }} />
      </div>
      <b className={`text-${tone}`}>{stock}</b>
    </div>
  );
}
