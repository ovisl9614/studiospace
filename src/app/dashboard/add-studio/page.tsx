import type { Metadata } from "next";

import { DashboardShell } from "@/components/auth/dashboard-shell";
import { AddStudioForm } from "@/components/auth/add-studio-form";

export const metadata: Metadata = { title: "Add New Studio" };

export default function AddStudioPage() {
  return (
    <DashboardShell
      title="Add New Studio"
      description="List a space and start taking bookings in minutes."
    >
      <AddStudioForm />
    </DashboardShell>
  );
}
