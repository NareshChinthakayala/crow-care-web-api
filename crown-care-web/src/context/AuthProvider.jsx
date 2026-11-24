import { useMemo, useState } from "react";
import { authApi } from "../api";
import { ROLES } from "../constants";
import { AuthContext } from "./auth-context";

/*
 * Session = { role: "admin" | "employee", user: {...} }
 * "Remember me" keeps it in localStorage; otherwise it lasts for the browser tab (sessionStorage).
 */
const STORAGE_KEY = "crowncare.session";

function readSession() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function writeSession(session, remember) {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
    if (session) (remember ? localStorage : sessionStorage).setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* storage blocked (private mode) — session simply won't survive a refresh */
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const value = useMemo(() => {
    const start = (role, user, remember = false) => {
      const next = { role, user };
      writeSession(next, remember);
      setSession(next);
      return user;
    };

    return {
      user: session?.user ?? null,
      role: session?.role ?? null,

      loginAdmin: async (credentials, remember) =>
        start(ROLES.ADMIN, await authApi.loginAdmin(credentials), remember),

      registerAdmin: async (form) => start(ROLES.ADMIN, await authApi.registerAdmin(form)),

      loginEmployee: async (credentials) => start(ROLES.EMPLOYEE, await authApi.loginEmployee(credentials)),

      logout() {
        writeSession(null);
        setSession(null);
      },
    };
  }, [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
