"use client";

/**
 * Bar Chart component for visualizing distribution of lecturers' workload
 * Uses Chart.js for rendering the chart
 */
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BarChartData } from "@/interfaces/kpi";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartBebanKerjaProps {
  data: BarChartData;
  className?: string;
  koefisienVariasi?: number;
}

const BarChartBebanKerja: React.FC<BarChartBebanKerjaProps> = ({
  data,
  koefisienVariasi,
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
          label: function (tooltipItem: TooltipItem<"bar">) {
            const datasetLabel = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw as number;
            return `${datasetLabel}: ${value} ${
              datasetLabel.includes("SKS") ? "SKS" : "Mata Kuliah"
            }`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value: number | string): string {
            const index =
              typeof value === "number" ? value : parseInt(value, 10);
            const label = data.labels[index];
            if (typeof label === "string") {
              return label.length > 15 ? label.substring(0, 15) + "..." : label;
            }
            return String(label);
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
      {koefisienVariasi !== undefined && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-700">
            Koefisien Variasi Beban Kerja:
            <span
              className={`ml-2 font-bold ${
                koefisienVariasi <= 0.25
                  ? "text-emerald-600"
                  : koefisienVariasi <= 0.35
                  ? "text-amber-500"
                  : "text-red-500"
              }`}
            >
              {koefisienVariasi.toFixed(2)}
            </span>
            <span className="ml-2 text-xs text-gray-500">
              {koefisienVariasi <= 0.25
                ? "(Distribusi merata)"
                : koefisienVariasi <= 0.35
                ? "(Perlu pemerataan lebih baik)"
                : "(Distribusi tidak merata)"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default BarChartBebanKerja;
