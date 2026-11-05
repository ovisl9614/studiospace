import { AuthForm } from "@/components/auth/auth-form";

/**
 * `/login` page body: the sign-in card paired with the brand showcase panel.
 * The shared `AuthForm` also powers `/register` via `mode="register"`.
 */
export function LoginPage() {
  return <AuthForm mode="login" />;
}
