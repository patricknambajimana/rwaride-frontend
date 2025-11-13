"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="w-full flex justify-between items-center px-6 md:px-12 py-4 shadow-lg fixed z-50 border-b-2 border-(--primary-300) bg-linear-to-r from-(--primary-500) via-(--primary-400) to-(--secondary-500)"
      role="navigation"
      aria-label="Main navigation"
    >
      <Link
        href="/"
        className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-(--white)/50 focus:ring-offset-2 rounded-lg"
        aria-label="RwaRide Home"
      >
        <img
          src="Contemporary Logo Design for RwaRide.png"
          alt="RwaRide Logo"
          className="rounded-full size-16 object-cover shadow-lg hover:shadow-xl transition-shadow"
        />
        <span className="text-2xl font-bold text-(--white) drop-shadow-md hover:drop-shadow-lg transition-all duration-200">
          RwaRide
        </span>
      </Link>

      <div className="hidden md:flex space-x-8 text-(--white) font-medium">
        <Link
          href="/"
          className="relative pb-1 transition-colors duration-200 hover:text-(--white)/80 focus:outline-none focus:ring-2 focus:ring-(--white)/40 rounded px-3 py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-(--secondary-200) after:transition-all after:duration-300 hover:after:w-full"
        >
          Home
        </Link>
        <Link
          href="#how"
          className="relative pb-1 transition-colors duration-200 hover:text-(--white)/80 focus:outline-none focus:ring-2 focus:ring-(--white)/40 rounded px-3 py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-(--secondary-200) after:transition-all after:duration-300 hover:after:w-full"
        >
          How it Works
        </Link>
        <Link
          href="#safety"
          className="relative pb-1 transition-colors duration-200 hover:text-(--white)/80 focus:outline-none focus:ring-2 focus:ring-(--white)/40 rounded px-3 py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-(--secondary-200) after:transition-all after:duration-300 hover:after:w-full"
        >
          Safety
        </Link>
        <Link
          href="#contact"
          className="relative pb-1 transition-colors duration-200 hover:text-(--white)/80 focus:outline-none focus:ring-2 focus:ring-(--white)/40 rounded px-3 py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-(--secondary-200) after:transition-all after:duration-300 hover:after:w-full"
        >
          Contact
        </Link>
      </div>

      <div className="flex space-x-4 items-center">
        <Link
          href="/login"
          className="px-6 py-2 border-2 border-(--white)/60 text-(--white) bg-transparent hover:bg-(--white)/10 hover:border-(--white) font-semibold transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-(--white)/40 rounded-lg backdrop-blur-sm"
          aria-label="Login to RwaRide"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-6 py-2 bg-(--white) text-(--primary-600) rounded-lg font-bold transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-110 focus:outline-none focus:ring-3 focus:ring-(--white)/50 focus:ring-offset-2 focus:ring-offset-(--primary-500)"
          aria-label="Sign up for RwaRide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform group-hover:rotate-12"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM12 14c-6 0-8 3-8 3v3h16v-3s-2-3-8-3z" />
          </svg>
          <span>Sign Up</span>
        </Link>
      </div>
    </nav>
  );
}
