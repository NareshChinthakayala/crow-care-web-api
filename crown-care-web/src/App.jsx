import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { EmployeeLayout } from "./components/layout/EmployeeLayout";
import { RequireAuth } from "./components/layout/RequireAuth";
import { ROLES, ROUTES } from "./constants";
import { AuthProvider } from "./context/AuthProvider";
import { DataProvider } from "./context/DataProvider";
import { ToastProvider } from "./context/ToastProvider";
import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminRegister from "./pages/auth/AdminRegister";
import EmployeeLogin from "./pages/auth/EmployeeLogin";
import MyAppointments from "./pages/employee/MyAppointments";
import Home from "./pages/Home";

/**
 * Route map of the whole app:
 *   /                         start page (choose Admin or Employee)
 *   /admin/login | /register  admin auth
 *   /employee/login           stylist auth
 *   /admin/*                  admin panel (login required)
 *   /employee/appointments    stylist's appointments (login required)
 */
export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.adminLogin} element={<AdminLogin />} />
            <Route path={ROUTES.adminRegister} element={<AdminRegister />} />
            <Route path={ROUTES.employeeLogin} element={<EmployeeLogin />} />

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

            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
