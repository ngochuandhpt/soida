export interface SkinAnalysisResult {
  overview: {
    evenness: number;
    brightness: number;
    hydration: number;
    surfaceQuality: number;
    elasticity: number;
    description: string;
  };
  skinType: {
    type: 'da_dau' | 'da_kho' | 'da_hon_hop' | 'da_nhay_cam' | 'da_binh_thuong';
    confidence: number;
    explanation: string;
  };
  healthScore: {
    score: number;
    explanation: string;
  };
  skinAge: {
    age: number;
    comparison: string;
    explanation: string;
  };
  pigmentationAge: {
    age: number;
    comparison: string;
    explanation: string;
  };
  agingAnalysis: {
    eyeWrinkles: number;
    cheekWrinkles: number;
    foreheadWrinkles: number;
    wrinkleDepth: 'thap' | 'trung_binh' | 'cao';
    description: string;
  };
  skinIssues: {
    acne: number;
    inflammatoryAcne: number;
    largePores: number;
    darkCircles: number;
    dullness: number;
    postAcneSpots: number;
    aging: number;
    pigmentation: number;
    darkSpots: number;
    melasma: number;
    topIssues: string[];
  };
  pigmentationAnalysis: {
    melaninIndex: number;
    density: number;
    microPigmentationIndex: number;
    unevenness: number;
    microPigmentationExplanation: string;
  };
  pigmentationDistribution: {
    forehead_left: number;
    forehead_center: number;
    forehead_right: number;
    cheek_left: number;
    cheek_right: number;
    nose: number;
    chin: number;
  };
  pigmentationHeatmap: {
    highestZones: string;
    riskZones: string;
    preMelasmaSigns: string;
    explanation: string;
  };
  uvDamage: {
    score: number;
    signs: string[];
    explanation: string;
  };
  skinBarrier: {
    score: number;
    moistureRetention: string;
    sensitivity: string;
    weaknessSigns: string;
  };
  melasmaRisk: {
    score: number;
    level: 'thap' | 'trung_binh' | 'cao';
    preMelasmaIndicators: string[];
    probability: number;
  };
  melasmaPrediction24Months: {
    probability: number;
    level: 'thap' | 'trung_binh' | 'cao';
    explanation: string;
  };
  skincareRecommendations: {
    topical: {
      morningRoutine: string;
      nightRoutine: string;
      suggestedActives: string[];
    };
    internal: {
      supplements: string[];
      roles: string;
    };
    lifestyle: {
      tips: string[];
    };
  };
  aiConclusion: {
    summary: string;
    links: string;
    futureRisks: string;
    overallAdvice: string;
  };
  timestamp: string;
  imageUrl?: string;
  consultationRequested?: boolean;
  // Compatibility fields (optional to help transition and support legacy data)
  score?: number;
  detailedConclusion?: string;
  estimatedAge?: number;
  skinTypeConfidence?: number;
  issues?: {
    overallAging: number;
    acne: number;
    redInflammation: number;
    darkCircles: number;
    largePores: number;
    darkSpots: number;
  };
  careSuggestions?: {
    morningRoutine: string;
    nightRoutine: string;
    suitableActives: string[];
    notes: string;
  };
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
