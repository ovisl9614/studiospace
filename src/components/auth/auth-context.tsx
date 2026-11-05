"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export type AuthUser = {
  name: string;
  email: string;
  avatarUrl: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  /** True until the client has hydrated and the session could be read. */
  loading: boolean;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
};

const STORAGE_KEY = "studiospace:user";
const CHANGE_EVENT = "studiospace:auth-change";

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, listener);
  };
}

/**
 * Cached parse of the stored session so `getSnapshot` stays referentially
 * stable between renders, as required by `useSyncExternalStore`.
 */
let cachedRaw: string | null = null;
let cachedUser: AuthUser | null = null;

function readUser(): AuthUser | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage unavailable (private mode, blocked cookies) — treat as logged out.
    return null;
  }

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedUser = raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      cachedUser = null;
    }
  }
  return cachedUser;
}

const emptySubscribe = () => () => {};

function avatarFor(name: string, email: string) {
  const seed = encodeURIComponent(email || name);
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${seed}`;
}

function deriveName(email: string) {
  const local = email.split("@")[0] ?? "";
  const pretty = local
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return pretty || "Creator";
}

function writeUser(next: AuthUser | null) {
  try {
    if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable — fall through; listeners still re-read current state.
  }
  cachedRaw = null;
  emitChange();
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hydrated = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const storedUser = React.useSyncExternalStore(subscribe, readUser, () => null);

  const login = (email: string) => {
    const name = deriveName(email);
    writeUser({ name, email, avatarUrl: avatarFor(name, email) });
    router.push("/dashboard");
  };

  const register = (name: string, email: string) => {
    writeUser({ name, email, avatarUrl: avatarFor(name, email) });
    router.push("/dashboard");
  };

  const logout = () => {
    writeUser(null);
    router.push("/");
  };

  const value = {
    user: hydrated ? storedUser : null,
    loading: !hydrated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
