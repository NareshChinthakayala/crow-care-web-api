import { useState } from "react";

/**
 * Wraps an async function with `pending` and `error` state.
 *
 *   const { run, pending, error } = useAsyncAction(async (values) => { ... });
 *   const ok = await run(values); // true if it finished without throwing
 */
export function useAsyncAction(action) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function run(...args) {
    setPending(true);
    setError("");
    try {
      await action(...args);
      return true;
    } catch (err) {
      setError(err.message || "Something went wrong.");
      return false;
    } finally {
      setPending(false);
    }
  }

  return { run, pending, error, clearError: () => setError("") };
}
