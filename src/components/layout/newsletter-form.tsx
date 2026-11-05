"use client";

import * as React from "react";
import { Check, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [subscribed, setSubscribed] = React.useState(false);

  if (subscribed) {
    return (
      <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        <Check className="size-4" />
        You&apos;re on the list — see you in your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubscribed(true);
      }}
      className="flex w-full max-w-sm items-center gap-2"
    >
      <Input
        type="email"
        required
        placeholder="you@studio.com"
        aria-label="Email address"
        className="h-10 rounded-full bg-background/60"
      />
      <Button
        type="submit"
        className="h-10 shrink-0 rounded-full px-5 font-semibold shadow-[0_0_24px_-10px_var(--brand-lime)]"
      >
        <Send className="size-4" />
        Subscribe
      </Button>
    </form>
  );
}
