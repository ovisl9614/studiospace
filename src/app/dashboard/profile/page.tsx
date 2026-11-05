import type { Metadata } from "next";

import { DashboardShell } from "@/components/auth/dashboard-shell";
import { ProfileCard } from "@/components/auth/profile-card";

export const metadata: Metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <DashboardShell
      title="My Profile"
      description="Your account details and session controls."
    >
      <ProfileCard />
    </DashboardShell>
  );
}
