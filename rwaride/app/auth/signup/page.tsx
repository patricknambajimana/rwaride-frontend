"use client";

import React from "react";
import { RegisterForm } from "./RegisterForm";


export default function SignupPage() {
  const handleSuccess = () => {
    // handle successful signup (e.g., navigate or show a message)
  };

  const handleSwitchToLogin = () => {
    // handle switching to the login view
  };

  return (
    <RegisterForm
      onSuccess={handleSuccess}
      onSwitchToLogin={handleSwitchToLogin}
    />
  );
}
