"use client";

/**
 * POBSection component for displaying POB cards
 * Shows a collection of POB options in a responsive grid
 */
import React from "react";
import { IPOB } from "@/interfaces/pob";
import POBCard from "@/components/molecules/POBCard";

interface POBSectionProps {
  title: string;
  pobs: IPOB[];
  className?: string;
}

const POBSection: React.FC<POBSectionProps> = ({
  title,
  pobs,
  className = "",
}) => {
  return (
    <section className={`w-full py-16 ${className}`}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#1F2937] mb-12">
          {title}
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 flex-wrap">
          {pobs.map((pob) => (
            <POBCard key={pob.id} pob={pob} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default POBSection;
