"use client";

/**
 * AboutTemplate component that combines all sections for the Tentang Kami page
 * @component
 */
import React from "react";
import AboutHeroSection from "@/components/molecules/AboutHeroSection";
import TeamSection from "@/components/molecules/TeamSection";
import ProjectDetailsSection from "@/components/molecules/ProjectDetailsSection";
import { TeamMember, Lecturer, ProjectInfo } from "@/interfaces/team";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

// Team members data
const teamMembers: TeamMember[] = [
  {
    name: "Samuel Halomoan Sihombing",
    nim: "2210512089",
    image: "/profile-picture/samuel-sihombing.jpeg",
  },
  {
    name: "Muhammad Rifqi Fauzan",
    nim: "2210512095",
    image: "/profile-picture/muhammad-rifqi.jpeg",
  },
  {
    name: "Nugraha Adhitama Haryono",
    nim: "2210512109",
    image: "/profile-picture/nugraha-adhitama.jpeg",
  },
  {
    name: "Ikhsan Fathirizky Ramadhanu",
    nim: "2210512159",
    image: "/profile-picture/ikhsan-fathirizky.jpeg",
  },
];

// Lecturer data
const lecturer: Lecturer = {
  name: "I Wayan Widi Pradnyana",
  title: "M.TI",
  image: "/profile-picture/i-wayan-widi.jpeg",
};

// Project information
const projectInfo: ProjectInfo = {
  title: "Dashboard KPI untuk Manajemen Proses Bisnis",
  description:
    "Aplikasi ini dibuat untuk memvisualisasikan dan menganalisis KPI dari dua POB: Penjaminan Mutu Akademik dan Penentuan Dosen Pengampu Mata Kuliah.",
  features: [
    "Visualisasi interaktif untuk berbagai KPI akademik",
    "Analisis tren dan performa dari proses bisnis akademik",
    "Pemantauan real-time untuk penjaminan mutu akademik",
    "Rekomendasi berdasarkan data untuk pengambilan keputusan",
  ],
  timeline: [
    {
      stage: "Analisis Kebutuhan",
      description:
        "Mengidentifikasi kebutuhan utama dan indikator kinerja kunci untuk penjaminan mutu dan penentuan dosen pengampu",
    },
    {
      stage: "Desain UI/UX",
      description:
        "Merancang antarmuka pengguna yang intuitif dan mudah digunakan untuk visualisasi data KPI",
    },
    {
      stage: "Pengembangan",
      description:
        "Mengimplementasikan dashboard dengan teknologi modern dan responsif",
    },
    {
      stage: "Pengujian dan Evaluasi",
      description:
        "Melakukan pengujian fungsional dan evaluasi berdasarkan kriteria keberhasilan proyek",
    },
  ],
};

const AboutTemplate: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <AboutHeroSection />

        {/* Gradient background for the page */}
        <div className="relative">
          {/* Background gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F3F4F6] to-white -z-10" />

          {/* Abstract shapes */}
          <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-[#3B82F6]/5 to-[#10B981]/5 blur-3xl -z-10" />
          <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-gradient-to-l from-[#8B5CF6]/5 to-[#3B82F6]/5 blur-3xl -z-10" />

          {/* Content sections */}
          <TeamSection teamMembers={teamMembers} lecturer={lecturer} />

          <ProjectDetailsSection project={projectInfo} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutTemplate;
