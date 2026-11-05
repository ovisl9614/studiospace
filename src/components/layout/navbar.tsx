"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  User,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-context";
import { Logo, LogoMark } from "@/components/layout/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function UserMenu() {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-2 rounded-full border border-border/60 bg-card/60 py-1 pr-3 pl-1 outline-none transition-colors hover:bg-card data-popup-open:bg-card"
        aria-label="Open account menu"
      >
        <Avatar size="sm">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-primary/20 text-xs text-primary">
            {initials(user.name)}
          </AvatarFallback>
        </Avatar>
        <span className="hidden text-sm font-medium md:inline">
          {user.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="w-60">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-semibold text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => router.push("/dashboard/profile")}>
          <User /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push("/dashboard")}>
          <LayoutDashboard /> Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push("/dashboard/add-studio")}>
          <PlusCircle /> Add New Studio
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push("/dashboard/listings")}>
          <Building2 /> My Studio Listings
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push("/dashboard/bookings")}>
          <CalendarDays /> My Bookings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={() => router.push("/logout")}
        >
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthActions({ onNavigate }: { onNavigate?: () => void }) {
  const { user, loading } = useAuth();

  // While the session is unknown (and on the server) render the guest actions:
  // this keeps Login/Register in the prerendered HTML and avoids a hydration
  // mismatch, since the server output and first client render agree.
  if (loading || !user) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          nativeButton={false}
          className="gap-2 rounded-full px-4 text-foreground/80 hover:text-foreground"
          render={
            <Link href="/login" onClick={onNavigate}>
              <User className="size-4" />
              Login
            </Link>
          }
        />
        <Button
          nativeButton={false}
          className="h-9 rounded-full px-5 font-semibold shadow-[0_0_24px_-6px_var(--brand-lime)]"
          render={
            <Link href="/register" onClick={onNavigate}>
              Register
            </Link>
          }
        />
      </div>
    );
  }

  return <UserMenu />;
}

function NavItems({
  pathname,
  onNavigate,
  className,
}: {
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {NAV_LINKS.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
              active
                ? "text-primary"
                : "text-foreground/70 hover:bg-muted/60 hover:text-foreground"
            )}
          >
            {link.label}
            <span
              className={cn(
                "absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-primary transition-transform duration-200",
                active ? "scale-x-100" : "scale-x-0"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Floating pill navbar: logo on the left, navigation perfectly centered and
 * auth actions on the right. Sticky with active-route indicators, plus a
 * slide-over menu for small screens.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-border/70 bg-card/80 px-5 shadow-[0_20px_50px_-24px_oklch(0_0_0_/_90%)] backdrop-blur-xl md:grid md:grid-cols-[1fr_auto_1fr] md:px-6">
        <Logo
          markClassName="size-9 shadow-[0_0_22px_-8px_var(--brand-lime)]"
          className="shrink-0 justify-self-start"
        />

        <NavItems
          pathname={pathname}
          className="hidden justify-self-center md:flex"
        />

        <div className="hidden justify-self-end md:block">
          <AuthActions />
        </div>

        <div className="flex items-center justify-self-end md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-card/60 text-foreground outline-none hover:bg-muted"
              aria-label="Open navigation menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-72 gap-6">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5">
                  <LogoMark className="size-8" />
                  Studio<span className="text-primary">Space</span>
                </SheetTitle>
              </SheetHeader>
              <NavItems
                pathname={pathname}
                onNavigate={() => setOpen(false)}
                className="flex-col items-stretch gap-1"
              />
              <div className="mt-auto border-t border-border/60 pt-4">
                <AuthActions onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
