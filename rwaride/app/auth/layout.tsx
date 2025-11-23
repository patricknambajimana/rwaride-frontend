import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";

export const metadata = {
  title: "Auth - RwaRide",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <Navbar />
        <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-(--primary-50) to-(--secondary-50) px-4 py-8">
          <div className="w-full max-w-4xl">{children}</div>
        </section>
      </body>
    </html>
  );
}
