/**
 * Data file containing KPI information for Penjaminan Mutu Akademik
 * Includes KPI metrics, historical data, and recommendation templates
 */
import {
  KPI,
  KuartilStatus,
  DimensiKPI,
  HistoricalData,
  Recommendation,
} from "@/interfaces/kpi";

/**
 * KPI data for Penjaminan Mutu Akademik
 */
export const kpiPenjaminanMutuAkademik: KPI[] = [
  {
    id: 1,
    nama: "Waktu Pembentukan GKM",
    deskripsi:
      "Waktu yang dibutuhkan dari inisiasi hingga SK GKM final terdistribusi",
    target: "7",
    pencapaian: "6", // nilai awal, bisa diubah pengguna
    satuan: "hari",
    kuartil1: "> 14 hari",
    kuartil2: "8-14 hari",
    kuartil3: "5-7 hari",
    kuartil4: "< 5 hari",
    dimensi: DimensiKPI.WAKTU,
    metode_pengukuran:
      "Sistem tracking otomatis dari timestamp inisiasi hingga timestamp distribusi SK",
    status: KuartilStatus.BAIK,
    isHigherBetter: false,
  },
  {
    id: 2,
    nama: "Tingkat Revisi Dokumen",
    deskripsi:
      "Persentase dokumen formal (SK, instrumen, laporan) yang mengalami revisi lebih dari 1 kali",
    target: "15",
    pencapaian: "18", // nilai awal, bisa diubah pengguna
    satuan: "%",
    kuartil1: "> 30%",
    kuartil2: "16-30%",
    kuartil3: "5-15%",
    kuartil4: "< 5%",
    dimensi: DimensiKPI.KUALITAS,
    metode_pengukuran:
      "Jumlah dokumen dengan revisi > 1 / Total dokumen yang diproses",
    status: KuartilStatus.PERLU_PERBAIKAN,
    isHigherBetter: false,
  },
  {
    id: 3,
    nama: "Tingkat Kelengkapan Data",
    deskripsi: "Persentase kelengkapan data yang diperlukan untuk proses audit",
    target: "90",
    pencapaian: "85",
    satuan: "%",
    kuartil1: "< 70%",
    kuartil2: "70-79%",
    kuartil3: "80-89%",
    kuartil4: "≥ 90%",
    dimensi: DimensiKPI.KUALITAS,
    metode_pengukuran: "Jumlah data lengkap / Total data yang diminta",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
  {
    id: 4,
    nama: "Tingkat Partisipasi Dosen",
    deskripsi:
      "Persentase dosen yang berpartisipasi aktif dalam proses penjaminan mutu",
    target: "85",
    pencapaian: "78",
    satuan: "%",
    kuartil1: "< 60%",
    kuartil2: "60-74%",
    kuartil3: "75-84%",
    kuartil4: "≥ 85%",
    dimensi: DimensiKPI.PARTISIPASI,
    metode_pengukuran: "Jumlah dosen aktif / Total dosen",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
  {
    id: 5,
    nama: "Tingkat Partisipasi Mahasiswa",
    deskripsi:
      "Persentase mahasiswa yang mengisi evaluasi pembelajaran dan survei kepuasan",
    target: "75",
    pencapaian: "68",
    satuan: "%",
    kuartil1: "< 50%",
    kuartil2: "50-64%",
    kuartil3: "65-74%",
    kuartil4: "≥ 75%",
    dimensi: DimensiKPI.PARTISIPASI,
    metode_pengukuran:
      "Jumlah mahasiswa yang mengisi evaluasi / Total mahasiswa aktif",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
  {
    id: 6,
    nama: "Kepatuhan Standar Mutu",
    deskripsi:
      "Persentase kesesuaian aktivitas dengan standar mutu yang ditetapkan",
    target: "95",
    pencapaian: "91",
    satuan: "%",
    kuartil1: "< 80%",
    kuartil2: "80-89%",
    kuartil3: "90-94%",
    kuartil4: "≥ 95%",
    dimensi: DimensiKPI.EFEKTIVITAS,
    metode_pengukuran:
      "Jumlah aktivitas sesuai standar / Total aktivitas yang diperiksa",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
  {
    id: 7,
    nama: "Efisiensi Jadwal Audit",
    deskripsi:
      "Persentase kegiatan audit yang selesai sesuai jadwal yang ditetapkan",
    target: "90",
    pencapaian: "82",
    satuan: "%",
    kuartil1: "< 70%",
    kuartil2: "70-79%",
    kuartil3: "80-89%",
    kuartil4: "≥ 90%",
    dimensi: DimensiKPI.WAKTU,
    metode_pengukuran:
      "Jumlah audit tepat waktu / Total audit yang dilaksanakan",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
  {
    id: 8,
    nama: "Temuan Audit",
    deskripsi: "Jumlah temuan audit yang bersifat major per kegiatan audit",
    target: "3",
    pencapaian: "5",
    satuan: "temuan",
    kuartil1: "> 7 temuan",
    kuartil2: "5-7 temuan",
    kuartil3: "2-4 temuan",
    kuartil4: "≤ 1 temuan",
    dimensi: DimensiKPI.KUALITAS,
    metode_pengukuran: "Rata-rata jumlah temuan major per kegiatan audit",
    status: KuartilStatus.PERLU_PERBAIKAN,
    isHigherBetter: false,
  },
  {
    id: 9,
    nama: "Kecepatan Perbaikan Temuan",
    deskripsi:
      "Waktu rata-rata yang dibutuhkan untuk menindaklanjuti temuan audit",
    target: "14",
    pencapaian: "17",
    satuan: "hari",
    kuartil1: "> 30 hari",
    kuartil2: "21-30 hari",
    kuartil3: "14-20 hari",
    kuartil4: "< 14 hari",
    dimensi: DimensiKPI.WAKTU,
    metode_pengukuran:
      "Rata-rata waktu dari notifikasi temuan hingga tindak lanjut selesai",
    status: KuartilStatus.BAIK,
    isHigherBetter: false,
  },
  {
    id: 10,
    nama: "Digitalisasi Dokumen",
    deskripsi:
      "Persentase dokumen penjaminan mutu yang tersedia dalam format digital",
    target: "95",
    pencapaian: "87",
    satuan: "%",
    kuartil1: "< 75%",
    kuartil2: "75-84%",
    kuartil3: "85-94%",
    kuartil4: "≥ 95%",
    dimensi: DimensiKPI.OTOMATISASI,
    metode_pengukuran: "Jumlah dokumen digital / Total dokumen penjaminan mutu",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
  {
    id: 11,
    nama: "Indeks Kepuasan Audit",
    deskripsi:
      "Tingkat kepuasan unit yang diaudit terhadap proses audit mutu akademik",
    target: "4.0",
    pencapaian: "3.7",
    satuan: "skala 1-5",
    kuartil1: "< 3.0",
    kuartil2: "3.0-3.49",
    kuartil3: "3.5-3.99",
    kuartil4: "≥ 4.0",
    dimensi: DimensiKPI.EFEKTIVITAS,
    metode_pengukuran: "Survei kepuasan dengan skala Likert 1-5",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
  {
    id: 12,
    nama: "Efektivitas Tindak Lanjut",
    deskripsi:
      "Persentase tindak lanjut yang efektif menyelesaikan temuan (tidak berulang)",
    target: "90",
    pencapaian: "82",
    satuan: "%",
    kuartil1: "< 70%",
    kuartil2: "70-79%",
    kuartil3: "80-89%",
    kuartil4: "≥ 90%",
    dimensi: DimensiKPI.EFEKTIVITAS,
    metode_pengukuran:
      "Jumlah tindak lanjut efektif / Total tindak lanjut yang dievaluasi",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
  {
    id: 13,
    nama: "Otomatisasi Proses",
    deskripsi: "Persentase proses penjaminan mutu yang telah terotomatisasi",
    target: "75",
    pencapaian: "58",
    satuan: "%",
    kuartil1: "< 40%",
    kuartil2: "40-59%",
    kuartil3: "60-74%",
    kuartil4: "≥ 75%",
    dimensi: DimensiKPI.OTOMATISASI,
    metode_pengukuran:
      "Jumlah proses terotomatisasi / Total proses penjaminan mutu",
    status: KuartilStatus.PERLU_PERBAIKAN,
    isHigherBetter: true,
  },
  {
    id: 14,
    nama: "Akurasi Laporan",
    deskripsi:
      "Persentase laporan audit yang akurat dan tidak memerlukan revisi",
    target: "90",
    pencapaian: "85",
    satuan: "%",
    kuartil1: "< 70%",
    kuartil2: "70-79%",
    kuartil3: "80-89%",
    kuartil4: "≥ 90%",
    dimensi: DimensiKPI.KUALITAS,
    metode_pengukuran: "Jumlah laporan akurat / Total laporan audit",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
  {
    id: 15,
    nama: "Ketersediaan Auditor",
    deskripsi: "Persentase auditor yang tersedia saat dibutuhkan sesuai jadwal",
    target: "95",
    pencapaian: "88",
    satuan: "%",
    kuartil1: "< 80%",
    kuartil2: "80-84%",
    kuartil3: "85-94%",
    kuartil4: "≥ 95%",
    dimensi: DimensiKPI.PARTISIPASI,
    metode_pengukuran:
      "Jumlah auditor yang tersedia / Total auditor yang dijadwalkan",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
];

/**
 * Historical data for KPIs - represents performance over time
 */
export const historicalData: HistoricalData[] = [
  // KPI 1: Waktu Pembentukan GKM
  {
    kpi_id: 1,
    periode: "2023-01",
    pencapaian: "9",
    status: KuartilStatus.PERLU_PERBAIKAN,
  },
  {
    kpi_id: 1,
    periode: "2023-02",
    pencapaian: "8",
    status: KuartilStatus.PERLU_PERBAIKAN,
  },
  {
    kpi_id: 1,
    periode: "2023-03",
    pencapaian: "7",
    status: KuartilStatus.BAIK,
  },
  {
    kpi_id: 1,
    periode: "2023-04",
    pencapaian: "6",
    status: KuartilStatus.BAIK,
  },

  // KPI 2: Tingkat Revisi Dokumen
  {
    kpi_id: 2,
    periode: "2023-01",
    pencapaian: "25",
    status: KuartilStatus.PERLU_PERBAIKAN,
  },
  {
    kpi_id: 2,
    periode: "2023-02",
    pencapaian: "22",
    status: KuartilStatus.PERLU_PERBAIKAN,
  },
  {
    kpi_id: 2,
    periode: "2023-03",
    pencapaian: "20",
    status: KuartilStatus.PERLU_PERBAIKAN,
  },
  {
    kpi_id: 2,
    periode: "2023-04",
    pencapaian: "18",
    status: KuartilStatus.PERLU_PERBAIKAN,
  },

  // Add more historical data for other KPIs as needed
];

/**
 * Recommendation templates for KPIs in need of improvement
 */
export const recommendationTemplates: Recommendation[] = [
  {
    kpi_id: 2,
    kpi_name: "Tingkat Revisi Dokumen",
    status: KuartilStatus.PERLU_PERBAIKAN,
    recommendation:
      "Terapkan proses peer review sebelum dokumen difinalisasi dan buat checklist kualitas dokumen untuk mengurangi tingkat revisi.",
  },
  {
    kpi_id: 8,
    kpi_name: "Temuan Audit",
    status: KuartilStatus.PERLU_PERBAIKAN,
    recommendation:
      "Lakukan pelatihan pra-audit untuk unit yang akan diaudit dan bagikan contoh praktik terbaik dari unit yang sudah berhasil mengurangi temuan major.",
  },
  {
    kpi_id: 13,
    kpi_name: "Otomatisasi Proses",
    status: KuartilStatus.PERLU_PERBAIKAN,
    recommendation:
      "Prioritaskan otomatisasi untuk proses manual yang repetitif dan rawan kesalahan. Lakukan analisis biaya-manfaat untuk setiap proses yang akan diotomasikan.",
  },
];

/**
 * POB description
 */
export const pobDescription =
  "Prosedur Operasional Baku Penjaminan Mutu Akademik adalah serangkaian langkah sistematis untuk memastikan kualitas dan standar akademik yang sesuai dengan visi dan misi institusi.";
