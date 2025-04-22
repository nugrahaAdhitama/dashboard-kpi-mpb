"use client";

/**
 * Hero section component for the landing page
 * Features a title, description, illustration and CTA button
 * Implements glassmorphism, gradient effects and animations
 * @component
 */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title: string;
  description: string;
  buttonText?: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  buttonText = "Lihat Dashboard",
  className = "",
}) => {
  return (
    <section
      className={`w-full min-h-[600px] relative overflow-hidden ${className}`}
    >
      {/* Background gradient and blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 via-[#10B981]/15 to-[#8B5CF6]/20 z-0"></div>

      {/* Abstract shapes for visual interest */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-[#3B82F6]/30 to-[#10B981]/20 blur-3xl z-0"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-gradient-to-l from-[#8B5CF6]/20 to-[#3B82F6]/10 blur-3xl z-0"></div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <motion.div
            className="w-full lg:w-1/2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2937] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-lg text-[#4B5563] max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/dashboard">
                <button className="px-6 py-3 mt-4 bg-gradient-to-r from-[#3B82F6] to-[#10B981] hover:from-[#2563EB] hover:to-[#059669] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
                  {buttonText}
                  <svg
                    className="w-5 h-5 animate-pulse"
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
                </button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative p-1 rounded-2xl bg-gradient-to-br from-[#3B82F6]/50 to-[#10B981]/50">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-lg rounded-2xl"></div>
              <div className="relative p-6 backdrop-blur-md rounded-xl overflow-hidden">
                <Image
                  src="/data-analytics.svg"
                  alt="Data Analytics Illustration"
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

export default HeroSection;
