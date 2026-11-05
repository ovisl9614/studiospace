"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import { useAuth } from "@/components/auth/auth-context";
import { Logo, LogoMark } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PERKS = [
  "Instant booking with hourly pricing",
  "Verified hosts in 48+ cities",
  "Liability coverage on every shoot",
];

const STATS = [
  { value: "1,200+", label: "Spaces" },
  { value: "48+", label: "Cities" },
  { value: "4.9★", label: "Avg rating" },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.16 7.16 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { login, register, user } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [forgotHint, setForgotHint] = React.useState(false);

  const isRegister = mode === "register";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isRegister) register(name, email);
    else login(email);
  }

  if (user) {
    return (
      <section className="mx-auto w-full max-w-md px-4 py-24">
        <div className="rounded-3xl border border-border/60 bg-card p-10 text-center shadow-[0_24px_60px_-30px_oklch(0_0_0_/_90%)]">
          <LogoMark className="mx-auto size-12 rounded-2xl shadow-[0_0_24px_-8px_var(--brand-lime)]" />
          <p className="mt-5 text-lg font-semibold">You are already signed in.</p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Jump back into your dashboard to manage studios and bookings.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_36px_-10px_var(--brand-lime)] transition-transform hover:scale-[1.03]"
          >
            Go to Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* Ambient green edge glows, matching the banner treatment. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_-5%_30%,oklch(0.65_0.15_150/22%)_0%,transparent_70%),radial-gradient(45%_60%_at_105%_70%,oklch(0.65_0.15_150/16%)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr]">
        {/* Brand showcase panel */}
        <aside className="relative hidden min-h-[640px] overflow-hidden rounded-3xl ring-1 ring-border/60 lg:block">
          <Image
            src="/images/default-banner.jpg"
            alt=""
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-background/10"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
              1,200+ verified spaces
            </p>
            <h2 className="mt-5 max-w-md text-3xl leading-tight font-bold tracking-tight md:text-4xl">
              Find the room. <span className="text-primary">Roll camera.</span>
            </h2>
            <ul className="mt-6 space-y-2.5">
              {PERKS.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-2.5 text-sm text-foreground/85"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border/60 pt-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs tracking-wider text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-xl font-bold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        {/* Form card */}
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border/60 bg-card p-7 shadow-[0_24px_60px_-30px_oklch(0_0_0_/_90%)] md:p-9">
          <Logo
            markClassName="size-10 shadow-[0_0_22px_-8px_var(--brand-lime)]"
            className="w-fit"
          />

          <h1 className="mt-7 text-2xl font-bold tracking-tight">
            {isRegister ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {isRegister
              ? "Join thousands of creators booking spaces by the hour."
              : "Sign in to manage your studios and bookings."}
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            {isRegister ? (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ava Martinez"
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@studio.com"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="pr-10 pl-9"
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>
            </div>

            {isRegister ? null : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Checkbox id="remember" defaultChecked />
                  <Label
                    htmlFor="remember"
                    className="font-normal text-muted-foreground"
                  >
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={() => setForgotHint(true)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {forgotHint ? (
              <p className="rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                This is a demo build — any password works. Just enter your
                email and sign in.
              </p>
            ) : null}

            <Button
              type="submit"
              className="h-11 w-full gap-2 rounded-full text-sm font-semibold shadow-[0_0_36px_-10px_var(--brand-lime)]"
            >
              {isRegister ? "Create account" : "Sign in"}
              <ArrowRight className="size-4" />
            </Button>

            {isRegister ? (
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                By creating an account you agree to our{" "}
                <Link
                  href="/about"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/about"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            ) : null}
          </form>

          <div className="relative my-6 text-center">
            <span
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-border/60"
              aria-hidden
            />
            <span className="relative bg-card px-3 text-xs text-muted-foreground">
              or
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => login("creator@gmail.com")}
            className="h-10 w-full gap-2.5 rounded-full font-semibold"
          >
            <GoogleIcon />
            {isRegister ? "Sign up with Google" : "Continue with Google"}
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isRegister ? "Already have an account? " : "New to StudioSpace? "}
            <Link
              href={isRegister ? "/login" : "/register"}
              className="font-semibold text-primary hover:underline"
            >
              {isRegister ? "Sign in" : "Create one"}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
