import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./Components/layout/AdminLayout";
import { EmployeeLayout } from "./Components/layout/EmployeeLayout";
import { RequireAuth } from "./Components/layout/RequireAuth";
import { ROLES, ROUTES } from "./constants";
import { AuthProvider } from "./context/AuthProvider";
import { DataProvider } from "./context/DataProvider";
import { ToastProvider } from "./context/ToastProvider";
import Dashboard from "./Pages/admin/Dashboard";
import Employees from "./Pages/admin/Employees";
import Orders from "./Pages/admin/Orders";
import Products from "./Pages/admin/Products";
import MyAppointments from "./Pages/employee/MyAppointments";
import Login from "./Pages/Login";

/**
 * Route map of the whole app:
 *   /                         login screen (Admin / Employee tabs)
 *   /admin/*                  admin panel (admin login required)
 *   /employee/appointments    stylist's appointments (employee login required)
 */
export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path={ROUTES.login} element={<Login />} />

            <Route
              path="/admin"
              element={
                <RequireAuth role={ROLES.ADMIN}>
                  <DataProvider>
                    <AdminLayout />
                  </DataProvider>
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to={ROUTES.dashboard} replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="employees" element={<Employees />} />
            </Route>

            <Route
              path="/employee"
              element={
                <RequireAuth role={ROLES.EMPLOYEE}>
                  <DataProvider>
                    <EmployeeLayout />
                  </DataProvider>
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to={ROUTES.myAppointments} replace />} />
              <Route path="appointments" element={<MyAppointments />} />
            </Route>

            {/* Unknown URL → back to login */}
            <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
