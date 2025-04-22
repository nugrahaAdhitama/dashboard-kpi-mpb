"use client";

/**
 * Footer component for the application
 * Contains copyright information, help link, and creation year
 */
import React from "react";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full py-6 px-4 md:px-8 bg-[#F3F4F6] ${className}`}>
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-[#4B5563]">
          &copy; {currentYear} Dashboard KPI. All rights reserved.
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/bantuan"
            className="text-sm text-[#4B5563] hover:text-[#3B82F6] transition-colors duration-200"
          >
            Bantuan
          </Link>
          <span className="text-sm text-[#4B5563]">2024</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
