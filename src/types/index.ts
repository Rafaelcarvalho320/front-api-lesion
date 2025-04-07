// src/types/index.ts
export interface AnalysisResult {
  symmetry: string;
  border: {
    resultado: string;
    prob_benigna: number;
    prob_maligna: number;
  };
  coloration: {
    resultado: string;
    prob_benigna: number;
    prob_maligna: number;
  };
}