"use client";

/**
 * TeamSection component for displaying team members and lecturer
 * Features a responsive grid layout with animated cards
 * @component
 */
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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

        {/* Team photo collage with glassmorphism */}
        <motion.div
          className="w-full max-w-3xl mx-auto mb-16 relative rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/20 backdrop-blur-md z-0 border border-white/20" />

          <div className="relative pt-[56.25%]">
            <div className="absolute inset-0 p-4 md:p-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full h-full">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.nim}
                    className="relative overflow-hidden rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={member.image || "/placeholder-avatar.png"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 pt-8 pb-2">
                        <p className="text-white text-xs font-medium truncate">
                          {member.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
