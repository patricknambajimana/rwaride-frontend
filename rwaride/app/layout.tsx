import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from "next/font/google";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Rwaride",
  description: "thi is rwaride app",
  icons: {
    icon: "/Contemporary Logo Design for RwaRide.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ConditionalNavbar />
        <main> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
