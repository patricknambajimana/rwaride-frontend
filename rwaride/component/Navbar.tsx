"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="w-full flex justify-between items-center px-6 md:px-12 py-4 bg-white shadow-sm border-b-2 border-primary-100"
      role="navigation"
      aria-label="Main navigation"
    >
      <Link
        href="/"
        className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
        aria-label="RwaRide Home"
      >
        <img
          src="Contemporary Logo Design for RwaRide.png"
          alt="RwaRide Logo"
          className="rounded-full size-16 object-cover"
        />
        <span className="text-xl font-bold bg-linear-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
          RwaRide
        </span>
      </Link>

      <div className="hidden md:flex space-x-10">
        <Link
          href="/"
          className="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1 font-medium transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="#how"
          className="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1 font-medium transition-colors duration-200"
        >
          How it Works
        </Link>
        <Link
          href="#safety"
          className="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1 font-medium transition-colors duration-200"
        >
          Safety
        </Link>
        <Link
          href="#contact"
          className="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1 font-medium transition-colors duration-200"
        >
          Contact
        </Link>
      </div>

      <div className="flex space-x-4 items-center">
        <button
          className="px-5 py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          aria-label="Login to RwaRide"
        >
          Login
        </button>
        <button
          className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          aria-label="Sign up for RwaRide"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
