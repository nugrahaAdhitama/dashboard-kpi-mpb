"use client";

/**
 * KPI Filter component for filtering KPIs by kategori and status
 * Specific for Penentuan Dosen Pengampu Mata Kuliah
 */
import React from "react";
import {
  KategoriKPI,
  KuartilStatus,
  FilterOptionsPenentuanDosen,
} from "@/interfaces/kpi";
import { IoChevronDownOutline } from "react-icons/io5";

interface KPIFilterPenentuanDosenProps {
  filters: FilterOptionsPenentuanDosen;
  onFilterChange: (filters: FilterOptionsPenentuanDosen) => void;
  className?: string;
}

const KPIFilterPenentuanDosen: React.FC<KPIFilterPenentuanDosenProps> = ({
  filters,
  onFilterChange,
  className = "",
}) => {
  const handleKategoriChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const kategori = value === "" ? null : (value as KategoriKPI);

    onFilterChange({
      ...filters,
      kategori,
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
      kategori: null,
      kuartil: null,
    });
  };

  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 items-center ${className}`}
    >
      <div className="relative">
        <label
          htmlFor="kategori-filter"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Kategori
        </label>
        <div className="relative">
          <select
            id="kategori-filter"
            value={filters.kategori || ""}
            onChange={handleKategoriChange}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md
            appearance-none bg-white
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
            hover:border-blue-400 transition-colors duration-200
            shadow-sm text-gray-800"
          >
            <option value="">Semua Kategori</option>
            {Object.values(KategoriKPI).map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <IoChevronDownOutline className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="relative">
        <label
          htmlFor="status-filter"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <div className="relative">
          <select
            id="status-filter"
            value={filters.kuartil || ""}
            onChange={handleStatusChange}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md
            appearance-none bg-white
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
            hover:border-blue-400 transition-colors duration-200
            shadow-sm text-gray-800"
          >
            <option value="">Semua Status</option>
            {Object.values(KuartilStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <IoChevronDownOutline className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="self-end">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md 
          text-sm font-medium text-gray-700 bg-white 
          hover:bg-gray-50 hover:border-gray-400 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          transition-colors duration-200 shadow-sm"
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default KPIFilterPenentuanDosen;
