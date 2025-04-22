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
      whileHover={{ y: -5 }}
    >
      {/* Glassmorphism card effect with special gradient for lecturer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/30 to-[#3B82F6]/20 backdrop-blur-lg z-0 border border-white/20 shadow-lg" />

      <div className="relative p-8 z-10">
        <div className="flex flex-col items-center text-center">
          {/* Lecturer avatar with profile picture */}
          <motion.div
            className="relative w-36 h-36 rounded-full overflow-hidden mb-6 bg-gradient-to-br from-[#8B5CF6]/30 to-[#3B82F6]/20 shadow-lg border-2 border-white/30"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src={lecturer.image || "/placeholder-avatar.png"}
              alt={lecturer.name}
              fill
              className="object-cover transition-transform hover:scale-110 duration-300"
            />
          </motion.div>

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
              className="text-sm text-[#4B5563] mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              {lecturer.title}
            </motion.p>
          )}

          <motion.div
            className="mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-[#3B82F6]/20 backdrop-blur-sm text-sm font-medium text-[#1F2937]"
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
