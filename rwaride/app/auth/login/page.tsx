"use client";

import React from "react";
import { Login } from "../LoginForm";

export default function LoginPage() {
  const handleLogin = (user: any) => {
    // TODO: replace mock behavior with real auth flow
    console.log("logged in", user);
  };

  return <Login onLogin={handleLogin} />;
}
