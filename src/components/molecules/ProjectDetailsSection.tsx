"use client";

/**
 * ProjectDetailsSection component for displaying project information
 * Features a responsive layout with feature cards and timeline
 * @component
 */
import React from "react";
import { motion } from "framer-motion";
import { ProjectInfo } from "@/interfaces/team";
import SectionHeading from "@/components/atoms/SectionHeading";
import FeatureCard from "@/components/atoms/FeatureCard";
import TimelineItem from "@/components/atoms/TimelineItem";
import {
  FiBarChart2,
  FiCheckCircle,
  FiDatabase,
  FiUsers,
} from "react-icons/fi";

interface ProjectDetailsSectionProps {
  /**
   * Project information data
   */
  project: ProjectInfo;

  /**
   * Optional CSS classes to apply to the component
   */
  className?: string;
}

const ProjectDetailsSection: React.FC<ProjectDetailsSectionProps> = ({
  project,
  className = "",
}) => {
  // Icons for feature cards
  const featureIcons = [
    <FiBarChart2 key="chart" size={24} />,
    <FiDatabase key="database" size={24} />,
    <FiUsers key="users" size={24} />,
    <FiCheckCircle key="check" size={24} />,
  ];

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Project details section */}
        <div className="mb-20">
          <SectionHeading
            title="Tentang Proyek"
            subtitle={project.description}
            className="mb-12"
          />

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.features.map((feature, index) => (
              <FeatureCard
                key={`feature-${index}`}
                title={`Fitur ${index + 1}`}
                description={feature}
                icon={
                  index < featureIcons.length ? featureIcons[index] : undefined
                }
                delay={0.1 * index}
              />
            ))}
          </div>
        </div>

        {/* Methodology and process section */}
        <div className="mb-20">
          <SectionHeading
            title="Metodologi dan Proses"
            subtitle="Pendekatan yang kami gunakan dalam mengembangkan dashboard KPI"
            className="mb-12"
          />

          {/* Glassmorphism container for timeline */}
          <motion.div
            className="relative p-8 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/5 backdrop-blur-sm z-0 border border-white/20 shadow-lg" />

            {/* Project timeline */}
            <div className="relative z-10">
              {project.timeline ? (
                project.timeline.map((item, index) => (
                  <TimelineItem
                    key={`timeline-${index}`}
                    stage={item.stage}
                    description={item.description}
                    isLast={index === project.timeline!.length - 1}
                    delay={0.2 * index}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-[#4B5563]">
                  Informasi timeline proyek akan ditampilkan di sini
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Contact and feedback section */}
        <motion.div
          className="relative p-8 rounded-xl overflow-hidden text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Glassmorphism effect with different gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/20 to-[#3B82F6]/10 backdrop-blur-sm z-0 border border-white/20 shadow-lg" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <SectionHeading
              title="Kontak dan Umpan Balik"
              center
              className="mb-6"
            />

            <motion.p
              className="text-[#4B5563] mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Kami mengundang pengguna untuk memberikan umpan balik atau
              pertanyaan tentang proyek ini. Masukan Anda sangat berharga untuk
              pengembangan lebih lanjut.
            </motion.p>

            <motion.div
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#3B82F6]/80 to-[#8B5CF6]/80 text-white font-medium hover:from-[#3B82F6] hover:to-[#8B5CF6] transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              dashboard-kpi@example.com
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetailsSection;
