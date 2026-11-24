import { MOCK_TODAY } from "../data/mockData";

/**
 * All dates in the app are "YYYY-MM-DD" strings.
 * When the real API is ready, switch TODAY to the real date:
 *   export const TODAY = new Date().toLocaleDateString("en-CA");
 */
export const TODAY = MOCK_TODAY;

const toDate = (iso) => new Date(iso + "T00:00");
const DAY_MS = 864e5;

export function addDays(iso, days) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export const YESTERDAY = addDays(TODAY, -1);
export const TOMORROW = addDays(TODAY, 1);

const daysFromToday = (iso) => Math.round((toDate(iso) - toDate(TODAY)) / DAY_MS);

/** "Today" / "Tomorrow" / "Yesterday" / "Thu, Nov 19" */
export function relativeDay(iso) {
  const diff = daysFromToday(iso);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  return toDate(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

/** "Tue, Nov 17, 2026" */
export const fullDate = (iso) =>
  toDate(iso).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

/** "Tuesday, 17 November 2026" — used in page headers */
export function longDate(iso) {
  const d = toDate(iso);
  const part = (opts) => d.toLocaleDateString("en-GB", opts);
  return `${part({ weekday: "long" })}, ${part({ day: "numeric" })} ${part({ month: "long" })} ${part({ year: "numeric" })}`;
}

/** Group heading: "Today · Tue, Nov 17, 2026" or just "Sun, Nov 15, 2026" */
export const dateHeading = (iso) =>
  Math.abs(daysFromToday(iso)) <= 1 ? `${relativeDay(iso)} · ${fullDate(iso)}` : fullDate(iso);

/**
 * Date filter used by the chips on Orders and My Appointments.
 * filter = "all" | "previous" | "upcoming" | "yesterday" | "today" | "tomorrow" | "YYYY-MM-DD"
 */
export function matchesDateFilter(iso, filter) {
  switch (filter) {
    case "all":
      return true;
    case "previous":
      return iso < TODAY;
    case "upcoming":
      return iso > TODAY;
    case "yesterday":
      return iso === YESTERDAY;
    case "today":
      return iso === TODAY;
    case "tomorrow":
      return iso === TOMORROW;
    default:
      return iso === filter;
  }
}

export const isCustomDate = (filter) => /^\d{4}-\d{2}-\d{2}$/.test(filter);

const FILTER_LABELS = {
  all: "all dates",
  previous: "previous days",
  upcoming: "upcoming days",
  yesterday: "yesterday",
  today: "today",
  tomorrow: "tomorrow",
};

/** Human label for a filter: "today", "previous days", "Tue, Nov 17, 2026" */
export const dateFilterLabel = (filter) => FILTER_LABELS[filter] ?? fullDate(filter);

/** Does the filter look backwards in time? (used to sort newest first) */
export const isPastFilter = (filter) =>
  filter === "previous" || filter === "yesterday" || (isCustomDate(filter) && filter < TODAY);

/** "Nov 2026" — the month of a date */
export const monthYear = (iso) => toDate(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
