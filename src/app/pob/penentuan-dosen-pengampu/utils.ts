/**
 * Utility functions for Penentuan Dosen Pengampu KPI data processing and calculations
 */
import {
  KPIPenentuanDosen,
  KuartilStatus,
  KategoriKPI,
  KPISummary,
  Recommendation,
  RadarChartData,
  FilterOptionsPenentuanDosen,
  BebanKerjaDosen,
  BarChartData,
} from "@/interfaces/kpi";
import { recommendationTemplates } from "./data";

/**
 * Parse a string range expression into numeric bounds for comparison
 * Handles expressions like "< 5", "> 30", "8-14", etc.
 * @param rangeStr - String representation of a range
 * @returns An object with min and max values for the range
 */
export function parseRange(rangeStr: string): {
  min: number | null;
  max: number | null;
} {
  // Handle "< X" format
  if (rangeStr.includes("<")) {
    const value = parseFloat(rangeStr.replace(/[^0-9.]/g, ""));
    return { min: null, max: value };
  }

  // Handle "> X" format
  if (rangeStr.includes(">")) {
    const value = parseFloat(rangeStr.replace(/[^0-9.]/g, ""));
    return { min: value, max: null };
  }

  // Handle "≤ X" format
  if (rangeStr.includes("≤")) {
    const value = parseFloat(rangeStr.replace(/[^0-9.]/g, ""));
    return { min: null, max: value };
  }

  // Handle "≥ X" format
  if (rangeStr.includes("≥")) {
    const value = parseFloat(rangeStr.replace(/[^0-9.]/g, ""));
    return { min: value, max: null };
  }

  // Handle "X-Y" format
  if (rangeStr.includes("-")) {
    const [min, max] = rangeStr
      .split("-")
      .map((val) => parseFloat(val.replace(/[^0-9.]/g, "")));
    return { min, max };
  }

  // Single value
  const value = parseFloat(rangeStr.replace(/[^0-9.]/g, ""));
  return { min: value, max: value };
}

/**
 * Calculate the KPI status based on achievement value
 * @param kpi - The KPI object to evaluate
 * @returns The calculated KuartilStatus
 */
export function calculateKPIStatus(kpi: KPIPenentuanDosen): KuartilStatus {
  const achievement = parseFloat(kpi.pencapaian.toString());

  // Get range values for each quartile
  const q2Range = parseRange(kpi.kuartil2);
  const q3Range = parseRange(kpi.kuartil3);
  const q4Range = parseRange(kpi.kuartil4);

  // Lower is better (e.g., time-based metrics where less time is better)
  if (!kpi.isHigherBetter) {
    // For "lower is better" metrics, logic is inverted
    if (q4Range.max !== null && achievement <= q4Range.max) {
      return KuartilStatus.SANGAT_BAIK;
    } else if (
      q3Range.min !== null &&
      q3Range.max !== null &&
      achievement > q3Range.min &&
      achievement <= q3Range.max
    ) {
      return KuartilStatus.BAIK;
    } else if (
      q2Range.min !== null &&
      q2Range.max !== null &&
      achievement > q2Range.min &&
      achievement <= q2Range.max
    ) {
      return KuartilStatus.PERLU_PERBAIKAN;
    } else {
      return KuartilStatus.BURUK;
    }
  }
  // Higher is better (e.g., percentage metrics where higher percentage is better)
  else {
    if (q4Range.min !== null && achievement >= q4Range.min) {
      return KuartilStatus.SANGAT_BAIK;
    } else if (
      q3Range.min !== null &&
      q3Range.max !== null &&
      achievement >= q3Range.min &&
      achievement < q3Range.max
    ) {
      return KuartilStatus.BAIK;
    } else if (
      q2Range.min !== null &&
      q2Range.max !== null &&
      achievement >= q2Range.min &&
      achievement < q2Range.max
    ) {
      return KuartilStatus.PERLU_PERBAIKAN;
    } else {
      return KuartilStatus.BURUK;
    }
  }
}

/**
 * Calculate KPI summary statistics
 * @param kpis - Array of KPI objects
 * @returns A KPISummary object with counts and percentages
 */
