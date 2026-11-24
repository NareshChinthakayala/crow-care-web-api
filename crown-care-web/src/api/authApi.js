import { EMPLOYEE_STATUS } from "../constants";
import { mockDb, mockError, mockResponse, withoutPassword } from "./mockDb";

export const authApi = {
  /** POST /auth/admin/login */
  loginAdmin({ email, password }) {
    const { admin } = mockDb.data;
    if (admin.email.toLowerCase() !== email.trim().toLowerCase() || admin.password !== password) {
      return mockError("Incorrect email or password.");
    }
    return mockResponse(withoutPassword(admin));
  },

  /** POST /auth/admin/register */
  registerAdmin(form) {
    if (form.password !== form.confirmPassword) return mockError("Passwords do not match.");
    const { confirmPassword: _confirm, ...admin } = form;
    mockDb.data.admin = admin; // the prototype supports one salon
    return mockResponse(withoutPassword(admin));
  },

  /** POST /auth/employee/login — accepts an email or an employee ID */
  loginEmployee({ identifier, password }) {
    const key = identifier.trim().toLowerCase();
    const emp = mockDb.data.employees.find((e) => e.email.toLowerCase() === key || e.id.toLowerCase() === key);
    if (!emp) return mockError("No employee found with this email / ID. Please check with your admin.");
    if (emp.password !== password) return mockError("Wrong password. Please try again.");
    if (emp.status !== EMPLOYEE_STATUS.ACTIVE) {
      return mockError("Your account is not active (On Leave). Please contact your admin.");
    }
    return mockResponse(withoutPassword(emp));
  },

  /** Demo only: logins shown on the employee login screen. Remove with the mock. */
  demoAccounts: () =>
    mockResponse(mockDb.data.employees.map(({ id, name, email, password, status }) => ({ id, name, email, password, status }))),
};
