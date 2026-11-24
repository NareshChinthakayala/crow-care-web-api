/** Small display helpers. */

/** 35 → "$35", 12.99 → "$12.99", 1948.5 → "$1,948.50" */
export const money = (n) =>
  "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\.00$/, "");

/** "Naomi Adebayo" → "NA" */
export const initials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** "14:30" → "2:30 PM" */
export function formatTime(time) {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/** "1 order" / "3 orders" */
export const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

/** Read a submitted <form> as a plain object: { name: value, ... } */
export const formValues = (form) => Object.fromEntries(new FormData(form));

/** Join class names, skipping falsy values: cx("btn", isActive && "active") */
export const cx = (...classes) => classes.filter(Boolean).join(" ");
