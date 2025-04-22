"use client";

/**
 * TimelineItem component for displaying a single stage in a project timeline
 * Features animations and visual connections between timeline items
 * @component
 */
import React from "react";
import { motion } from "framer-motion";

interface TimelineItemProps {
  /**
   * Stage title or name
   */
  stage: string;

  /**
   * Stage description
   */
  description: string;

  /**
   * Flag indicating if this is the last item in the timeline
   */
  isLast?: boolean;

  /**
   * Animation delay for staggered effects
   */
  delay?: number;

  /**
   * Optional CSS classes to apply to the component
   */
  className?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  stage,
  description,
  isLast = false,
  delay = 0,
  className = "",
}) => {
  return (
    <div className={`relative pl-10 ${!isLast ? "pb-10" : ""} ${className}`}>
      {/* Timeline connector line */}
      {!isLast && (
        <motion.div
          className="absolute left-4 top-4 w-0.5 h-full bg-[#E5E7EB]"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 0.8, delay: delay + 0.5 }}
          viewport={{ once: true }}
        />
      )}

      {/* Timeline dot marker */}
      <motion.div
        className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] flex items-center justify-center text-white"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay }}
        viewport={{ once: true }}
      >
        <div className="w-4 h-4 rounded-full bg-white/30 backdrop-blur-sm" />
      </motion.div>

      {/* Content with staggered animation */}
      <div>
        <motion.h3
          className="text-lg font-bold text-[#1F2937] mb-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          viewport={{ once: true }}
        >
          {stage}
        </motion.h3>

        <motion.p
          className="text-sm text-[#4B5563]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
};

export default TimelineItem;