export function calculateKPISummary(kpis: KPIPenentuanDosen[]): KPISummary {
  const total = kpis.length;

  // Count KPIs in each quartile
  const buruk = kpis.filter((kpi) => kpi.status === KuartilStatus.BURUK).length;
  const perlu_perbaikan = kpis.filter(
    (kpi) => kpi.status === KuartilStatus.PERLU_PERBAIKAN
  ).length;
  const baik = kpis.filter((kpi) => kpi.status === KuartilStatus.BAIK).length;
  const sangat_baik = kpis.filter(
    (kpi) => kpi.status === KuartilStatus.SANGAT_BAIK
  ).length;

  // Calculate percentages
  const persentase_buruk = Math.round((buruk / total) * 100);
  const persentase_perlu_perbaikan = Math.round(
    (perlu_perbaikan / total) * 100
  );
  const persentase_baik = Math.round((baik / total) * 100);
  const persentase_sangat_baik = Math.round((sangat_baik / total) * 100);

  return {
    total,
    buruk,
    perlu_perbaikan,
    baik,
    sangat_baik,
    persentase_buruk,
    persentase_perlu_perbaikan,
    persentase_baik,
    persentase_sangat_baik,
  };
}

/**
 * Filter KPIs based on kategori and/or status
 * @param kpis - Array of KPI objects to filter
 * @param options - FilterOptions object containing kategori and status filters
 * @returns Filtered array of KPI objects
 */
export function filterKPIs(
  kpis: KPIPenentuanDosen[],
  options: FilterOptionsPenentuanDosen
): KPIPenentuanDosen[] {
  return kpis.filter((kpi) => {
    const kategoriMatch =
      !options.kategori || kpi.kategori === options.kategori;
    const statusMatch = !options.kuartil || kpi.status === options.kuartil;
    return kategoriMatch && statusMatch;
  });
}

/**
 * Generate improvement recommendations for KPIs with poor performance
 * @param kpis - Array of KPI objects to analyze
 * @returns Array of Recommendation objects
 */
export function generateRecommendations(
  kpis: KPIPenentuanDosen[]
): Recommendation[] {
  // Filter KPIs that need improvement
  const kpisNeedingImprovement = kpis.filter(
    (kpi) =>
      kpi.status === KuartilStatus.BURUK ||
      kpi.status === KuartilStatus.PERLU_PERBAIKAN
  );

  // Map to recommendations (using templates where available)
  return kpisNeedingImprovement.map((kpi) => {
    const existingRecommendation = recommendationTemplates.find(
      (rec) => rec.kpi_id === kpi.id
    );

    if (existingRecommendation) {
      return existingRecommendation;
    }

    // Generate a generic recommendation if no template exists
    return {
      kpi_id: kpi.id,
      kpi_name: kpi.nama,
      status: kpi.status,
      recommendation:
        kpi.status === KuartilStatus.BURUK
          ? `Perlu perhatian segera pada KPI "${kpi.nama}" yang saat ini berada di tingkat ${kpi.status}. Analisis faktor-faktor yang mempengaruhi pencapaian saat ini dan terapkan langkah perbaikan yang komprehensif.`
          : `Evaluasi metode yang digunakan untuk mencapai target KPI "${kpi.nama}". Identifikasi hambatan dan implementasikan strategi untuk mencapai target.`,
    };
  });
}

/**
 * Prepare radar chart data for visualization
 * @param kpis - Array of KPI objects to visualize
 * @returns Formatted data for radar chart
 */
