"use client";

/**
 * POB Card component for displaying a Prosedur Operasional Baku
 * Features an icon, title, description, KPI count, and a CTA button
 */
import React from "react";
import { IPOB } from "@/interfaces/pob";
import Button from "@/components/atoms/Button";
import { FaClipboardCheck, FaUserCheck } from "react-icons/fa";
import Link from "next/link";

interface POBCardProps {
  pob: IPOB;
  className?: string;
}

const iconMap = {
  "clipboard-check": FaClipboardCheck,
  "user-check": FaUserCheck,
};

const POBCard: React.FC<POBCardProps> = ({ pob, className = "" }) => {
  const IconComponent = iconMap[pob.iconName as keyof typeof iconMap];

  return (
    <div
      className={`
        w-full max-w-[350px] h-[250px] p-6 bg-white rounded-lg shadow-md
        hover:shadow-lg hover:scale-[1.03] transition-all duration-300 ease-in-out
        flex flex-col justify-between
        ${className}
      `}
    >
      <div className="space-y-4">
        <div className="text-[#3B82F6] text-3xl">
          <IconComponent />
        </div>

        <h3 className="text-xl font-semibold text-[#1F2937] line-clamp-1">
          {pob.title}
        </h3>

        <p className="text-[#4B5563] text-sm line-clamp-2">{pob.description}</p>
      </div>

      <div className="flex flex-col space-y-3 mt-4">
        <div className="text-sm text-[#4B5563]">
          <span className="font-medium">{pob.kpiCount}</span> KPI terkait
        </div>

        <Link href={`/pob/${pob.id}`}>
          <Button variant="primary">Lihat Detail</Button>
        </Link>
      </div>
    </div>
  );
};

export default POBCard;
