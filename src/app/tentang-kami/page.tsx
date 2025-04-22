/**
 * @file Tentang Kami page component
 * @description Page that displays information about the team and project
 */
import "@/styles/patterns.css";
import { Metadata } from "next";
import AboutTemplate from "@/components/templates/AboutTemplate";

export const metadata: Metadata = {
  title: "Tentang Kami | Dashboard KPI Prosedur Operasional Baku",
  description:
    "Informasi tentang tim pengembang dan tujuan pembuatan aplikasi Dashboard KPI",
};

export default function TentangKami() {
  return <AboutTemplate />;
}
