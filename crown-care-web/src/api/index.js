/**
 * Every server call in the app goes through these objects.
 * Screens never touch mock data directly, so swapping in the real backend
 * only means editing the files in this folder.
 */
import { mockDb, mockResponse } from "./mockDb";

export { authApi } from "./authApi";
export { employeesApi } from "./employeesApi";
export { ordersApi } from "./ordersApi";
export { productsApi } from "./productsApi";

/** Demo only: restore the original dummy data. */
export const demoApi = {
  reset() {
    mockDb.reset();
    return mockResponse(true);
  },
};
