"use client";

/**
 * Pie Chart component for visualizing KPI distribution by quartile status
 * Uses Chart.js for rendering the chart
 */
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { KPISummary } from "@/interfaces/kpi";
import { TooltipItem } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartKPIProps {
  summary: KPISummary;
  className?: string;
}

interface PieChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }>;
}

const PieChartKPI: React.FC<PieChartKPIProps> = ({
  summary,
  className = "",
}) => {
  const data: PieChartData = {
    labels: ["Buruk", "Perlu Perbaikan", "Baik", "Sangat Baik"],
    datasets: [
      {
        data: [
          summary.buruk,
          summary.perlu_perbaikan,
          summary.baik,
          summary.sangat_baik,
        ],
        backgroundColor: [
          "#EF4444", // red-500 for Buruk
          "#F59E0B", // amber-500 for Perlu Perbaikan
          "#10B981", // emerald-500 for Baik
          "#047857", // emerald-700 for Sangat Baik
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"pie">) {
            const label = tooltipItem.label;
            const value = tooltipItem.parsed;
            const total = summary.total;
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className={`w-full h-64 ${className}`}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartKPI;