export function prepareRadarChartData(
  kpis: KPIPenentuanDosen[]
): RadarChartData {
  // Group KPIs by kategori and calculate average percentages for each group
  const kategoris = Object.values(KategoriKPI);

  // Calculate percentage achievements relative to targets
  const achievementPercentages = kategoris.map((kategori) => {
    const kpisInKategori = kpis.filter((kpi) => kpi.kategori === kategori);

    if (kpisInKategori.length === 0) {
      return 0;
    }

    const total = kpisInKategori.reduce((sum, kpi) => {
      const targetValue = parseFloat(kpi.target.toString());
      const achievementValue = parseFloat(kpi.pencapaian.toString());

      // If higher is better, calculate achievement as percentage of target
      // Otherwise, calculate as inverse (target/achievement) to represent improvement
      if (kpi.isHigherBetter) {
        return sum + (achievementValue / targetValue) * 100;
      } else {
        // For "lower is better" metrics, a value below target is good
        // We cap at 100% to avoid unusually high values
        const percentage = (targetValue / achievementValue) * 100;
        return sum + Math.min(percentage, 150); // Cap at 150% to avoid extreme values
      }
    }, 0);

    return Math.round(total / kpisInKategori.length);
  });

  // Calculate target (always 100% since we're normalizing achievements)
  const targetValues = Array(kategoris.length).fill(100);

  return {
    labels: kategoris,
    datasets: [
      {
        label: "Pencapaian",
        data: achievementPercentages,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Target",
        data: targetValues,
        backgroundColor: "rgba(255, 99, 132, 0.0)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };
}

/**
 * Prepare pie chart data for status distribution visualization
 * @param summary - KPI summary statistics
 * @returns Formatted data for pie chart
 */
export function preparePieChartData(summary: KPISummary): {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }>;
} {
  return {
    labels: ["Buruk", "Perlu Perbaikan", "Baik", "Sangat Baik"],
    datasets: [
      {
        data: [
          summary.buruk,
          summary.perlu_perbaikan,
          summary.baik,
          summary.sangat_baik,
        ],
        backgroundColor: [
          "#EF4444", // red-500 for Buruk
          "#F59E0B", // amber-500 for Perlu Perbaikan
          "#10B981", // emerald-500 for Baik
          "#047857", // emerald-700 for Sangat Baik
        ],
        borderWidth: 1,
      },
    ],
  };
}

/**
 * Update a KPI with a new achievement value and recalculate its status
 * @param kpi - The KPI to update
 * @param newAchievement - The new achievement value
 * @returns Updated KPI object
 */
export function updateKPI(
  kpi: KPIPenentuanDosen,
  newAchievement: string | number
): KPIPenentuanDosen {
  // Create a copy of the KPI with the new achievement
  const updatedKPI = { ...kpi, pencapaian: newAchievement };

  // Recalculate status based on new achievement
  updatedKPI.status = calculateKPIStatus(updatedKPI);

  return updatedKPI;
}

/**
 * Calculate the coefficient of variation for workload distribution
 * @param bebanKerjaData - Array of BebanKerjaDosen objects
 * @returns Coefficient of variation (standard deviation / mean)
 */
export function calculateWorkloadVariationCoefficient(
  bebanKerjaData: BebanKerjaDosen[]
): number {
  // Extract jumlah_sks values
  const sksValues = bebanKerjaData.map((item) => item.jumlah_sks);

  // Calculate mean
  const mean =
    sksValues.reduce((sum, value) => sum + value, 0) / sksValues.length;

  // Calculate squared differences from mean
  const squaredDifferences = sksValues.map((value) => (value - mean) ** 2);

  // Calculate variance
  const variance =
    squaredDifferences.reduce((sum, value) => sum + value, 0) /
    sksValues.length;

  // Calculate standard deviation
  const stdDev = Math.sqrt(variance);

  // Calculate coefficient of variation
  return stdDev / mean;
}

/**
 * Prepare data for bar chart visualization of workload distribution
 * @param bebanKerjaData - Array of BebanKerjaDosen objects
 * @returns Formatted data for bar chart
 */
export function prepareWorkloadChartData(
  bebanKerjaData: BebanKerjaDosen[]
): BarChartData {
  // Sort data by jumlah_sks for better visualization
  const sortedData = [...bebanKerjaData].sort(
    (a, b) => b.jumlah_sks - a.jumlah_sks
  );

  return {
    labels: sortedData.map((item) => item.nama_dosen),
    datasets: [
      {
        label: "Jumlah SKS",
        data: sortedData.map((item) => item.jumlah_sks),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Jumlah Mata Kuliah",
        data: sortedData.map((item) => item.jumlah_matkul),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
}

/**
 * Format achievement value with unit
 * @param value - Achievement value to format
 * @param satuan - Unit of measurement
 * @returns Formatted string with value and unit
 */
export function formatAchievement(
  value: number | string,
  satuan: string
): string {
  if (typeof value === "number") {
    return `${value}${satuan ? ` ${satuan}` : ""}`;
  }

  return `${value}${satuan ? ` ${satuan}` : ""}`;
}

/**
 * Get color for status badges
 * @param status - KPI status
 * @returns CSS color class
 */
export function getStatusColor(status: KuartilStatus): string {
  switch (status) {
    case KuartilStatus.BURUK:
      return "bg-red-500";
    case KuartilStatus.PERLU_PERBAIKAN:
      return "bg-amber-500";
    case KuartilStatus.BAIK:
      return "bg-emerald-500";
    case KuartilStatus.SANGAT_BAIK:
      return "bg-emerald-700";
    default:
      return "bg-gray-400";
  }
}
