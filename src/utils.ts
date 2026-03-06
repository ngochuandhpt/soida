import { SkinAnalysisResult } from './types';

export const generateMockAnalysis = (): SkinAnalysisResult => {
  const skinTypes = ['Da Dầu', 'Da Khô', 'Da Hỗn Hợp', 'Da Thường'];
  
  return {
    overview: {
      evenness: Math.floor(Math.random() * 3) + 7,
      brightness: Math.floor(Math.random() * 3) + 7,
      hydration: Math.floor(Math.random() * 3) + 7,
      surfaceQuality: Math.floor(Math.random() * 3) + 7,
    },
    skinType: skinTypes[Math.floor(Math.random() * skinTypes.length)],
    skinTypeConfidence: 0.85 + Math.random() * 0.1,
    score: Math.floor(Math.random() * 20) + 75,
    estimatedAge: 25 + Math.floor(Math.random() * 10),
    agingAnalysis: {
      eyeWrinkles: Math.floor(Math.random() * 15),
      cheekWrinkles: Math.floor(Math.random() * 10),
      wrinkleDepth: 'thap',
    },
    issues: {
      overallAging: Math.floor(Math.random() * 3),
      acne: Math.floor(Math.random() * 4),
      redInflammation: Math.floor(Math.random() * 2),
      darkCircles: Math.floor(Math.random() * 5),
      largePores: Math.floor(Math.random() * 4),
      darkSpots: Math.floor(Math.random() * 3),
    },
    careSuggestions: {
      morningRoutine: 'Rửa mặt -> Toner -> Serum Vitamin C -> Kem dưỡng -> Kem chống nắng',
      nightRoutine: 'Tẩy trang -> Rửa mặt -> Toner -> Retinol -> Kem dưỡng đêm',
      suitableActives: ['Niacinamide', 'Vitamin C', 'Hyaluronic Acid'],
      notes: 'Hãy luôn sử dụng kem chống nắng vào ban ngày.',
    },
    detailedConclusion: 'Da của bạn đang ở trạng thái khá tốt, tuy nhiên cần chú ý cấp ẩm thường xuyên hơn.',
    timestamp: new Date().toLocaleString('vi-VN'),
    metrics: {
      acne: 20,
      wrinkles: 15,
      pores: 30,
      pigmentation: 25,
      hydration: 70,
    },
    recommendations: ['Sử dụng kem chống nắng', 'Uống nhiều nước']
  };
};
