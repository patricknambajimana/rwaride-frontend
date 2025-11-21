"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Login } from "./login/Login";
import { SignUp } from "./signup/SignUp";

export default function AuthPage() {
  const search = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">(
    (search?.get("mode") as "login" | "signup") || "login"
  );

  useEffect(() => {
    const m = (search?.get("mode") as string) || "login";
    if (m === "signup" || m === "login") setMode(m);
  }, [search]);

  const handleSuccessLogin = async (email: string, password: string) => {
    console.log("login success", email);
    router.push("/dashboard");
  };

  const handleSuccessSignUp = (
    email: string,
    password: string,
    role: string,
    name: string
  ) => {
    console.log("signup success", { email, role, name });
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 rounded-md bg-(--white)/80 p-1 shadow-sm">
        <button
          onClick={() => {
            setMode("login");
            router.replace("/auth?mode=login");
          }}
          className={`px-4 py-2 rounded-md font-medium transition-all ${
            mode === "login"
              ? "bg-(--primary-600) text-(--white) shadow"
              : "text-(--black) hover:bg-(--primary-50)"
          }`}
        >
          Log In
        </button>
        <button
          onClick={() => {
            setMode("signup");
            router.replace("/auth?mode=signup");
          }}
          className={`px-4 py-2 rounded-md font-medium transition-all ${
            mode === "signup"
              ? "bg-(--primary-600) text-(--white) shadow"
              : "text-(--black) hover:bg-(--primary-50)"
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="w-full">
        {mode === "login" ? (
          <Login
            onSuccess={handleSuccessLogin}
            onSwitchToSignUp={() => setMode("signup")}
          />
        ) : (
          <SignUp
            onSuccess={handleSuccessSignUp}
            onSwitchToLogin={() => setMode("login")}
          />
        )}
      </div>
    </div>
  );
}
