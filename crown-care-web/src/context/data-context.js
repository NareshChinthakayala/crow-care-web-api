import { createContext, useContext } from "react";

export const DataContext = createContext(null);

/**
 * Salon data + actions for logged-in screens:
 *   const { orders, products, employees, getProduct, getEmployee, assignOrder, ... } = useData();
 */
export const useData = () => useContext(DataContext);
