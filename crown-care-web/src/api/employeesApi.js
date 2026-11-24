import { EMPLOYEE_STATUS } from "../constants";
import { monthYear, TODAY } from "../utils/date";
import { mockDb, mockError, mockResponse, nextNumber, withoutPassword } from "./mockDb";

export const employeesApi = {
  /** GET /employees */
  list: () => mockResponse(mockDb.data.employees.map(withoutPassword)),

  /** POST /employees — the email becomes the employee's login */
  create(input) {
    const { employees } = mockDb.data;
    const email = input.email.trim().toLowerCase();
    if (employees.some((e) => e.email.toLowerCase() === email)) {
      return mockError("An employee with this email already exists.");
    }
    const employee = {
      ...input,
      email,
      id: `E${nextNumber(employees, (e) => Number(e.id.slice(1)))}`,
      status: EMPLOYEE_STATUS.ACTIVE,
      joined: monthYear(TODAY),
    };
    employees.push(employee);
    return mockResponse(withoutPassword(employee));
  },
};
