export interface SkinAnalysisResult {
  overview: {
    evenness: number;
    brightness: number;
    hydration: number;
    surfaceQuality: number;
  };
  skinType: string;
  skinTypeConfidence: number;
  score: number;
  estimatedAge: number;
  agingAnalysis: {
    eyeWrinkles: number;
    cheekWrinkles: number;
    wrinkleDepth: 'thap' | 'trung_binh' | 'cao';
  };
  issues: {
    overallAging: number;
    acne: number;
    redInflammation: number;
    darkCircles: number;
    largePores: number;
    darkSpots: number;
  };
  careSuggestions: {
    morningRoutine: string;
    nightRoutine: string;
    suitableActives: string[];
    notes: string;
  };
  detailedConclusion: string;
  timestamp: string;
  imageUrl?: string;
  consultationRequested?: boolean;
  // Legacy fields for compatibility during transition if needed
  metrics?: {
    acne: number;
    wrinkles: number;
    pores: number;
    pigmentation: number;
    hydration: number;
  };
  recommendations?: string[];
}

export interface SkinScanHistory {
  id: string;
  phoneNumber: string;
  result: SkinAnalysisResult;
  imageUrl: string;
  timestamp: string;
  consultationRequested?: boolean;
  isConsulted?: boolean;
}

export type AppState = 'home' | 'instructions' | 'scanning' | 'results' | 'data-deletion' | 'privacy' | 'terms' | 'history' | 'login' | 'admin-login' | 'admin-dashboard';
