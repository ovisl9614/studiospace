"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";

import { STUDIO_CATEGORIES } from "@/lib/studio-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddStudioForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = React.useState(false);
  const [category, setCategory] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => router.push("/dashboard/listings"), 1200);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary/40 bg-primary/10 p-10 text-center">
        <CircleCheck className="mx-auto size-10 text-primary" />
        <p className="mt-4 text-lg font-semibold">Studio submitted for review</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Redirecting you to your listings…
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-6 rounded-2xl border border-border/60 bg-card p-6 md:p-8"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Studio title</Label>
        <Input
          id="title"
          placeholder="e.g. Lumen Cyclorama Photo Studio"
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value ?? "")}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {STUDIO_CATEGORIES.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate">Hourly rate (USD)</Label>
          <Input id="rate" type="number" min={1} placeholder="85" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="Neighborhood, City State" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="Describe the space, its size, access and what makes it great for shoots."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amenities">Amenities</Label>
        <Input id="amenities" placeholder="Cyclorama, Ceiling grid, Makeup room" />
        <p className="text-xs text-muted-foreground">
          Separate each amenity with a comma.
        </p>
      </div>

      <Button
        type="submit"
        className="h-11 rounded-full px-8 text-sm font-semibold shadow-[0_0_36px_-10px_var(--brand-lime)]"
      >
        Submit Studio
      </Button>
    </form>
  );
}
