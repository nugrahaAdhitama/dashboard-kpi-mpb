"use client";

/**
 * Main header component for the application
 * Contains the logo, app title, and main navigation
 */
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Tentang Kami", href: "/tentang-kami" },
    { label: "Kontak", href: "/kontak" },
  ];

  return (
    <header
      className={`flex justify-between items-center w-full py-4 px-4 md:px-8 ${className}`}
    >
      <div className="flex items-center space-x-3">
        <Image
          src="/logo.svg"
          alt="Dashboard KPI Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <span className="text-lg font-medium text-[#1F2937]">
          Dashboard KPI
        </span>
      </div>

      <nav className="hidden md:block">
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[#4B5563] hover:text-[#3B82F6] transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="block md:hidden text-[#4B5563]"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
};

export default Header;
