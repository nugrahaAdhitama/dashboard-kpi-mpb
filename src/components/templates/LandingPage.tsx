"use client";

/**
 * Landing page template component that combines all section components
 * Implements the full landing page layout and structure
 */
import React from "react";
import { IPOB, IHowToStep } from "@/interfaces/pob";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import HeroSection from "@/components/molecules/HeroSection";
import POBSection from "@/components/molecules/POBSection";
import HowToSection from "@/components/molecules/HowToSection";
import withLayout from "@/hoc/withLayout";

interface LandingPageProps {
  heroTitle: string;
  heroDescription: string;
  heroButtonText: string;
  pobSectionTitle: string;
  pobs: IPOB[];
  howToSectionTitle: string;
  howToSteps: IHowToStep[];
}

const LandingPage: React.FC<LandingPageProps> = ({
  heroTitle,
  heroDescription,
  heroButtonText,
  pobSectionTitle,
  pobs,
  howToSectionTitle,
  howToSteps,
}) => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard KPI", href: "/dashboard", isCurrent: true },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="px-4 md:px-8 mt-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <HeroSection
        title={heroTitle}
        description={heroDescription}
        buttonText={heroButtonText}
      />

      <POBSection title={pobSectionTitle} pobs={pobs} />

      <HowToSection title={howToSectionTitle} steps={howToSteps} />
    </div>
  );
};

export default withLayout(LandingPage);
