"use client";


import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  const handleLogin = (user: any) => {
    // TODO: replace mock behavior with real auth flow
    console.log("logged in", user);
  };

  return <LoginForm {...({ onLogin: handleLogin } as any)} />;
}
