/**
 * Enums and interfaces for KPI data
 * Defines the structure for KPI metrics, historical data, and related entities
 */

/**
 * Represents the status of a KPI based on quartile performance
 */
export enum KuartilStatus {
  BURUK = "Buruk",
  PERLU_PERBAIKAN = "Perlu Perbaikan",
  BAIK = "Baik",
  SANGAT_BAIK = "Sangat Baik",
}

/**
 * Represents the dimension categories for KPIs
 */
export enum DimensiKPI {
  WAKTU = "Waktu",
  KUALITAS = "Kualitas",
  PARTISIPASI = "Partisipasi",
  EFEKTIVITAS = "Efektivitas",
  OTOMATISASI = "Otomatisasi",
}

/**
 * Main interface for Key Performance Indicator (KPI)
 */
export interface KPI {
  id: number;
  nama: string;
  deskripsi: string;
  target: number | string;
  pencapaian: number | string;
  satuan: string;
  kuartil1: string; // nilai batas kuartil buruk
  kuartil2: string; // nilai batas kuartil perlu perbaikan
  kuartil3: string; // nilai batas kuartil baik
  kuartil4: string; // nilai batas kuartil sangat baik
  dimensi: DimensiKPI;
  metode_pengukuran: string;
  status: KuartilStatus;
  tren?: number; // persentase perubahan dari periode sebelumnya (jika ada)
  isHigherBetter: boolean; // true jika nilai lebih tinggi = lebih baik, false jika sebaliknya
}

/**
 * Interface for historical KPI data points
 */
export interface HistoricalData {
  kpi_id: number;
  periode: string; // format: "YYYY-MM"
  pencapaian: number | string;
  status: KuartilStatus;
}

/**
 * Interface for KPI summary statistics
 */
export interface KPISummary {
  total: number;
  buruk: number;
  perlu_perbaikan: number;
  baik: number;
  sangat_baik: number;
  persentase_buruk: number;
  persentase_perlu_perbaikan: number;
  persentase_baik: number;
  persentase_sangat_baik: number;
}

/**
 * Interface for improvement recommendations
 */
export interface Recommendation {
  kpi_id: number;
  kpi_name: string;
  status: KuartilStatus;
  recommendation: string;
}

/**
 * Interface for radar chart data structure
 */
export interface RadarChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }>;
}

/**
 * Interface for filter options
 */
export interface FilterOptions {
  dimensi: DimensiKPI | null;
  kuartil: KuartilStatus | null;
}
