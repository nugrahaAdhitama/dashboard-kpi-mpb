"use client";

/**
 * LecturerCard component for displaying lecturer information
 * Features a glassmorphism effect and subtle animations
 * @component
 */
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lecturer } from "@/interfaces/team";

interface LecturerCardProps {
  /**
   * Lecturer data to display
   */
  lecturer: Lecturer;

  /**
   * Optional CSS classes to apply to the component
   */
  className?: string;
}

const LecturerCard: React.FC<LecturerCardProps> = ({
  lecturer,
  className = "",
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Glassmorphism card effect with special gradient for lecturer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/30 to-[#3B82F6]/20 backdrop-blur-lg z-0 border border-white/20 shadow-lg" />

      <div className="relative p-6 z-10">
        <div className="flex flex-col items-center text-center">
          {/* Avatar with placeholder if no image provided */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-gradient-to-br from-[#8B5CF6]/30 to-[#3B82F6]/20">
            {lecturer.image ? (
              <Image
                src={lecturer.image}
                alt={lecturer.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#8B5CF6]">
                {lecturer.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Lecturer details with subtle animations */}
          <motion.h3
            className="text-xl font-bold text-[#1F2937] mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            {lecturer.name}
          </motion.h3>

          {lecturer.title && (
            <motion.p
              className="text-sm text-[#4B5563]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              {lecturer.title}
            </motion.p>
          )}

          <motion.div
            className="mt-3 bg-[#F3F4F6] px-4 py-2 rounded-full text-xs font-medium text-[#4B5563]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Dosen Pengampu
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LecturerCard;
