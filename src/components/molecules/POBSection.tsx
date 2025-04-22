"use client";

/**
 * POBSection component for displaying POB cards
 * Shows a collection of POB options in a responsive grid with animations
 * @component
 */
import React from "react";
import { IPOB } from "@/interfaces/pob";
import POBCard from "@/components/molecules/POBCard";
import { motion } from "framer-motion";

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
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className={`w-full py-20 relative overflow-hidden ${className}`}>
      {/* Background decoration */}
      <div className="absolute -left-20 top-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#10B981]/10 to-[#3B82F6]/5 blur-3xl z-0"></div>
      <div className="absolute -right-20 bottom-40 w-96 h-96 rounded-full bg-gradient-to-tl from-[#8B5CF6]/10 to-[#3B82F6]/5 blur-3xl z-0"></div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#1F2937] mb-4">
            {title}
          </h2>
          <p className="text-center text-[#4B5563] max-w-2xl mx-auto mb-16">
            Pilih salah satu Prosedur Operasional Baku berikut untuk melihat
            detail KPI terkait
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 flex-wrap"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {pobs.map((pob, index) => (
            <motion.div
              key={pob.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <POBCard pob={pob} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default POBSection;
