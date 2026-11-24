import { useEffect, useMemo, useState } from "react";
import { demoApi, employeesApi, ordersApi, productsApi } from "../api";
import { Button } from "../Components/ui/Button";
import { WigArt, WigLoader } from "../Components/ui/WigLoader";
import { DataContext } from "./data-context";

const EMPTY = { products: [], employees: [], orders: [] };

/**
 * Loads products, employees and orders once, and exposes actions that call
 * the API and then update local state with what the server returned.
 */
export function DataProvider({ children }) {
  const [data, setData] = useState(EMPTY);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [loadCount, setLoadCount] = useState(0); // bump to re-fetch

  useEffect(() => {
    let active = true;
    Promise.all([productsApi.list(), employeesApi.list(), ordersApi.list()])
      .then(([products, employees, orders]) => {
        if (!active) return;
        setData({ products, employees, orders });
        setStatus("ready");
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [loadCount]);

  const value = useMemo(() => {
    /** Returns a function that inserts or replaces an item in one collection. */
    const saveTo = (key) => (item) => {
      setData((d) => ({
        ...d,
        [key]: d[key].some((x) => x.id === item.id)
          ? d[key].map((x) => (x.id === item.id ? item : x))
          : [...d[key], item],
      }));
      return item;
    };
    const saveOrder = saveTo("orders");

    const productById = new Map(data.products.map((p) => [p.id, p]));
    const employeeById = new Map(data.employees.map((e) => [e.id, e]));

    return {
      ...data,
      getProduct: (id) => productById.get(Number(id)),
      getEmployee: (id) => employeeById.get(id),

      // Orders
      createOrder: (input) => ordersApi.create(input).then(saveOrder),
      assignOrder: (id, employeeId) => ordersApi.assign(id, employeeId).then(saveOrder),
      startOrder: (id) => ordersApi.start(id).then(saveOrder),
      addOrderProgress: (id) => ordersApi.addProgress(id).then(saveOrder),
      completeOrder: (id) => ordersApi.complete(id).then(saveOrder),

      // Products & employees
      saveProduct: (id, input) =>
        (id ? productsApi.update(id, input) : productsApi.create(input)).then(saveTo("products")),
      createEmployee: (input) => employeesApi.create(input).then(saveTo("employees")),

      // Demo only
      resetDemo: () => demoApi.reset().then(() => setLoadCount((n) => n + 1)),
    };
  }, [data]);

  if (status === "loading") return <WigLoader fullScreen message="Bringing out the wig collection…" />;
  if (status === "error") {
    return (
      <div className="page-loader">
        <WigArt size={72} />
        <p>Couldn&apos;t load your wig studio data.</p>
        <Button
          onClick={() => {
            setStatus("loading");
            setLoadCount((n) => n + 1);
          }}
        >
          Try again
        </Button>
      </div>
    );
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
