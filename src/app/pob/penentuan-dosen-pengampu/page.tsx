"use client";

/**
 * KPI Dashboard page for Penentuan Dosen Pengampu Mata Kuliah
 * Displays KPI metrics, visualizations, and analysis tools
 */
import React, { useState, useEffect } from "react";
import {
  KPIPenentuanDosen,
  FilterOptionsPenentuanDosen,
  KuartilStatus,
} from "@/interfaces/kpi";
import withLayout from "@/hoc/withLayout";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import SummaryCard from "@/components/atoms/SummaryCard";
import KPITablePenentuanDosen from "@/components/molecules/KPITablePenentuanDosen";
import KPIEditModalPenentuanDosen from "@/components/molecules/KPIEditModalPenentuanDosen";
import KPIFilterPenentuanDosen from "@/components/molecules/KPIFilterPenentuanDosen";
import RecommendationList from "@/components/molecules/RecommendationList";
import dynamic from "next/dynamic";

// Import data and utilities
import {
  kpiPenentuanDosenPengampu,
  pobDescription,
  bebanKerjaData,
} from "./data";
import {
  calculateKPISummary,
  filterKPIs,
  generateRecommendations,
  prepareRadarChartData,
  prepareWorkloadChartData,
  calculateWorkloadVariationCoefficient,
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
const BarChartBebanKerja = dynamic(
  () => import("@/components/molecules/BarChartBebanKerja"),
  { ssr: false }
);

function PenentuanDosenPengampuPage() {
  // State for KPI data and filters
  const [kpis, setKpis] = useState<KPIPenentuanDosen[]>([]);
  const [filteredKpis, setFilteredKpis] = useState<KPIPenentuanDosen[]>([]);
  const [filters, setFilters] = useState<FilterOptionsPenentuanDosen>({
    kategori: null,
    kuartil: null,
  });

  // State for summary calculations
  const [summary, setSummary] = useState(
    calculateKPISummary(kpiPenentuanDosenPengampu)
  );
  const [recommendations, setRecommendations] = useState(
    generateRecommendations(kpiPenentuanDosenPengampu)
  );

  // State for editing
  const [selectedKPI, setSelectedKPI] = useState<KPIPenentuanDosen | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Calculate workload variation coefficient
  const koefisienVariasi =
    calculateWorkloadVariationCoefficient(bebanKerjaData);
  const workloadChartData = prepareWorkloadChartData(bebanKerjaData);

  // Initialize KPI data
  useEffect(() => {
    setKpis(kpiPenentuanDosenPengampu);
    setFilteredKpis(kpiPenentuanDosenPengampu);
  }, []);

  // Apply filters when filters or KPIs change
  useEffect(() => {
    const filtered = filterKPIs(kpis, filters);
    setFilteredKpis(filtered);
  }, [filters, kpis]);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptionsPenentuanDosen) => {
    setFilters(newFilters);
  };

  // Handle edit modal
  const handleEditKPI = (kpi: KPIPenentuanDosen) => {
    setSelectedKPI(kpi);
    setIsEditModalOpen(true);
  };

  // Handle save changes
  const handleSaveKPI = (updatedKPI: KPIPenentuanDosen) => {
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
      label: "Penentuan Dosen Pengampu",
      href: "/pob/penentuan-dosen-pengampu",
      isCurrent: true,
    },
  ];

  // Export data to CSV
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Nama KPI",
      "Deskripsi",
      "Kategori",
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
          kpi.kategori,
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
    link.setAttribute("download", "kpi-penentuan-dosen-pengampu.csv");
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
              Dashboard KPI Penentuan Dosen Pengampu Mata Kuliah
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Pencapaian vs Target per Kategori
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

        {/* Workload Distribution Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Distribusi Beban Kerja Dosen
          </h3>
          <BarChartBebanKerja
            data={workloadChartData}
            koefisienVariasi={koefisienVariasi}
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <KPIFilterPenentuanDosen
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Table Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Detail KPI</h2>

        <div className="bg-white shadow rounded-lg">
          <KPITablePenentuanDosen kpis={filteredKpis} onEdit={handleEditKPI} />
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Rekomendasi Perbaikan
        </h2>

        <div className="bg-white shadow rounded-lg">
          <RecommendationList recommendations={recommendations} />
        </div>
      </div>

      {/* KPI Edit Modal */}
      <KPIEditModalPenentuanDosen
        kpi={selectedKPI}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveKPI}
      />
    </div>
  );
}

export default withLayout(PenentuanDosenPengampuPage);
