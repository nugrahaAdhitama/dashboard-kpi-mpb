"use client";

/**
 * Status badge component to display KPI status with appropriate color
 */
import React from "react";
import { KuartilStatus } from "@/interfaces/kpi";
import { getStatusColor } from "@/app/pob/penjaminan-mutu-akademik/utils";

interface StatusBadgeProps {
  status: KuartilStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const bgColor = getStatusColor(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{ backgroundColor: `${bgColor}20`, color: bgColor }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
