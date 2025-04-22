"use client";

/**
 * KPI Table component for displaying and interacting with KPI data for Penentuan Dosen Pengampu
 */
import React, { useState } from "react";
import { KPIPenentuanDosen } from "@/interfaces/kpi";
import StatusBadge from "@/components/atoms/StatusBadge";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";

interface KPITablePenentuanDosenProps {
  kpis: KPIPenentuanDosen[];
  onEdit: (kpi: KPIPenentuanDosen) => void;
  className?: string;
}

/**
 * Helper function to format achievement values with their units
 */
const formatAchievement = (value: number | string, satuan: string): string => {
  if (typeof value === "number") {
    return `${value}${satuan ? ` ${satuan}` : ""}`;
  }

  return `${value}${satuan ? ` ${satuan}` : ""}`;
};

const KPITablePenentuanDosen: React.FC<KPITablePenentuanDosenProps> = ({
  kpis,
  onEdit,
  className = "",
}) => {
  const [sortField, setSortField] = useState<keyof KPIPenentuanDosen>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof KPIPenentuanDosen) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedKPIs = [...kpis].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    // Handle numeric sorting for ID, target, and pencapaian
    if (
      sortField === "id" ||
      sortField === "target" ||
      sortField === "pencapaian"
    ) {
      const numA =
        typeof valA === "string" ? parseFloat(valA) : (valA as number);
      const numB =
        typeof valB === "string" ? parseFloat(valB) : (valB as number);

      if (!isNaN(numA) && !isNaN(numB)) {
        return sortDirection === "asc" ? numA - numB : numB - numA;
      }
    }

    // Convert to string for comparison if not already (for string fields)
    valA = valA?.toString() || "";
    valB = valB?.toString() || "";

    return sortDirection === "asc"
      ? valA.localeCompare(valB, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      : valB.localeCompare(valA, undefined, {
          numeric: true,
          sensitivity: "base",
        });
  });

  const getSortIndicator = (field: keyof KPIPenentuanDosen) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ? (
      <IoCaretUp className="inline-block ml-1 text-blue-500 transition-transform duration-200 ease-in-out" />
    ) : (
      <IoCaretDown className="inline-block ml-1 text-blue-500 transition-transform duration-200 ease-in-out" />
    );
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors duration-200
                ${
                  sortField === "id"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                <span>No</span>
                {getSortIndicator("id")}
              </div>
            </th>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors duration-200
                ${
                  sortField === "nama"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              onClick={() => handleSort("nama")}
            >
              <div className="flex items-center">
                <span>Nama KPI</span>
                {getSortIndicator("nama")}
              </div>
            </th>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors duration-200
                ${
                  sortField === "kategori"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              onClick={() => handleSort("kategori")}
            >
              <div className="flex items-center">
                <span>Kategori</span>
                {getSortIndicator("kategori")}
              </div>
            </th>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors duration-200
                ${
                  sortField === "target"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              onClick={() => handleSort("target")}
            >
              <div className="flex items-center">
                <span>Target</span>
                {getSortIndicator("target")}
              </div>
            </th>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors duration-200
                ${
                  sortField === "pencapaian"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              onClick={() => handleSort("pencapaian")}
            >
              <div className="flex items-center">
                <span>Pencapaian</span>
                {getSortIndicator("pencapaian")}
              </div>
            </th>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors duration-200
                ${
                  sortField === "status"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                <span>Status</span>
                {getSortIndicator("status")}
              </div>
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
              <tr
                key={kpi.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
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
                  {kpi.kategori}
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
                    className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
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

export default KPITablePenentuanDosen;
