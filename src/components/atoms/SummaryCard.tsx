"use client";

/**
 * SummaryCard component for displaying KPI summary statistics
 */
import React from "react";
import { KuartilStatus } from "@/interfaces/kpi";
import { getStatusColor } from "@/app/pob/penjaminan-mutu-akademik/utils";

interface SummaryCardProps {
  title: string;
  count: number;
  percentage: number;
  status?: KuartilStatus;
  className?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  count,
  percentage,
  status,
  className = "",
}) => {
  const borderColor = status ? getStatusColor(status) : "#3B82F6";

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${className}`}
      style={{ borderLeftColor: borderColor }}
    >
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-semibold">{count}</h3>
        <span className="text-sm font-medium" style={{ color: borderColor }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
