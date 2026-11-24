/** App-wide constants. Change a value here and every screen picks it up. */

export const ROUTES = {
  home: "/",
  adminLogin: "/admin/login",
  adminRegister: "/admin/register",
  employeeLogin: "/employee/login",
  dashboard: "/admin/dashboard",
  orders: "/admin/orders",
  products: "/admin/products",
  employees: "/admin/employees",
  myAppointments: "/employee/appointments",
};

export const ROLES = { ADMIN: "admin", EMPLOYEE: "employee" };

/* ---------- Orders ---------- */
export const ORDER_STATUS = {
  NEW: "New",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

/** How each status is shown: label + badge colour + position in the timeline. */
export const STATUS_META = {
  [ORDER_STATUS.NEW]: { label: "Unassigned", tone: "red", step: 0 },
  [ORDER_STATUS.ASSIGNED]: { label: "Assigned", tone: "blue", step: 1 },
  [ORDER_STATUS.IN_PROGRESS]: { label: "In Progress", tone: "amber", step: 2 },
  [ORDER_STATUS.COMPLETED]: { label: "Completed", tone: "green", step: 3 },
};

export const ORDER_TIMELINE = ["Order received", "Assigned to employee", "Service in progress", "Completed"];

export const ORDER_SOURCES = ["Walk-in", "Phone call", "WhatsApp"];

/** How much "+ progress" adds each tap on the employee screen. */
export const PROGRESS_STEP = 25;

/* ---------- Employees ---------- */
export const EMPLOYEE_STATUS = { ACTIVE: "Active", ON_LEAVE: "On Leave" };
export const DEFAULT_EMPLOYEE_PASSWORD = "welcome123";

/* ---------- Products ---------- */
export const STOCK_LOW = 9; // shown in amber and listed on the dashboard
export const STOCK_CRITICAL = 5; // shown in red

/* ---------- Date filter chips ---------- */
export const ADMIN_DATE_FILTERS = [
  { value: "all", label: "All dates" },
  { value: "yesterday", label: "Yesterday" },
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "previous", label: "Previous days" },
  { value: "upcoming", label: "Upcoming" },
];

export const EMPLOYEE_DATE_FILTERS = [
  { value: "previous", label: "Previous days" },
  { value: "yesterday", label: "Yesterday" },
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "upcoming", label: "Upcoming" },
  { value: "all", label: "All" },
];
