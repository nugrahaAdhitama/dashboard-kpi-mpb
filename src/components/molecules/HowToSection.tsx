"use client";

/**
 * HowToSection component for displaying a guide on how to use the Dashboard KPI
 * Features step numbers, icons, titles, and descriptions with animations and glassmorphism
 * @component
 */
import React from "react";
import { IHowToStep } from "@/interfaces/pob";
import { FaSearch, FaChartLine, FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion";

interface HowToSectionProps {
  title: string;
  steps: IHowToStep[];
  className?: string;
}

const iconMap = {
  search: FaSearch,
  "chart-line": FaChartLine,
  "clipboard-list": FaClipboardList,
};

const HowToSection: React.FC<HowToSectionProps> = ({
  title,
  steps,
  className = "",
}) => {
  return (
    <section className={`w-full py-24 relative overflow-hidden ${className}`}>
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-lg h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent"></div>
      <div className="absolute -left-20 bottom-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#8B5CF6]/10 to-[#3B82F6]/5 blur-3xl z-0"></div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#1F2937] mb-4">
            {title}
          </h2>
          <p className="text-center text-[#4B5563] max-w-2xl mx-auto">
            Ikuti langkah-langkah berikut untuk memaksimalkan penggunaan
            Dashboard KPI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step, index) => {
            const StepIcon = iconMap[step.iconName as keyof typeof iconMap];

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative p-1 rounded-xl bg-gradient-to-br from-[#3B82F6]/50 via-[#8B5CF6]/30 to-[#10B981]/40"
              >
                {/* Glassmorphism effect */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl"></div>

                <div className="relative h-full p-8 bg-white/80 backdrop-blur-sm rounded-lg flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/10 text-[#3B82F6] mb-4">
                    <StepIcon size={32} />
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white font-medium mb-4">
                    {step.id}
                  </div>

                  <h3 className="text-xl font-bold text-[#1F2937] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-[#4B5563] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
