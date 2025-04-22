/**
 * Interface for Prosedur Operasional Baku (POB)
 * Represents the structure of a POB card on the landing page
 */
export interface IPOB {
  id: string;
  title: string;
  description: string;
  iconName: string;
  kpiCount: number;
}

/**
 * Interface for How-to Step
 * Represents a step in the "Cara Menggunakan Dashboard KPI" section
 */
export interface IHowToStep {
  id: number;
  title: string;
  description: string;
  iconName: string;
}
