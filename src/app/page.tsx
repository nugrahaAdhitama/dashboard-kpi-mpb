import LandingPage from "@/components/templates/LandingPage";
import { pobs, howToSteps } from "./data";

export default function Home() {
  return (
    <LandingPage
      heroTitle="Dashboard KPI Prosedur Operasional Baku"
      heroDescription="Pantau dan analisis indikator kinerja untuk memastikan operasional yang efektif dan efisien."
      pobSectionTitle="Pilih Prosedur Operasional Baku"
      pobs={pobs}
      howToSectionTitle="Cara Menggunakan Dashboard KPI"
      howToSteps={howToSteps}
    />
  );
}
