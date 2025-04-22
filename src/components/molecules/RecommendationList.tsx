"use client";

/**
 * RecommendationList component for displaying KPI improvement recommendations
 */
import React from "react";
import { Recommendation } from "@/interfaces/kpi";
import StatusBadge from "@/components/atoms/StatusBadge";

interface RecommendationListProps {
  recommendations: Recommendation[];
  className?: string;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  className = "",
}) => {
  if (recommendations.length === 0) {
    return (
      <div className={`bg-gray-50 p-4 rounded-md ${className}`}>
        <p className="text-gray-500 text-center">
          Tidak ada rekomendasi perbaikan saat ini.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900">
        Rekomendasi Perbaikan
      </h3>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {recommendations.map((rec) => (
            <li key={rec.kpi_id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate flex items-center">
                      {rec.kpi_name}
                      <StatusBadge status={rec.status} className="ml-2" />
                    </h4>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {rec.recommendation}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecommendationList;
