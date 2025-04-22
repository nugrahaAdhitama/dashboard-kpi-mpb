"use client";

/**
 * TeamSection component for displaying team members and lecturer
 * Features a responsive grid layout with animated cards
 * @component
 */
import React from "react";
import { motion } from "framer-motion";
import { TeamMember, Lecturer } from "@/interfaces/team";
import TeamMemberCard from "@/components/atoms/TeamMemberCard";
import LecturerCard from "@/components/atoms/LecturerCard";
import SectionHeading from "@/components/atoms/SectionHeading";

interface TeamSectionProps {
  /**
   * Array of team member data
   */
  teamMembers: TeamMember[];

  /**
   * Lecturer data
   */
  lecturer: Lecturer;

  /**
   * Optional CSS classes to apply to the component
   */
  className?: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  teamMembers,
  lecturer,
  className = "",
}) => {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Section heading */}
        <SectionHeading
          title="Tim Pengembang"
          subtitle="Kenali tim di balik pengembangan Dashboard KPI ini"
          center
          className="mb-12"
        />

        {/* Team photo placeholder with glassmorphism */}
        <motion.div
          className="w-full max-w-3xl mx-auto mb-16 relative rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/20 backdrop-blur-md z-0 border border-white/20" />

          <div className="relative pt-[56.25%]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8 relative z-10">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-[#1F2937] mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Kelompok MPB
                </motion.h3>
                <motion.p
                  className="text-[#4B5563]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Foto tim akan ditampilkan di sini
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.nim}
              member={member}
              delay={0.1 * index}
            />
          ))}
        </div>

        {/* Lecturer section */}
        <motion.div
          className="mt-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionHeading title="Dosen Pengampu" center className="mb-8" />

          <div className="max-w-md mx-auto">
            <LecturerCard lecturer={lecturer} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
