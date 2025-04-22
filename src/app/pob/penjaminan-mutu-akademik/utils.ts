/**
 * Utility functions for KPI data processing and calculations
 */
import {
  KPI,
  KuartilStatus,
  DimensiKPI,
  KPISummary,
  Recommendation,
  RadarChartData,
  FilterOptions,
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
export function calculateKPIStatus(kpi: KPI): KuartilStatus {
  const achievement = parseFloat(kpi.pencapaian.toString());

  // Get range values for each quartile
  const q2Range = parseRange(kpi.kuartil2);
  const q3Range = parseRange(kpi.kuartil3);
  const q4Range = parseRange(kpi.kuartil4);

  // Lower is better (e.g., time-based metrics where less time is better)
  if (!kpi.isHigherBetter) {
    // For "lower is better" metrics, logic is inverted
    if (q4Range.max !== null && achievement < q4Range.max) {
      return KuartilStatus.SANGAT_BAIK;
    } else if (
      q3Range.min !== null &&
      q3Range.max !== null &&
      achievement >= q3Range.min &&
      achievement <= q3Range.max
    ) {
      return KuartilStatus.BAIK;
    } else if (
      q2Range.min !== null &&
      q2Range.max !== null &&
      achievement >= q2Range.min &&
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
      achievement <= q3Range.max
    ) {
      return KuartilStatus.BAIK;
    } else if (
      q2Range.min !== null &&
      q2Range.max !== null &&
      achievement >= q2Range.min &&
      achievement <= q2Range.max
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
export function calculateKPISummary(kpis: KPI[]): KPISummary {
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
 * Filter KPIs based on dimension and/or status
 * @param kpis - Array of KPI objects to filter
 * @param options - FilterOptions object containing dimension and status filters
 * @returns Filtered array of KPI objects
 */
export function filterKPIs(kpis: KPI[], options: FilterOptions): KPI[] {
  return kpis.filter((kpi) => {
    const dimensionMatch = !options.dimensi || kpi.dimensi === options.dimensi;
    const statusMatch = !options.kuartil || kpi.status === options.kuartil;
    return dimensionMatch && statusMatch;
  });
}

/**
 * Generate improvement recommendations for KPIs with poor performance
 * @param kpis - Array of KPI objects to analyze
 * @returns Array of Recommendation objects
 */
export function generateRecommendations(kpis: KPI[]): Recommendation[] {
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
      recommendation: `Analisis akar masalah untuk ${kpi.nama} dan implementasikan rencana perbaikan. Konsultasikan dengan tim terkait untuk mendapatkan masukan spesifik.`,
    };
  });
}

/**
 * Prepare data for radar chart visualization
 * @param kpis - Array of KPI objects
 * @returns RadarChartData object for visualization
 */
export function prepareRadarChartData(kpis: KPI[]): RadarChartData {
  // Group KPIs by dimension for the radar chart
  const dimensionGroups: { [key: string]: KPI[] } = {};

  // Initialize with all dimensions
  Object.values(DimensiKPI).forEach((dim) => {
    dimensionGroups[dim] = [];
  });

  // Group KPIs by dimension
  kpis.forEach((kpi) => {
    dimensionGroups[kpi.dimensi].push(kpi);
  });

  // Calculate average achievement percentage for each dimension
  const labels = Object.keys(dimensionGroups);
  const targetData: number[] = [];
  const achievementData: number[] = [];

  labels.forEach((dimension) => {
    const dimensionKPIs = dimensionGroups[dimension];

    if (dimensionKPIs.length === 0) {
      targetData.push(0);
      achievementData.push(0);
      return;
    }

    // Normalize achievements to percentage for radar chart
    const dimensionTarget = 100; // All targets normalized to 100%

    // Calculate normalized achievement percentage
    let achievementPercentage = 0;
    dimensionKPIs.forEach((kpi) => {
      const target = parseFloat(kpi.target.toString());
      const achievement = parseFloat(kpi.pencapaian.toString());

      // For metrics where lower is better, invert the percentage
      if (!kpi.isHigherBetter) {
        achievementPercentage +=
          ((target / achievement) * 100) / dimensionKPIs.length;
      } else {
        achievementPercentage +=
          ((achievement / target) * 100) / dimensionKPIs.length;
      }
    });

    targetData.push(dimensionTarget);
    achievementData.push(Math.min(Math.round(achievementPercentage), 100)); // Cap at 100%
  });

  return {
    labels,
    datasets: [
      {
        label: "Target",
        data: targetData,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Pencapaian",
        data: achievementData,
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };
}

/**
 * Interface for pie chart data structure
 */
interface PieChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }>;
}

/**
 * Prepare data for pie chart visualization of KPI distribution by status
 * @param summary - KPISummary object
 * @returns Data object for pie chart
 */
export function preparePieChartData(summary: KPISummary): PieChartData {
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
 * Update a KPI with new achievement value and recalculate status
 * @param kpi - KPI object to update
 * @param newAchievement - New achievement value
 * @returns Updated KPI object
 */
export function updateKPI(kpi: KPI, newAchievement: string | number): KPI {
  const updatedKPI = {
    ...kpi,
    pencapaian: newAchievement,
  };

  // Recalculate status based on new achievement
  updatedKPI.status = calculateKPIStatus(updatedKPI);

  return updatedKPI;
}

/**
 * Get status color based on KuartilStatus
 * @param status - KuartilStatus enum value
 * @returns CSS color code
 */
export function getStatusColor(status: KuartilStatus): string {
  switch (status) {
    case KuartilStatus.BURUK:
      return "#EF4444"; // red-500
    case KuartilStatus.PERLU_PERBAIKAN:
      return "#F59E0B"; // amber-500
    case KuartilStatus.BAIK:
      return "#10B981"; // emerald-500
    case KuartilStatus.SANGAT_BAIK:
      return "#047857"; // emerald-700
    default:
      return "#9CA3AF"; // gray-400
  }
}

/**
 * Format achievement value with appropriate units
 * @param value - Achievement value
 * @param satuan - Unit of measurement
 * @returns Formatted string
 */
export function formatAchievement(
  value: number | string,
  satuan: string
): string {
  // Handle percentage values
  if (satuan === "%") {
    return `${value}%`;
  }

  // Handle day-based values
  if (satuan === "hari") {
    return `${value} hari`;
  }

  // Handle other units
  return `${value} ${satuan}`;
}
