"use client";

/**
 * TeamMemberCard component for displaying individual team member information
 * Features a glassmorphism effect and subtle animations
 * @component
 */
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TeamMember } from "@/interfaces/team";

interface TeamMemberCardProps {
  /**
   * Team member data to display
   */
  member: TeamMember;

  /**
   * Optional CSS classes to apply to the component
   */
  className?: string;

  /**
   * Animation delay for staggered effects
   */
  delay?: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  className = "",
  delay = 0,
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Glassmorphism card effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-lg z-0 border border-white/20 shadow-lg" />

      <div className="relative p-6 z-10">
        <div className="flex flex-col items-center text-center">
          {/* Avatar with profile picture */}
          <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/20 shadow-lg border-2 border-white/30">
            <Image
              src={member.image || "/placeholder-avatar.png"}
              alt={member.name}
              fill
              className="object-cover transition-transform hover:scale-110 duration-300"
            />
          </div>

          {/* Member details with subtle animations */}
          <motion.h3
            className="text-lg font-bold text-[#1F2937] mb-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: delay + 0.1 }}
            viewport={{ once: true }}
          >
            {member.name}
          </motion.h3>

          <motion.p
            className="text-sm text-[#4B5563] mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
            viewport={{ once: true }}
          >
            {member.nim}
          </motion.p>

          {member.role && (
            <motion.span
              className="text-xs font-medium px-2 py-1 rounded-full bg-[#EFF6FF] text-[#3B82F6]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.3 }}
              viewport={{ once: true }}
            >
              {member.role}
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
