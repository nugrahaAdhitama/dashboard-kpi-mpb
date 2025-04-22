/**
 * Data file containing POB and HowTo information
 * Centralizes application data for consistent use across components
 */
import { IPOB, IHowToStep } from "@/interfaces/pob";

export const pobs: IPOB[] = [
  {
    id: "penjaminan-mutu-akademik",
    title: "Penjaminan Mutu Akademik",
    description:
      "Prosedur operasional untuk memastikan kualitas dan standar akademik yang sesuai dengan visi dan misi institusi.",
    iconName: "clipboard-check",
    kpiCount: 15,
  },
  {
    id: "penentuan-dosen-pengampu",
    title: "Penentuan Dosen Pengampu Mata Kuliah",
    description:
      "Prosedur operasional untuk menentukan dosen pengampu mata kuliah berdasarkan kompetensi dan kebutuhan akademik.",
    iconName: "user-check",
    kpiCount: 12,
  },
];

export const howToSteps: IHowToStep[] = [
  {
    id: 1,
    title: "Pilih POB",
    description:
      "Pilih Prosedur Operasional Baku yang ingin Anda lihat detailnya untuk memulai analisis KPI.",
    iconName: "search",
  },
  {
    id: 2,
    title: "Analisis KPI",
    description:
      "Tinjau semua KPI yang terkait dengan POB dan lihat status performa berdasarkan kuartil.",
    iconName: "chart-line",
  },
  {
    id: 3,
    title: "Tinjau Detail",
    description:
      "Periksa detail setiap KPI untuk melihat tren, histori, dan rekomendasi tindak lanjut.",
    iconName: "clipboard-list",
  },
];
