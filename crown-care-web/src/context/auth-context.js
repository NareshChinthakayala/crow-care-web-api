import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

/** const { user, role, loginAdmin, loginEmployee, registerAdmin, logout } = useAuth(); */
export const useAuth = () => useContext(AuthContext);
