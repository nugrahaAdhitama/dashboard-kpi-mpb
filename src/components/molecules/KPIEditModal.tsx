"use client";

/**
 * KPI Edit Modal component for editing KPI achievement values
 */
import React, { useState, useEffect } from "react";
import { KPI } from "@/interfaces/kpi";
import StatusBadge from "@/components/atoms/StatusBadge";
import { updateKPI } from "@/app/pob/penjaminan-mutu-akademik/utils";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "@/components/atoms/Toast";

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
  const [showToast, setShowToast] = useState<boolean>(false);

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
    setShowToast(true);
    // Don't close immediately to show the toast
    setTimeout(() => {
      onClose();
    }, 500);
  };

  if (!isOpen || !kpi) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="fixed inset-0 backdrop-blur-sm bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl relative z-10"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Edit KPI
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {kpi.nama}
                </h3>
                <p className="text-base text-gray-600 mt-2 leading-relaxed">
                  {kpi.deskripsi}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="target"
                      className="block text-base font-medium text-gray-700"
                    >
                      Target
                    </label>
                    <span className="text-base font-medium text-gray-800">
                      {kpi.target} {kpi.satuan}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="achievement"
                    className="block text-base font-medium text-gray-700 mb-2"
                  >
                    Pencapaian
                  </label>
                  <div className="relative rounded-md shadow-md">
                    <motion.input
                      type="text"
                      name="achievement"
                      id="achievement"
                      className={`block w-full px-4 py-3 text-base rounded-md ${
                        error
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      value={achievement}
                      onChange={handleAchievementChange}
                      whileFocus={{ scale: 1.01 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-base">
                        {kpi.satuan}
                      </span>
                    </div>
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                {updatedKPI && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-700">
                        Status:
                      </span>
                      <StatusBadge status={updatedKPI.status} />
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 text-gray-800">
                    Batas Kuartil:
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-2 rounded-md shadow-sm">
                      <span className="text-red-500 font-medium">Buruk:</span>{" "}
                      {kpi.kuartil1}
                    </div>
                    <div className="bg-white p-2 rounded-md shadow-sm">
                      <span className="text-amber-500 font-medium">
                        Perlu Perbaikan:
                      </span>{" "}
                      {kpi.kuartil2}
                    </div>
                    <div className="bg-white p-2 rounded-md shadow-sm">
                      <span className="text-emerald-500 font-medium">
                        Baik:
                      </span>{" "}
                      {kpi.kuartil3}
                    </div>
                    <div className="bg-white p-2 rounded-md shadow-sm">
                      <span className="text-emerald-700 font-medium">
                        Sangat Baik:
                      </span>{" "}
                      {kpi.kuartil4}
                    </div>
                  </div>
                  <p className="mt-3 text-gray-500 italic text-sm">
                    {kpi.isHigherBetter
                      ? "Nilai lebih tinggi = lebih baik"
                      : "Nilai lebih rendah = lebih baik"}
                  </p>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <motion.button
                    type="button"
                    className="px-5 py-2.5 font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={onClose}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Batal
                  </motion.button>
                  <motion.button
                    type="submit"
                    className={`px-5 py-2.5 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      error ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!!error}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Simpan
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast
        isVisible={showToast}
        message="Data KPI berhasil disimpan"
        type="success"
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default KPIEditModal;
