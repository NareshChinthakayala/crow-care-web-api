import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

/** const showToast = useToast(); showToast("Saved"); */
export const useToast = () => useContext(ToastContext);
