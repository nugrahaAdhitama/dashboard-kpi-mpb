/**
 * Data for KPI Penentuan Dosen Pengampu Mata Kuliah
 */
import {
  KategoriKPI,
  KPIPenentuanDosen,
  KuartilStatus,
  BebanKerjaDosen,
  Recommendation,
} from "@/interfaces/kpi";

/**
 * Description of POB for Penentuan Dosen Pengampu Mata Kuliah
 */
export const pobDescription =
  "Prosedur Operasional Baku (POB) Penentuan Dosen Pengampu Mata Kuliah adalah proses penugasan dosen untuk mengajar mata kuliah tertentu berdasarkan kompetensi, beban kerja, dan kebutuhan program studi. POB ini memastikan penugasan dosen yang optimal untuk meningkatkan kualitas pembelajaran.";

/**
 * KPI data for Penentuan Dosen Pengampu Mata Kuliah
 */
export const kpiPenentuanDosenPengampu: KPIPenentuanDosen[] = [
  {
    id: 1,
    nama: "Waktu Penyelesaian Total",
    deskripsi:
      "Total waktu yang dibutuhkan dari inisiasi hingga distribusi surat tugas",
    target: "30",
    pencapaian: "28",
    satuan: "hari",
    kuartil1: "> 45 hari",
    kuartil2: "31-45 hari",
    kuartil3: "21-30 hari",
    kuartil4: "≤ 20 hari",
    kategori: KategoriKPI.WAKTU,
    metode_pengukuran:
      "Sistem tracking otomatis dari timestamp start hingga end event",
    status: KuartilStatus.BAIK,
    isHigherBetter: false,
  },
  {
    id: 2,
    nama: "Tingkat Revisi",
    deskripsi:
      "Persentase draft penugasan yang memerlukan revisi setelah umpan balik dosen atau ketua jurusan",
    target: "20",
    pencapaian: "25",
    satuan: "%",
    kuartil1: "> 40%",
    kuartil2: "21-40%",
    kuartil3: "11-20%",
    kuartil4: "≤ 10%",
    kategori: KategoriKPI.KUALITAS,
    metode_pengukuran: "Jumlah draft yang direvisi / Total draft yang dibuat",
    status: KuartilStatus.PERLU_PERBAIKAN,
    isHigherBetter: false,
  },
  {
    id: 3,
    nama: "Akurasi Pencocokan Dosen-Mata Kuliah",
    deskripsi:
      "Persentase kesesuaian antara kompetensi dosen dengan mata kuliah yang diampu",
    target: "85",
    pencapaian: "82",
    satuan: "%",
    kuartil1: "< 70%",
    kuartil2: "70-84%",
    kuartil3: "85-94%",
    kuartil4: "≥ 95%",
    kategori: KategoriKPI.KUALITAS,
    metode_pengukuran:
      "Evaluasi berdasarkan matriks kompetensi yang tersimpan dalam Faculty Expertise System",
    status: KuartilStatus.PERLU_PERBAIKAN,
    isHigherBetter: true,
  },
  {
    id: 4,
    nama: "Waktu Respons Persetujuan",
    deskripsi:
      "Rata-rata waktu yang dibutuhkan untuk mendapatkan persetujuan dari Ketua Jurusan",
    target: "3",
    pencapaian: "4.5",
    satuan: "hari",
    kuartil1: "> 7 hari",
    kuartil2: "5-7 hari",
    kuartil3: "2-4 hari",
    kuartil4: "≤ 1 hari",
    kategori: KategoriKPI.WAKTU,
    metode_pengukuran:
      "Selisih timestamp antara pengiriman draft dan penerimaan persetujuan",
    status: KuartilStatus.BAIK,
    isHigherBetter: false,
  },
  {
    id: 5,
    nama: "Ketepatan Waktu Distribusi",
    deskripsi:
      "Persentase surat tugas yang didistribusikan sesuai jadwal akademik",
    target: "90",
    pencapaian: "88",
    satuan: "%",
    kuartil1: "< 75%",
    kuartil2: "75-84%",
    kuartil3: "85-94%",
    kuartil4: "≥ 95%",
    kategori: KategoriKPI.WAKTU,
    metode_pengukuran: "Jumlah surat tugas tepat waktu / Total surat tugas",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
  {
    id: 6,
    nama: "Distribusi Beban Kerja",
    deskripsi:
      "Koefisien variasi beban mengajar antar dosen (standar deviasi dibagi rata-rata)",
    target: "0.25",
    pencapaian: "0.35",
    satuan: "",
    kuartil1: "> 0.40",
    kuartil2: "0.31-0.40",
    kuartil3: "0.21-0.30",
    kuartil4: "≤ 0.20",
    kategori: KategoriKPI.EFISIENSI,
    metode_pengukuran:
      "Perhitungan standar deviasi dibagi rata-rata dari beban SKS mengajar",
    status: KuartilStatus.PERLU_PERBAIKAN,
    isHigherBetter: false,
  },
  {
    id: 7,
    nama: "Kepuasan Dosen",
    deskripsi: "Tingkat kepuasan dosen terhadap proses penugasan (skala 1-5)",
    target: "4.2",
    pencapaian: "3.8",
    satuan: "",
    kuartil1: "< 3.0",
    kuartil2: "3.0-3.9",
    kuartil3: "4.0-4.5",
    kuartil4: "> 4.5",
    kategori: KategoriKPI.KEPUASAN,
    metode_pengukuran: "Survei kepuasan dosen setelah menerima surat tugas",
    status: KuartilStatus.PERLU_PERBAIKAN,
    isHigherBetter: true,
  },
  {
    id: 8,
    nama: "Optimalisasi Beban SKS",
    deskripsi:
      "Persentase dosen dengan beban mengajar yang memenuhi standar minimum dan tidak melebihi maksimum",
    target: "85",
    pencapaian: "78",
    satuan: "%",
    kuartil1: "< 70%",
    kuartil2: "70-79%",
    kuartil3: "80-89%",
    kuartil4: "≥ 90%",
    kategori: KategoriKPI.EFISIENSI,
    metode_pengukuran: "Jumlah dosen dengan beban optimal / Total dosen",
    status: KuartilStatus.PERLU_PERBAIKAN,
    isHigherBetter: true,
  },
  {
    id: 9,
    nama: "Waktu Penyelesaian Administrasi",
    deskripsi:
      "Rata-rata waktu untuk menyelesaikan dokumentasi administratif setelah persetujuan",
    target: "2",
    pencapaian: "1.5",
    satuan: "hari",
    kuartil1: "> 4 hari",
    kuartil2: "3-4 hari",
    kuartil3: "1-2 hari",
    kuartil4: "< 1 hari",
    kategori: KategoriKPI.WAKTU,
    metode_pengukuran:
      "Selisih waktu antara persetujuan dan finalisasi dokumen",
    status: KuartilStatus.BAIK,
    isHigherBetter: false,
  },
  {
    id: 10,
    nama: "Kepuasan Mahasiswa",
    deskripsi:
      "Tingkat kepuasan mahasiswa terhadap kesesuaian dosen pengampu (skala 1-5)",
    target: "4.0",
    pencapaian: "4.2",
    satuan: "",
    kuartil1: "< 3.0",
    kuartil2: "3.0-3.4",
    kuartil3: "3.5-4.0",
    kuartil4: "> 4.0",
    kategori: KategoriKPI.KEPUASAN,
    metode_pengukuran: "Survei kepuasan mahasiswa pada akhir semester",
    status: KuartilStatus.SANGAT_BAIK,
    isHigherBetter: true,
  },
  {
    id: 11,
    nama: "Efisiensi Alokasi Kelas",
    deskripsi:
      "Persentase penggunaan optimal ruang kelas berdasarkan kapasitas dan jumlah mahasiswa",
    target: "80",
    pencapaian: "75",
    satuan: "%",
    kuartil1: "< 65%",
    kuartil2: "65-74%",
    kuartil3: "75-84%",
    kuartil4: "≥ 85%",
    kategori: KategoriKPI.EFISIENSI,
    metode_pengukuran: "Evaluasi penggunaan kapasitas ruang kelas",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
  {
    id: 12,
    nama: "Akurasi Penjadwalan",
    deskripsi:
      "Persentase jadwal yang tidak memerlukan perubahan setelah difinalisasi",
    target: "90",
    pencapaian: "86",
    satuan: "%",
    kuartil1: "< 75%",
    kuartil2: "75-84%",
    kuartil3: "85-94%",
    kuartil4: "≥ 95%",
    kategori: KategoriKPI.KUALITAS,
    metode_pengukuran: "Jumlah jadwal tanpa perubahan / Total jadwal",
    status: KuartilStatus.BAIK,
    isHigherBetter: true,
  },
];

/**
 * Recommendation templates for KPIs that need improvement
 */
export const recommendationTemplates: Recommendation[] = [
  {
    kpi_id: 2,
    kpi_name: "Tingkat Revisi",
    status: KuartilStatus.PERLU_PERBAIKAN,
    recommendation:
      "Implementasikan sistem verifikasi multi-tahap sebelum finalisasi draft untuk mengurangi kebutuhan revisi. Siapkan template standar untuk berbagai kasus penugasan. Adakan pelatihan untuk staf penyusun draft.",
  },
  {
    kpi_id: 3,
    kpi_name: "Akurasi Pencocokan Dosen-Mata Kuliah",
    status: KuartilStatus.PERLU_PERBAIKAN,
    recommendation:
      "Perbarui matriks kompetensi dosen secara berkala. Libatkan koordinator mata kuliah dalam proses pencocokan. Terapkan sistem rekomendasi berbasis data riwayat mengajar dan keahlian dosen.",
  },
  {
    kpi_id: 6,
    kpi_name: "Distribusi Beban Kerja",
    status: KuartilStatus.PERLU_PERBAIKAN,
    recommendation:
      "Terapkan algoritma optimasi untuk mendistribusikan beban kerja secara lebih merata. Pertimbangkan beban kerja non-pengajaran dalam perhitungan. Buat visualisasi beban kerja untuk memudahkan analisis ketidakseimbangan.",
  },
  {
    kpi_id: 7,
    kpi_name: "Kepuasan Dosen",
    status: KuartilStatus.PERLU_PERBAIKAN,
    recommendation:
      "Lakukan survei lebih mendalam untuk mengidentifikasi penyebab ketidakpuasan. Tingkatkan transparansi proses penugasan. Berikan kesempatan dosen untuk menyampaikan preferensi sebelum penugasan final.",
  },
  {
    kpi_id: 8,
    kpi_name: "Optimalisasi Beban SKS",
    status: KuartilStatus.PERLU_PERBAIKAN,
    recommendation:
      "Kembangkan dashboard monitoring beban SKS secara real-time. Tetapkan batasan minimum dan maksimum yang jelas. Pertimbangkan beban administratif dan penelitian dalam perhitungan beban total.",
  },
];

/**
 * Data beban kerja dosen untuk visualisasi khusus
 */
export const bebanKerjaData: BebanKerjaDosen[] = [
  {
    nama_dosen: "Dr. Ahmad Hakim",
    jumlah_sks: 14,
    jumlah_matkul: 3,
    standar_deviasi: 1.2,
  },
  {
    nama_dosen: "Prof. Budi Santoso",
    jumlah_sks: 8,
    jumlah_matkul: 2,
    standar_deviasi: -2.5,
  },
  {
    nama_dosen: "Dr. Citra Dewi",
    jumlah_sks: 12,
    jumlah_matkul: 4,
    standar_deviasi: 0.5,
  },
  {
    nama_dosen: "Dina Pratiwi, M.Sc.",
    jumlah_sks: 18,
    jumlah_matkul: 5,
    standar_deviasi: 3.1,
  },
  {
    nama_dosen: "Dr. Eko Prasetyo",
    jumlah_sks: 10,
    jumlah_matkul: 3,
    standar_deviasi: -1.3,
  },
  {
    nama_dosen: "Fajar Ramadhan, M.T.",
    jumlah_sks: 16,
    jumlah_matkul: 4,
    standar_deviasi: 2.0,
  },
  {
    nama_dosen: "Dr. Gita Nurfadilah",
    jumlah_sks: 6,
    jumlah_matkul: 2,
    standar_deviasi: -3.2,
  },
  {
    nama_dosen: "Hadi Wijaya, Ph.D.",
    jumlah_sks: 12,
    jumlah_matkul: 3,
    standar_deviasi: 0.5,
  },
  {
    nama_dosen: "Prof. Indah Permata",
    jumlah_sks: 10,
    jumlah_matkul: 2,
    standar_deviasi: -1.3,
  },
  {
    nama_dosen: "Dr. Joko Susilo",
    jumlah_sks: 15,
    jumlah_matkul: 4,
    standar_deviasi: 1.7,
  },
];
