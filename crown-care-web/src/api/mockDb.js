/**
 * A tiny in-memory "database" that stands in for the backend.
 * It starts as a copy of the dummy data; changes are lost on page refresh.
 * Delete this file (and `data/mockData.js`) once the real API is wired up.
 */
import { seedData } from "../data/mockData";

let db = structuredClone(seedData);

export const mockDb = {
  get data() {
    return db;
  },
  reset() {
    db = structuredClone(seedData);
  },
};

const LATENCY_MS = 300; // fake network delay so loading states are visible

/** Resolve like a successful API call (returns a copy, like JSON over the wire). */
export const mockResponse = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), LATENCY_MS));

/** Reject like a failed API call. */
export const mockError = (message) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error(message)), LATENCY_MS));

/** Next numeric id for a list, e.g. nextNumber(orders, o => +o.id.split("-")[1]) */
export const nextNumber = (items, toNumber) => Math.max(0, ...items.map(toNumber)) + 1;

/** Never send passwords to the UI. */
export const withoutPassword = ({ password: _password, ...rest }) => rest;
