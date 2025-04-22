"use client";

/**
 * HowToSection component for displaying a guide on how to use the Dashboard KPI
 * Features step numbers, icons, titles, and descriptions
 */
import React from "react";
import { IHowToStep } from "@/interfaces/pob";
import { FaSearch, FaChartLine, FaClipboardList } from "react-icons/fa";

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
    <section className={`w-full py-16 ${className}`}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#1F2937] mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step) => {
            const StepIcon = iconMap[step.iconName as keyof typeof iconMap];

            return (
              <div
                key={step.id}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] mb-4">
                  <StepIcon size={36} />
                </div>

                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#3B82F6] text-white font-medium mb-4">
                  {step.id}
                </div>

                <h3 className="text-lg font-medium text-[#1F2937] mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-[#4B5563]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
