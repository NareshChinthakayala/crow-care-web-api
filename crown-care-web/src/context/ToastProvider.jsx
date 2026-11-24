import { useCallback, useRef, useState } from "react";
import { cx } from "../utils/format";
import { ToastContext } from "./toast-context";

const VISIBLE_MS = 2200;

/** Shows one short message at the bottom of the screen. */
export function ToastProvider({ children }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef();

  const showToast = useCallback((text) => {
    setMessage(text);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), VISIBLE_MS);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className={cx("toast", visible && "show")} role="status">
        {message}
      </div>
    </ToastContext.Provider>
  );
}
