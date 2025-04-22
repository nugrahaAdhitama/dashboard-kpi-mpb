"use client";

/**
 * KPI Edit Modal component for editing KPI achievement values
 */
import React, { useState, useEffect } from "react";
import { KPI } from "@/interfaces/kpi";
import StatusBadge from "@/components/atoms/StatusBadge";
import { updateKPI } from "@/app/pob/penjaminan-mutu-akademik/utils";

interface KPIEditModalProps {
  kpi: KPI | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedKPI: KPI) => void;
}

const KPIEditModal: React.FC<KPIEditModalProps> = ({
  kpi,
  isOpen,
  onClose,
  onSave,
}) => {
  const [achievement, setAchievement] = useState<string>("");
  const [updatedKPI, setUpdatedKPI] = useState<KPI | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (kpi) {
      setAchievement(kpi.pencapaian.toString());
      setUpdatedKPI(kpi);
    }
  }, [kpi]);

  const handleAchievementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAchievement(value);

    if (!kpi) return;

    // Validate input
    if (value === "") {
      setError("Nilai pencapaian tidak boleh kosong");
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setError("Nilai pencapaian harus berupa angka");
      return;
    }

    setError("");

    // Update KPI with new achievement
    const updated = updateKPI(kpi, value);
    setUpdatedKPI(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!updatedKPI || error) return;

    onSave(updatedKPI);
    onClose();
  };

  if (!isOpen || !kpi) return null;

  // Get info about the quartile ranges for display
  const getQuartileDescriptions = () => {
    return (
      <div className="mt-4 text-sm">
        <h4 className="font-medium mb-2">Batas Kuartil:</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-red-500 font-medium">Buruk:</span>{" "}
            {kpi.kuartil1}
          </div>
          <div>
            <span className="text-amber-500 font-medium">Perlu Perbaikan:</span>{" "}
            {kpi.kuartil2}
          </div>
          <div>
            <span className="text-emerald-500 font-medium">Baik:</span>{" "}
            {kpi.kuartil3}
          </div>
          <div>
            <span className="text-emerald-700 font-medium">Sangat Baik:</span>{" "}
            {kpi.kuartil4}
          </div>
        </div>
        <p className="mt-2 text-gray-500 italic">
          {kpi.isHigherBetter
            ? "Nilai lebih tinggi = lebih baik"
            : "Nilai lebih rendah = lebih baik"}
        </p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Edit KPI</h2>

        <div className="mb-4">
          <h3 className="text-lg font-medium">{kpi.nama}</h3>
          <p className="text-sm text-gray-600 mt-1">{kpi.deskripsi}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="target"
                className="block text-sm font-medium text-gray-700"
              >
                Target
              </label>
              <span className="text-sm text-gray-500">
                {kpi.target} {kpi.satuan}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="achievement"
              className="block text-sm font-medium text-gray-700"
            >
              Pencapaian
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="achievement"
                id="achievement"
                className={`block w-full pr-12 sm:text-sm rounded-md ${
                  error
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                value={achievement}
                onChange={handleAchievementChange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">{kpi.satuan}</span>
              </div>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          {updatedKPI && (
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Status:
                </span>
                <StatusBadge status={updatedKPI.status} />
              </div>
            </div>
          )}

          {getQuartileDescriptions()}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                error ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!!error}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KPIEditModal;
