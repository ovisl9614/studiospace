import type { Metadata } from "next";

import { LoginPage } from "@/app/components/login";

export const metadata: Metadata = { title: "Login" };

export default function Login() {
  return <LoginPage />;
}
