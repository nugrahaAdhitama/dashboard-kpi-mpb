"use client";

/**
 * KPI Table component for displaying and interacting with KPI data
 */
import React, { useState } from "react";
import { KPI } from "@/interfaces/kpi";
import StatusBadge from "@/components/atoms/StatusBadge";
import { formatAchievement } from "@/app/pob/penjaminan-mutu-akademik/utils";

interface KPITableProps {
  kpis: KPI[];
  onEdit: (kpi: KPI) => void;
  className?: string;
}

const KPITable: React.FC<KPITableProps> = ({
  kpis,
  onEdit,
  className = "",
}) => {
  const [sortField, setSortField] = useState<keyof KPI>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof KPI) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedKPIs = [...kpis].sort((a, b) => {
    let valA: string | number = (a[sortField] as string | number) || "";
    let valB: string | number = (b[sortField] as string | number) || "";

    // Convert to string for comparison if not already
    if (typeof valA === "number" || typeof valB === "number") {
      valA = valA.toString();
      valB = valB.toString();
    }

    if (sortDirection === "asc") {
      return valA.localeCompare(valB as string);
    } else {
      return valB.localeCompare(valA as string);
    }
  });

  const getSortIndicator = (field: keyof KPI) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("id")}
            >
              No {getSortIndicator("id")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("nama")}
            >
              Nama KPI {getSortIndicator("nama")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("dimensi")}
            >
              Dimensi {getSortIndicator("dimensi")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("target")}
            >
              Target {getSortIndicator("target")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("pencapaian")}
            >
              Pencapaian {getSortIndicator("pencapaian")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status {getSortIndicator("status")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedKPIs.map((kpi) => {
            return (
              <tr key={kpi.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {kpi.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {kpi.nama}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-xs">
                    {kpi.deskripsi}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {kpi.dimensi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatAchievement(kpi.target, kpi.satuan)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatAchievement(kpi.pencapaian, kpi.satuan)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={kpi.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(kpi)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default KPITable;
