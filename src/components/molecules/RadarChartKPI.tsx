"use client";

/**
 * Radar Chart component for visualizing KPI performance across dimensions
 * Uses Chart.js for rendering the chart
 */
import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { RadarChartData } from "@/interfaces/kpi";
import { TooltipItem } from "chart.js";

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartKPIProps {
  data: RadarChartData;
  className?: string;
}

const RadarChartKPI: React.FC<RadarChartKPIProps> = ({
  data,
  className = "",
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"radar">) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          callback: function (tickValue: number | string) {
            return tickValue + "%";
          },
        },
      },
    },
  };

  return (
    <div className={`w-full h-80 ${className}`}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChartKPI;
