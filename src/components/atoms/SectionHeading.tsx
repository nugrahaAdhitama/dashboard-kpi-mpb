"use client";

/**
 * SectionHeading component for consistent section titles across the application
 * Features subtle animations and gradient underline
 * @component
 */
import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  /**
   * Title text to display
   */
  title: string;

  /**
   * Optional subtitle text
   */
  subtitle?: string;

  /**
   * Center alignment flag
   */
  center?: boolean;

  /**
   * Optional CSS classes to apply to the component
   */
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  center = false,
  className = "",
}) => {
  return (
    <div className={`mb-8 ${center ? "text-center" : ""} ${className}`}>
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      {/* Animated gradient underline */}
      <motion.div
        className="h-1 w-20 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full"
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: center ? 80 : 80 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        style={{
          marginLeft: center ? "auto" : "0",
          marginRight: center ? "auto" : "0",
        }}
      />

      {subtitle && (
        <motion.p
          className="text-[#4B5563] mt-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            marginLeft: center ? "auto" : "0",
            marginRight: center ? "auto" : "0",
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
