"use client";

/**
 * POB Card component for displaying a Prosedur Operasional Baku
 * Features an icon, title, description, KPI count, and a CTA button
 * Implements glassmorphism effect and visual hierarchy
 * @component
 */
import React from "react";
import { IPOB } from "@/interfaces/pob";
import Button from "@/components/atoms/Button";
import { FaClipboardCheck, FaUserCheck } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

interface POBCardProps {
  pob: IPOB;
  className?: string;
}

const iconMap = {
  "clipboard-check": FaClipboardCheck,
  "user-check": FaUserCheck,
};

const POBCard: React.FC<POBCardProps> = ({ pob, className = "" }) => {
  const IconComponent = iconMap[pob.iconName as keyof typeof iconMap];

  return (
    <motion.div
      className={`
        relative w-full max-w-[380px] h-[280px] p-1 rounded-xl 
        bg-gradient-to-br from-[#3B82F6]/50 via-[#8B5CF6]/30 to-[#10B981]/40
        shadow-lg hover:shadow-xl transition-all duration-300 
        ${className}
      `}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 },
      }}
    >
      {/* Glassmorphism effect */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl"></div>

      <div className="relative h-full p-6 bg-white/80 backdrop-blur-sm rounded-lg flex flex-col justify-between">
        <div className="space-y-4">
          <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/10">
            <div className="text-[#3B82F6] text-2xl">
              <IconComponent />
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#1F2937] line-clamp-1">
            {pob.title}
          </h3>

          <p className="text-[#4B5563] text-sm leading-relaxed line-clamp-3">
            {pob.description}
          </p>
        </div>

        <div className="flex flex-col space-y-3 mt-4">
          <div className="text-sm text-[#4B5563] font-medium flex items-center gap-1">
            <span className="bg-[#3B82F6] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {pob.kpiCount}
            </span>
            <span>KPI terkait</span>
          </div>

          <Link href={getPOBLink(pob.id)} className="w-full">
            <Button
              variant="primary"
              className="w-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] hover:from-[#2563EB] hover:to-[#059669]"
            >
              Lihat Detail
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to get the correct POB link
function getPOBLink(pobId: string): string {
  // Map POB IDs to their specific page routes
  const pobRoutes: Record<string, string> = {
    "penjaminan-mutu-akademik": "/pob/penjaminan-mutu-akademik",
    "penentuan-dosen-pengampu": "/pob/penentuan-dosen-pengampu",
    // Add other POB routes as needed
  };

  // Return the mapped route or a fallback
  return pobRoutes[pobId] || "/pob";
}

export default POBCard;
