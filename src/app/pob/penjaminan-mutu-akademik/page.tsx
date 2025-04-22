"use client";

/**
 * KPI Dashboard page for Penjaminan Mutu Akademik
 * Displays KPI metrics, visualizations, and analysis tools
 */
import React, { useState, useEffect } from "react";
import { KPI, FilterOptions, KuartilStatus } from "@/interfaces/kpi";
import withLayout from "@/hoc/withLayout";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import SummaryCard from "@/components/atoms/SummaryCard";
import KPITable from "@/components/molecules/KPITable";
import KPIEditModal from "@/components/molecules/KPIEditModal";
import KPIFilter from "@/components/molecules/KPIFilter";
import RecommendationList from "@/components/molecules/RecommendationList";
import dynamic from "next/dynamic";

// Import data and utilities
import { kpiPenjaminanMutuAkademik, pobDescription } from "./data";
import {
  calculateKPISummary,
  filterKPIs,
  generateRecommendations,
  prepareRadarChartData,
} from "./utils";

// Dynamically import Chart.js components to avoid SSR issues
const RadarChartKPI = dynamic(
  () => import("@/components/molecules/RadarChartKPI"),
  { ssr: false }
);
const PieChartKPI = dynamic(
  () => import("@/components/molecules/PieChartKPI"),
  { ssr: false }
);

function PenjaminanMutuAkademikPage() {
  // State for KPI data and filters
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [filteredKpis, setFilteredKpis] = useState<KPI[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    dimensi: null,
    kuartil: null,
  });

  // State for summary calculations
  const [summary, setSummary] = useState(
    calculateKPISummary(kpiPenjaminanMutuAkademik)
  );
  const [recommendations, setRecommendations] = useState(
    generateRecommendations(kpiPenjaminanMutuAkademik)
  );

  // State for editing
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Initialize KPI data
  useEffect(() => {
    setKpis(kpiPenjaminanMutuAkademik);
    setFilteredKpis(kpiPenjaminanMutuAkademik);
  }, []);

  // Apply filters when filters or KPIs change
  useEffect(() => {
    const filtered = filterKPIs(kpis, filters);
    setFilteredKpis(filtered);
  }, [filters, kpis]);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Handle edit modal
  const handleEditKPI = (kpi: KPI) => {
    setSelectedKPI(kpi);
    setIsEditModalOpen(true);
  };

  // Handle save changes
  const handleSaveKPI = (updatedKPI: KPI) => {
    const updatedKPIs = kpis.map((kpi) =>
      kpi.id === updatedKPI.id ? updatedKPI : kpi
    );

    setKpis(updatedKPIs);

    // Recalculate summary and recommendations
    const newSummary = calculateKPISummary(updatedKPIs);
    setSummary(newSummary);

    const newRecommendations = generateRecommendations(updatedKPIs);
    setRecommendations(newRecommendations);
  };

  // Prepare chart data
  const radarData = prepareRadarChartData(filteredKpis);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard KPI", href: "/" },
    {
      label: "Penjaminan Mutu Akademik",
      href: "/pob/penjaminan-mutu-akademik",
      isCurrent: true,
    },
  ];

  // Export data to CSV
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Nama KPI",
      "Deskripsi",
      "Dimensi",
      "Target",
      "Pencapaian",
      "Satuan",
      "Status",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredKpis.map((kpi) =>
        [
          kpi.id,
          `"${kpi.nama.replace(/"/g, '""')}"`,
          `"${kpi.deskripsi.replace(/"/g, '""')}"`,
          kpi.dimensi,
          kpi.target,
          kpi.pencapaian,
          kpi.satuan,
          kpi.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "kpi-penjaminan-mutu-akademik.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <Breadcrumb items={breadcrumbItems} className="mb-4" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Dashboard KPI Penjaminan Mutu Akademik
            </h1>
            <p className="text-gray-600 max-w-3xl">{pobDescription}</p>
          </div>

          <button
            onClick={exportToCSV}
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Ringkasan Status
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <SummaryCard
            title="Total KPI"
            count={summary.total}
            percentage={100}
          />
          <SummaryCard
            title="Buruk"
            count={summary.buruk}
            percentage={summary.persentase_buruk}
            status={KuartilStatus.BURUK}
          />
          <SummaryCard
            title="Perlu Perbaikan"
            count={summary.perlu_perbaikan}
            percentage={summary.persentase_perlu_perbaikan}
            status={KuartilStatus.PERLU_PERBAIKAN}
          />
          <SummaryCard
            title="Baik"
            count={summary.baik}
            percentage={summary.persentase_baik}
            status={KuartilStatus.BAIK}
          />
          <SummaryCard
            title="Sangat Baik"
            count={summary.sangat_baik}
            percentage={summary.persentase_sangat_baik}
            status={KuartilStatus.SANGAT_BAIK}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Visualisasi Data
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Pencapaian vs Target per Dimensi
            </h3>
            <RadarChartKPI data={radarData} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Distribusi Status KPI
            </h3>
            <PieChartKPI summary={summary} />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <KPIFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Table Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Detail KPI</h2>

        <div className="bg-white shadow rounded-lg">
          <KPITable kpis={filteredKpis} onEdit={handleEditKPI} />
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mb-8">
        <RecommendationList recommendations={recommendations} />
      </div>

      {/* Edit Modal */}
      <KPIEditModal
        kpi={selectedKPI}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveKPI}
      />
    </div>
  );
}

export default withLayout(PenjaminanMutuAkademikPage);
