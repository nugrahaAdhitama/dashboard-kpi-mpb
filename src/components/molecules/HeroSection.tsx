"use client";

/**
 * Hero section component for the landing page
 * Features a title, description, and illustration
 */
import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  description: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <section
      className={`w-full bg-gradient-to-r from-[#3B82F6]/10 to-[#10B981]/10 ${className}`}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1F2937] leading-tight">
              {title}
            </h1>
            <p className="text-lg text-[#4B5563] max-w-lg">{description}</p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src="/data-analytics.svg"
              alt="Data Analytics Illustration"
              width={450}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
