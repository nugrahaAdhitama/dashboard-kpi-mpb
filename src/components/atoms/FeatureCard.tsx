"use client";

/**
 * FeatureCard component for displaying individual project features
 * Features a glassmorphism effect and subtle hover animations
 * @component
 */
import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  /**
   * Feature title
   */
  title: string;

  /**
   * Feature description
   */
  description: string;

  /**
   * Optional icon component
   */
  icon?: React.ReactNode;

  /**
   * Animation delay for staggered effects
   */
  delay?: number;

  /**
   * Optional CSS classes to apply to the component
   */
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-lg z-0 border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300" />

      <div className="relative p-6 z-10">
        {icon && <div className="mb-4 text-[#3B82F6]">{icon}</div>}

        <h3 className="text-lg font-bold text-[#1F2937] mb-2">{title}</h3>
        <p className="text-sm text-[#4B5563]">{description}</p>
      </div>

      {/* Animated gradient border on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#3B82F6] to-[#10B981] w-0 group-hover:w-full transition-all duration-500"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
      />
    </motion.div>
  );
};

export default FeatureCard;
