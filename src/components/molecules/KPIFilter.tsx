"use client";

/**
 * KPI Filter component for filtering KPIs by dimension and status
 */
import React from "react";
import { DimensiKPI, KuartilStatus, FilterOptions } from "@/interfaces/kpi";

interface KPIFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

const KPIFilter: React.FC<KPIFilterProps> = ({
  filters,
  onFilterChange,
  className = "",
}) => {
  const handleDimensiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const dimensi = value === "" ? null : (value as DimensiKPI);

    onFilterChange({
      ...filters,
      dimensi,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const kuartil = value === "" ? null : (value as KuartilStatus);

    onFilterChange({
      ...filters,
      kuartil,
    });
  };

  const handleReset = () => {
    onFilterChange({
      dimensi: null,
      kuartil: null,
    });
  };

  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 items-center ${className}`}
    >
      <div>
        <label
          htmlFor="dimensi-filter"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Dimensi
        </label>
        <select
          id="dimensi-filter"
          value={filters.dimensi || ""}
          onChange={handleDimensiChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Semua Dimensi</option>
          {Object.values(DimensiKPI).map((dimensi) => (
            <option key={dimensi} value={dimensi}>
              {dimensi}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="status-filter"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <select
          id="status-filter"
          value={filters.kuartil || ""}
          onChange={handleStatusChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Semua Status</option>
          {Object.values(KuartilStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="self-end">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default KPIFilter;
