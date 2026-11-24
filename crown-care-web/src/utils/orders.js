/** Helpers for working with lists of orders. */
import { ORDER_STATUS } from "../constants";

/** Sort by date, then time. Pass newestFirst=true to show the latest day first. */
export const sortOrders = (orders, newestFirst = false) =>
  [...orders].sort((a, b) =>
    a.date === b.date
      ? a.time.localeCompare(b.time)
      : newestFirst
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date),
  );

export const isCompleted = (order) => order.status === ORDER_STATUS.COMPLETED;

export const countCompleted = (orders) => orders.filter(isCompleted).length;

/** Total service price of a list of orders. */
export const totalValue = (orders, getProduct) =>
  orders.reduce((sum, o) => sum + (getProduct(o.serviceId)?.servicePrice ?? 0), 0);

/** Group into { "2026-11-17": [...], ... } keeping the input order. */
export function groupByDate(orders) {
  const groups = {};
  orders.forEach((o) => (groups[o.date] ??= []).push(o));
  return groups;
}
