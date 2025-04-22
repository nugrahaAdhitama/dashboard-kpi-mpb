import LandingPage from "@/components/templates/LandingPage";
import { pobs, howToSteps } from "./data";

export default function Home() {
  return (
    <LandingPage
      heroTitle="Transformasi Pengukuran Kinerja Menjadi Keputusan yang Lebih Baik"
      heroDescription="Dasbor KPI interaktif yang memudahkan Anda menganalisis, memvisualisasikan, dan mengoptimalkan proses bisnis akademik. Pantau pencapaian, identifikasi area perbaikan, dan ambil keputusan berbasis data dengan cepat dan tepat."
      heroButtonText="Lihat Dashboard KPI Sekarang"
      pobSectionTitle="Pilih Prosedur Operasional Baku"
      pobs={pobs}
      howToSectionTitle="Cara Menggunakan Dashboard KPI"
      howToSteps={howToSteps}
    />
  );
}
