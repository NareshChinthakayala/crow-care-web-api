import { ORDER_STATUS, PROGRESS_STEP } from "../constants";
import { mockDb, mockError, mockResponse, nextNumber } from "./mockDb";

/** Apply changes to one order and return the updated order. */
function updateOrder(id, getChanges) {
  const order = mockDb.data.orders.find((o) => o.id === id);
  if (!order) return mockError("Order not found");
  Object.assign(order, getChanges(order));
  return mockResponse(order);
}

export const ordersApi = {
  /** GET /orders */
  list: () => mockResponse(mockDb.data.orders),

  /** POST /orders */
  create(input) {
    const { orders } = mockDb.data;
    const order = {
      ...input,
      id: `ORD-${nextNumber(orders, (o) => Number(o.id.split("-")[1]))}`,
      employeeId: input.employeeId || null,
      status: input.employeeId ? ORDER_STATUS.ASSIGNED : ORDER_STATUS.NEW,
      progress: 0,
    };
    orders.push(order);
    return mockResponse(order);
  },

  /** PATCH /orders/:id/assign */
  assign: (id, employeeId) =>
    updateOrder(id, (o) => ({
      employeeId,
      status: o.status === ORDER_STATUS.NEW ? ORDER_STATUS.ASSIGNED : o.status,
    })),

  /** PATCH /orders/:id/start — employee begins the service */
  start: (id) =>
    updateOrder(id, (o) => ({
      status: ORDER_STATUS.IN_PROGRESS,
      progress: Math.max(o.progress, PROGRESS_STEP),
    })),

  /** PATCH /orders/:id/progress — bump progress; reaching 100% completes it */
  addProgress: (id) =>
    updateOrder(id, (o) => {
      const progress = Math.min(o.progress + PROGRESS_STEP, 100);
      return { progress, status: progress === 100 ? ORDER_STATUS.COMPLETED : o.status };
    }),

  /** PATCH /orders/:id/complete */
  complete: (id) => updateOrder(id, () => ({ status: ORDER_STATUS.COMPLETED, progress: 100 })),
};
