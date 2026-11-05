import type { Metadata } from "next";

import { LogoutPage } from "@/app/components/logout";

export const metadata: Metadata = { title: "Logging out" };

export default function Logout() {
  return <LogoutPage />;
}
