"use client";

/**
 * Breadcrumb navigation component
 * Displays the current page's location within a navigational hierarchy
 */
import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && (
              <li className="text-[#9CA3AF]" aria-hidden="true">
                /
              </li>
            )}
            <li>
              {item.isCurrent ? (
                <span
                  className="text-[#4B5563] font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[#3B82F6] hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
