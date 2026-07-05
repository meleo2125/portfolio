"use client";

import { useSyncExternalStore } from "react";

/**
 * A minimal, dependency-free store — Zustand-shaped API but ~30 lines.
 * Perfect for the single piece of shared UI state we need (hovered skill).
 */
type SetFn<T> = (partial: Partial<T> | ((prev: T) => Partial<T>)) => void;
type Selector<T, U> = (state: T) => U;

export function create<T extends object>(
  init: (set: SetFn<T>, get: () => T) => T
) {
  let state: T;
  const listeners = new Set<() => void>();

  const set: SetFn<T> = (partial) => {
    const next =
      typeof partial === "function"
        ? (partial as (prev: T) => Partial<T>)(state)
        : partial;
    state = { ...state, ...next };
    listeners.forEach((l) => l());
  };

  const get = () => state;
  state = init(set, get);

  function subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  }

  function useStore(): T;
  function useStore<U>(selector: Selector<T, U>): U;
  function useStore<U>(selector?: Selector<T, U>) {
    return useSyncExternalStore(
      subscribe,
      () => (selector ? selector(state) : (state as unknown as U)),
      () => (selector ? selector(state) : (state as unknown as U))
    );
  }

  return useStore;
}
