"use client";

/**
 * AboutHeroSection component for the Tentang Kami page
 * Features glassmorphism effects, gradient backgrounds, and animations
 * @component
 */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/atoms/Breadcrumb";

interface AboutHeroSectionProps {
  /**
   * Optional CSS classes to apply to the component
   */
  className?: string;
}

const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({
  className = "",
}) => {
  // Breadcrumb items for the page
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tentang Kami", href: "/tentang-kami", isCurrent: true },
  ];

  return (
    <section
      className={`w-full min-h-[500px] relative overflow-hidden ${className}`}
    >
      {/* Background gradient and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/30 via-[#8B5CF6]/20 to-[#10B981]/20 z-0"></div>

      {/* Abstract shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#10B981]/10 blur-3xl z-0"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-l from-[#8B5CF6]/20 to-[#3B82F6]/10 blur-3xl z-0"></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
        {/* Breadcrumb navigation */}
        <Breadcrumb items={breadcrumbItems} className="mb-12" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2">
            {/* Main headline with animation */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2937] leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Inovasi Akademik untuk Transformasi Proses Bisnis
            </motion.h1>

            {/* Subheadline with animation */}
            <motion.p
              className="text-lg text-[#4B5563] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Dasbor KPI interaktif ini dikembangkan sebagai bagian dari proyek
              Ujian Tengah Semester mata kuliah Manajemen Proses Bisnis di
              Universitas Indonesia.
            </motion.p>

            {/* CTA button with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#10B981] hover:from-[#2563EB] hover:to-[#059669] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Lihat Dashboard KPI
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* New illustration with glassmorphism and animation */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative p-1 rounded-2xl bg-gradient-to-br from-[#3B82F6]/50 to-[#10B981]/50">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-lg rounded-2xl"></div>
              <div className="relative p-6 backdrop-blur-md rounded-xl overflow-hidden">
                <Image
                  src="/about-hero.svg"
                  alt="Team Collaboration Illustration"
                  width={500}
                  height={350}
                  className="object-contain relative z-10 drop-shadow-lg"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
