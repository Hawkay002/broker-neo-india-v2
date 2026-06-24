import { useCallback, useSyncExternalStore } from "react";
import { listings, type Listing } from "@/data";

const STORAGE_KEY = "brut_wishlist";
const EVENT_KEY = "brut-wishlist-change";

function getStoredIds(): number[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function emitChange() {
  listeners.forEach((cb) => cb());
}

let cachedSnapshot: number[] | null = null;

function getSnapshot() {
  const current = getStoredIds();
  if (
    !cachedSnapshot ||
    cachedSnapshot.length !== current.length ||
    !cachedSnapshot.every((id, i) => id === current[i])
  ) {
    cachedSnapshot = current;
  }
  return cachedSnapshot;
}

export function useWishlist() {
  const savedIds = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const toggle = useCallback((id: number) => {
    const current = getStoredIds();
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    emitChange();
  }, []);

  const isSaved = useCallback(
    (id: number) => savedIds.includes(id),
    [savedIds]
  );

  const savedListings: Listing[] = listings.filter((l) => savedIds.includes(l.id));

  const clearAll = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    emitChange();
  }, []);

  return { savedIds, savedListings, toggle, isSaved, clearAll };
}